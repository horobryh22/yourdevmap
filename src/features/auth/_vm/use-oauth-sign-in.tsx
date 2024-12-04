import { useMutation } from "@tanstack/react-query";
import { ClientSafeProvider, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

/* по сути просто обертка над signIn предоставляемым next-auth */

export function useOAuthSignIn(provider: ClientSafeProvider) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  // useMutation для управлением состояния ассинхронных операций
  const oauthSignInMutation = useMutation({
    mutationFn: () =>
      signIn(provider.id, { callbackUrl: callbackUrl ?? undefined }),
  });

  return {
    isPending: oauthSignInMutation.isPending,
    signIn: oauthSignInMutation.mutate,
  };
}
