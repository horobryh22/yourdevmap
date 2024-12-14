"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Spinner } from "@/shared/ui/spinner";
import { AvatarField } from "./avatar-field";
import { UserId } from "@/entities/user/_domain/types";
import { Profile } from "@/entities/user/profile";
import { useUpdateProfile } from "@/features/update-profile/_vm/use-update-profile";

const profileFormSchema = z.object({
  name: z
    .string()
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim())
    .optional(),
  email: z.string().email().optional(),
  image: z.string().optional(),
});

const getDefaultValues = (profile: Profile): ProfileFormValues => {
  return {
    name: profile.name ?? "",
    email: profile.email ?? "",
    image: profile.image ?? undefined,
  };
};

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type ProfileFormProps = {
  profile: Profile;
  userId: UserId;
  onSuccess?: () => void;
  submitText?: string;
};

export function ProfileForm({
  userId,
  profile,
  onSuccess,
  submitText = "Сохранить",
}: ProfileFormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: getDefaultValues(profile),
  });

  const updateProfile = useUpdateProfile();

  const onSubmitForm = form.handleSubmit(async (data) => {
    const { profile } = await updateProfile.update({
      userId: userId,
      data,
    });

    form.reset(getDefaultValues(profile));
    onSuccess?.();
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmitForm} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Аватарка</FormLabel>
              <FormControl>
                <AvatarField
                  value={field.value}
                  onChange={field.onChange}
                  profile={profile}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={updateProfile.isPending}>
          {updateProfile.isPending && (
            <Spinner
              className="mr-2 h-4 w-4 animate-spin"
              data-testid="Обновление профиля"
            />
          )}
          {submitText}
        </Button>
      </form>
    </Form>
  );
}
