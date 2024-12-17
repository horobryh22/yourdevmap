import { useAppearanceDelay } from "../lib/react";
import { Spinner } from "./spinner";

export function FullPageSpinner({ isLoading }: { isLoading?: boolean }) {
  // используем задержку, чтобы не показывать спиннер сразу, а по истечении какого-то времени
  // чтобы пользователю было приятнее
  const show = useAppearanceDelay(isLoading);

  if (show) {
    return (
      <div className="inset-0 flex items-center justify-center absolute">
        <Spinner
          className="w-10 h-10 text-primary"
          data-testid="Загрузка страницы"
        />
      </div>
    );
  }

  return null;
}
