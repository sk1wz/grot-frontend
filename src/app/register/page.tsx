import { RegisterForm } from "@/features/auth";
import { Card } from "@/shared/ui";

export default function RegisterPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm rounded-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-(--foreground)">
            Регистрация
          </h1>
        </div>
        <RegisterForm />
      </Card>
    </div>
  );
}
