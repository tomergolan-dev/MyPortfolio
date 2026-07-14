import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf8f4] px-6">
      <div className="w-full max-w-sm rounded-2xl border border-stone-900/10 bg-white/70 p-8">
        <h1 className="text-xl font-semibold text-stone-900">Admin login</h1>
        <p className="mt-1 text-sm text-stone-600">Sign in to manage your portfolio content.</p>
        <LoginForm />
      </div>
    </div>
  );
}
