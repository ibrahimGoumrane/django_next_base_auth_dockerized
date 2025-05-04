import { Eye, EyeOff } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { FormField } from "../ui/form";
import { TextField } from "./text-field";
import { FieldConfig, State } from "@/lib/schema/base";
interface PasswordFieldProps {
  form: UseFormReturn;
  state: State;
  showPassword: boolean;
  handlePasswordVisibility: () => void;
  fieldConfig?: FieldConfig;
}
const PasswordField = ({
  form,
  state,
  showPassword,
  handlePasswordVisibility,
  fieldConfig,
}: PasswordFieldProps) => {
  return (
    <FormField
      name={fieldConfig?.name || "password"}
      control={form.control}
      render={({ field }) => (
        <TextField
          label={fieldConfig?.label || "Password"}
          field={field}
          state={state}
          placeholder={fieldConfig?.placeholder || "••••••••"}
          autoComplete={fieldConfig?.autoComplete || "new-password"}
          type={showPassword ? "text" : "password"}
          required={fieldConfig?.required}
          className={fieldConfig?.className}
          helpText={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handlePasswordVisibility}
              className="absolute right-0 top-0 h-full px-3"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          }
        />
      )}
    />
  );
};

export default PasswordField;
