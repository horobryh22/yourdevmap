"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/ui/form";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Spinner } from "@/shared/ui/spinner";
import { useTestEmailSignIn } from "@/features/auth/_vm/use-test-email-sign-in";
import { generateTestLink } from "@/features/auth/_lib/generate-test-link";

/* компонента используется только для e2e тестирования */

export function TestEmailSignInForm({ testToken }: { testToken: string }) {
  const form = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
  });

  const emailSignIn = useTestEmailSignIn();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => emailSignIn.signIn(data.email))}
      >
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={emailSignIn.isPending}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button disabled={emailSignIn.isPending}>
            {emailSignIn.isPending && (
              <Spinner
                className="mr-2 h-4 w-4 animate-spin"
                data-testid="Вход"
              />
            )}
            Войти через Email
          </Button>
          {emailSignIn.isSuccess && (
            <Link
              className="text-sm text-muted-foreground text-underline"
              href={generateTestLink({
                callbackUrl: emailSignIn.callbackUrl ?? "",
                token: testToken,
                email: form.getValues("email"),
              })}
            >
              Упрощённый тестовый вход
            </Link>
          )}
        </div>
      </form>
    </Form>
  );
}
