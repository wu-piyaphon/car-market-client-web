export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="font-bold text-2xl">404 - Page Not Found</h1>
      <p className="mt-4 text-muted-foreground">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
