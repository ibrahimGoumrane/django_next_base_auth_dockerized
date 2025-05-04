"use client";

import { signupRenderedFields, SignupSchema } from "@/lib/schema/auth";
import { register } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import BaseForm from "../form/base-form";
import PasswordField from "../form/password-field";
import { State } from "@/lib/schema/base";

export function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const updatedSignUpSchema = signupRenderedFields.map((field) => {
    if (field.name === "password" || field.name === "confirmPassword") {
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
      action={register}
      schema={SignupSchema}
      fields={updatedSignUpSchema}
      submitText="Sign Up"
      loadingText="Signing Up..."
      onSuccess={() => {
        router.push("/dashboard");
      }}
    />
  );
}
