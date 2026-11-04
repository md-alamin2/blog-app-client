"use client";

import { useEffect } from "react";

export default function AboutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div>
      <h1>Something went wrong: Please try again</h1>
      <button className="text-black px-2 py-1 bg-amber-400 hover:cursor-pointer rounded-md" onClick={() => reset()}>Retry</button>
    </div>
  );
}
