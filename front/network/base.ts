import { fetchData } from "./main";
import { State } from "@/lib/schema/base";
import { revalidatePath } from "next/cache";
import { ZodSchema } from "zod";
/**
 * Generic CRUD API client that can be extended for specific resources
 */
export class ApiResource<T, CreateDTO = T, UpdateDTO = Partial<T>> {
  private baseUrl: string;
  private haveFiles: boolean;

  constructor(resourcePath: string, haveFiles: boolean = false) {
    this.baseUrl = `/${resourcePath.replace(/^\/|\/$/g, "")}/`; // Normalize path
    this.haveFiles = haveFiles;
  }

  /**
   * List all resources
   */
  async list(): Promise<T[]> {
    return (await fetchData<T[]>(this.baseUrl, {
      method: "GET",
    })) as T[];
  }

  /**
   * Get a single resource by ID
   */
  async get(id: number | string): Promise<T> {
    return (await fetchData<T>(`${this.baseUrl}${id}/`, {
      method: "GET",
    })) as T;
  }

  /**
   * Create a new resource
   */
  async create(data: CreateDTO): Promise<T> {
    const body = this.haveFiles
      ? this.toFormData(data as Record<string, string | File>)
      : JSON.stringify(data);
    return (await fetchData<T>(this.baseUrl, {
      method: "POST",
      body,
    })) as T;
  }

  /**
   * Update a resource
   */
  async update(id: number | string, data: UpdateDTO): Promise<T> {
    const body = this.haveFiles
      ? this.toFormData(data as Record<string, string | File>)
      : JSON.stringify(data);
    return (await fetchData<T>(`${this.baseUrl}${id}/`, {
      method: "PUT",
      body,
    })) as T;
  }

  /**
   * Delete a resource
   */
  async delete(id: number | string): Promise<boolean> {
    try {
      await fetchData(`${this.baseUrl}${id}/`, {
        method: "DELETE",
      });
      return true;
    } catch (error) {
      console.error(`Error deleting ${this.baseUrl}:`, error);
      return false;
    }
  }
  /**
   * Get all resources of a specific type
   */
  async getAllResource<T>(resourcePath: string): Promise<T[]> {
    return (await fetchData<T[]>(
      `${this.baseUrl}${resourcePath.replace(/^\/|\/$/g, "")}/`,
      {
        method: "GET",
      }
    )) as T[];
  }
  /**
   * Get a specific resource of a specific type
   */
  async getResource<T>(resourcePath: string): Promise<T> {
    return (await fetchData<T>(
      `${this.baseUrl}${resourcePath.replace(/^\/|\/$/g, "")}/`,
      {
        method: "GET",
      }
    )) as T;
  }

  /**
   * Server Action wrapper for fetching resources
   */
  private async handleAction(
    data: CreateDTO | UpdateDTO | { id: string } | FormData,
    schema: ZodSchema,
    action: () => Promise<T | boolean>,
    revalidatePaths?: string | string[] // New parameter
  ): Promise<State> {
    try {
      // Validate the data using the provided schema
      const parsed = schema.safeParse(data);
      if (!parsed.success) {
        const fieldErrors = parsed.error.flatten().fieldErrors;
        return {
          success: false,
          errors: fieldErrors as Record<string, string[]>,
        };
      }
      const returnedData = await action();

      // Revalidate paths if provided and action was successful
      if (revalidatePaths) {
        if (Array.isArray(revalidatePaths)) {
          revalidatePaths.forEach((path) => revalidatePath(path));
        } else {
          revalidatePath(revalidatePaths);
        }
      }

      return {
        success: true,
        errors: {},
        data: returnedData,
      };
    } catch (error) {
      return {
        success: false,
        errors: { general: [(error as Error).message] },
        data: null,
      };
    }
  }

  /**
   * Server Action wrapper for creating resources
   */
  createAction = async (
    prevState: State,
    formData: FormData | CreateDTO,
    schema: ZodSchema,
    applyTransform: boolean = true,
    revalidatePaths?: string | string[] // New parameter
  ): Promise<State> => {
    const data = applyTransform
      ? this.formDataToObject(formData as FormData)
      : formData;

    return await this.handleAction(
      data as CreateDTO,
      schema,
      () => this.create(data as CreateDTO),
      revalidatePaths
    );
  };

  /**
   * Server Action wrapper for updating resources
   */
  updateAction = async (
    prevState: State,
    formData: FormData | (UpdateDTO & { id: string }),
    schema: ZodSchema,
    applyTransform: boolean = true,
    revalidatePaths?: string | string[] // New parameter
  ): Promise<State> => {
    const id = formData instanceof FormData ? formData.get("id") : formData.id;
    if (!id) {
      return {
        success: false,
        errors: { id: ["ID is required"] },
      };
    }

    const data = applyTransform
      ? this.formDataToObject(formData as FormData)
      : formData;
    return await this.handleAction(
      data as UpdateDTO,
      schema,
      () => this.update(id.toString(), data as UpdateDTO),
      revalidatePaths
    );
  };

  /**
   * Server Action wrapper for deleting resources
   */
  deleteAction = async (
    prevState: State,
    formData: FormData,
    schema: ZodSchema,
    revalidatePaths?: string | string[] // New parameter
  ): Promise<State> => {
    const id = formData.get("id");
    if (!id) {
      return {
        success: false,
        errors: { id: ["ID is required"] },
      };
    }

    return await this.handleAction(
      { id } as { id: string },
      schema,
      () => this.delete(id.toString()),
      revalidatePaths
    );
  };
  /**
   * Helper to convert FormData to a plain object
   */
  private formDataToObject(formData: FormData): Record<string, string | File> {
    const data: Record<string, string | File> = {};
    formData.forEach((value, key) => {
      // Skip empty values
      if (value !== null && value !== undefined && value !== "") {
        data[key] = value;
      }
    });
    return data;
  }
  /**
   * Helper to convert a plain object to FormData
   */
  private toFormData(data: Record<string, string | File>): FormData {
    const formData = new FormData();
    for (const key in data) {
      const value = data[key];
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    }
    return formData;
  }
}

/**
 * Create a typed API resource
 */
export function createApiResource<T, C = T, U = Partial<T>>(
  resourcePath: string,
  haveFiles: boolean = false
) {
  return new ApiResource<T, C, U>(resourcePath, haveFiles);
}
