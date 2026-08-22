"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/forms/field-error";
import { signIn } from "@/app/actions/auth";
import { EMPTY_STATE } from "@/lib/forms";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full">
      <LogIn className="size-4" aria-hidden="true" />
      {pending ? "Signing in…" : "Sign in"}
    </Button>
  );
}

export function LoginForm({
  redirectTo,
  notAuthorized,
}: {
  redirectTo: string;
  notAuthorized?: boolean;
}) {
  const [state, formAction] = useActionState(signIn, EMPTY_STATE);

  return (
    <Card>
      <CardContent>
        <h1 className="text-2xl font-bold">Admin sign in</h1>

        {notAuthorized ? (
          <p role="alert" className="mt-4 font-medium text-destructive">
            That account does not have admin access.
          </p>
        ) : null}

        <form action={formAction} className="mt-6">
          <input type="hidden" name="redirect" value={redirectTo} />

          <div>
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              name="email"
              type="email"
              required
              autoComplete="username"
              aria-describedby="login-email-error"
              className="mt-1.5"
            />
            <FieldError id="login-email-error" messages={state.fieldErrors?.email} />
          </div>

          <div className="mt-3">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              aria-describedby="login-password-error"
              className="mt-1.5"
            />
            <FieldError
              id="login-password-error"
              messages={state.fieldErrors?.password}
            />
          </div>

          {state.error ? (
            <p role="alert" className="mt-3 font-medium text-destructive">
              {state.error}
            </p>
          ) : null}

          <div className="mt-6">
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
