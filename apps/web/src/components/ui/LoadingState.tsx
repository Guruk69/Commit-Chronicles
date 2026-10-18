
import { LoaderCircle } from "lucide-react";

type LoadingStateProps = {
  message?: string;
  fullHeight?: boolean;
};

export default function LoadingState({
  message = "Loading data...",
  fullHeight = false,
}: LoadingStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 px-6 text-center ${
        fullHeight ? "min-h-75" : "py-12"
      }`}
      role="status"
      aria-live="polite"
    >
      <LoaderCircle
        size={24}
        className="animate-spin text-muted"
        aria-hidden="true"
      />

      <p className="text-sm text-muted">{message}</p>
    </div>
  );
}
