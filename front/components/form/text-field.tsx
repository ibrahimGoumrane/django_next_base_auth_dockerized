"use client";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { State } from "@/lib/schema/base";
import { getErrorMessage } from "@/lib/utils";
import React from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface TextFieldProps {
  label: string; // Field label
  field: ControllerRenderProps<FieldValues, string>; // Field object from form.control
  state: State; // Form state for error handling
  placeholder?: string; // Optional placeholder
  type?: string; // Input type (text, email, password, etc.)
  autoComplete?: string; // Autocomplete attribute
  className?: string; // Additional CSS classes
  required?: boolean; // If the field is required
  disabled?: boolean; // If the field is disabled
  readOnly?: boolean; // If the field is read-only
  icon?: React.ReactNode; // Optional icon to display
  helpText?: React.ReactNode; // Optional help text
  children?: React.ReactNode; // For additional elements like password toggle
}

export function TextField({
  label,
  field,
  state,
  placeholder,
  type = "text",
  autoComplete,
  className,
  required,
  disabled,
  readOnly,
  icon,
  helpText,
  children,
  ...props
}: TextFieldProps) {
  if (type === "hidden") {
    return <Input type="hidden" {...field} {...props} />;
  }

  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <div className="relative">
        <FormControl>
          <div className="relative">
            {icon && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
              </div>
            )}
            <Input
              placeholder={placeholder}
              type={type}
              autoComplete={autoComplete}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              className={icon ? "pl-10" : ""}
              {...field}
              {...props}
            />
            {children}
          </div>
        </FormControl>
        {helpText}
      </div>
      <FormMessage>{getErrorMessage(state, field.name)}</FormMessage>
    </FormItem>
  );
}
