"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/shared/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { createCourseAction } from "@/features/CoursesList/actions";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/ui/utils";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export function CreateCourseForm({
  revalidatePagePath,
  className,
}: {
  revalidatePagePath: string;
  className?: string;
}) {
  const [isCreateTransition, startCreateTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startCreateTransition(async () => {
      await createCourseAction(values, revalidatePagePath);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="название ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea placeholder="описание ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isCreateTransition} type="submit">
          Добавить
        </Button>
      </form>
    </Form>
  );
}
