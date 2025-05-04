"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { cloneElement, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { ZodSchema } from "zod";
import { TextField } from "./text-field";
import { FieldConfig, State } from "@/lib/schema/base";

interface BaseFormProps {
  initialState: State;
  action: (prevState: State, formData: FormData) => Promise<State>;
  schema: ZodSchema;
  fields: FieldConfig[];
  submitText?: string;
  loadingText?: string;
  defaultValues?: Record<string, string>;
  onSuccess?: (data: unknown) => void;
  children?: React.ReactNode;
}

function BaseForm({
  initialState,
  action,
  schema,
  fields,
  submitText = "Submit",
  loadingText = "Submitting...",
  defaultValues = {},
  onSuccess,
  children,
}: BaseFormProps) {
  // Form state with server action
  const [state, formAction] = useActionState(action, initialState);

  // Form with client-side validation
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = defaultValues[field.name] || "";
      return acc;
    }, {} as Record<string, string>),
  });
  // React to successful form submission
  useEffect(() => {
    if (state.success && onSuccess) {
      onSuccess(state);
    }
  }, [state, onSuccess]);

  // Render errors at the top if there are general errors
  return (
    <Form {...form}>
      <form action={formAction} className="space-y-6">
        {/* General error message */}
        {state.errors &&
          "general" in state.errors &&
          state.errors.general instanceof Array && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-600 text-sm">
              {state.errors.general[0]}
            </div>
          )}

        {/* Form fields */}
        {fields.map((fieldConfig) =>
          fieldConfig.customRender ? (
            cloneElement(fieldConfig.customRender(form, state), {
              key: fieldConfig.name,
            })
          ) : (
            <FormField
              key={fieldConfig.name}
              name={fieldConfig.name}
              control={form.control}
              render={({ field }) => (
                <TextField
                  label={fieldConfig.label}
                  type={fieldConfig.type}
                  field={field}
                  state={state}
                  placeholder={fieldConfig.placeholder}
                  autoComplete={fieldConfig.autoComplete}
                  required={fieldConfig.required}
                  helpText={fieldConfig.helpText}
                />
              )}
            />
          )
        )}

        {/* Additional custom content */}
        {children}

        {/* Submit button */}
        <SubmitButton submitText={submitText} loadingText={loadingText} />
      </form>
    </Form>
  );
}
interface SubmitButtonProps {
  submitText: string;
  loadingText: string;
}

function SubmitButton({ submitText, loadingText }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? loadingText : submitText}
    </Button>
  );
}

export default BaseForm;
