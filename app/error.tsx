"use client";

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="font-bold text-2xl">500 - Server Error</h1>
      <p className="mt-4 text-muted-foreground">
        Sorry, something went wrong on our end.
      </p>
    </div>
  );
}
