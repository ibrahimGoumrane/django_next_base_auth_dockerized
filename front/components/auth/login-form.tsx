"use client";
import BaseForm from "@/components/form/base-form";
import { LoginSchema, loginRenderedFields } from "@/lib/schema/auth";
import { login } from "@/lib/actions/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import PasswordField from "../form/password-field";
import { FieldConfig, State } from "@/lib/schema/base";

export const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const updatedLoginSchema: FieldConfig[] = loginRenderedFields.map((field) => {
    if (field.name === "password") {
      return {
        ...field,
        type: showPassword ? "text" : "password",
        customRender: (form: UseFormReturn, state: State) => (
          <PasswordField
            form={form}
            state={state}
            showPassword={showPassword}
            fieldConfig={field}
            handlePasswordVisibility={togglePasswordVisibility}
          />
        ),
      };
    }
    return field;
  });

  return (
    <BaseForm
      initialState={{ success: false, errors: {} }}
      action={login}
      schema={LoginSchema}
      fields={updatedLoginSchema}
      submitText="Sign In"
      loadingText="Signing in..."
      onSuccess={() => {
        router.push("/dashboard");
      }}
    />
  );
};
