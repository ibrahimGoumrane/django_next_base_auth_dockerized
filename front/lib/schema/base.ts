import { UseFormReturn } from "react-hook-form";

export interface FieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
  helpText?: React.ReactNode;
  customRender?: (form: UseFormReturn, state: State) => React.ReactElement;
}
export interface State<T = unknown> {
  success: boolean;
  errors: Record<string, string[]>;
  data?: T;
}
