import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { getCurrentUser } from "@/lib/auth";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (user) {
    redirect(`/${user.role}`);
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#d8f5ff_0,#f8fafc_32%,#fff8d8_100%)] px-4 py-8 dark:bg-[radial-gradient(circle_at_top_left,#123340_0,#111827_36%,#2e2a15_100%)]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <LoginForm />
      </div>
    </main>
  );
}
