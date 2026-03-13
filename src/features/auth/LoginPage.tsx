import { useNavigate } from "react-router-dom";
import { LogoIcon } from "../../components/ui/icons/LogoIcon";
import { LoginForm } from "./LoginForm";
import { type LoginFormValues } from "./schema";
import { useLogin } from "./useLogin";

export function LoginPage() {
  const navigate = useNavigate();
  const { mutate: login, isPending, error } = useLogin();

  function handleSubmit(values: LoginFormValues) {
    login(
      {
        username: values.username,
        password: values.password,
        remember: values.remember ?? false,
      },
      { onSuccess: () => navigate("/products") },
    );
  }

  const apiError = error ? "Неверный логин или пароль" : null;

  return (
    <div className="h-screen overflow-y-auto bg-gray-100 flex items-center justify-center py-8 px-4 relative">
      <div className="absolute bottom-5 right-6 text-sm text-gray-500 bg-white/80 rounded-lg px-3 py-2 shadow-sm">
        <span className="font-semibold text-gray-700">Тестовый вход:</span>{" "}
        <span className="font-mono">emilys</span>{" / "}
        <span className="font-mono">emilyspass</span>
      </div>
      <div className="relative w-131.75 rounded-2xl flex flex-col p-12 outline-solid outline-[5px] outline-white bg-login-card shadow-login-card">
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl p-px bg-login-border"
          style={{
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        <div className="flex flex-col items-center gap-8 mb-8">
          <LogoIcon />
          <div className="text-center flex flex-col items-center gap-3">
            <h1 className="text-[40px] font-semibold text-gray-900 leading-[110%] tracking-[-0.015em]">
              Добро пожаловать!
            </h1>
            <p className="text-[18px] font-medium text-text-subtitle">
              Пожалуйста, авторизируйтесь
            </p>
          </div>
        </div>

        <LoginForm
          onSubmit={handleSubmit}
          isLoading={isPending}
          apiError={apiError}
        />

        <div className="flex items-center gap-3 mt-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className=" text-gray-400">или</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <p className="text-[18px] text-center text-text-hint mt-8">
          Нет аккаунта?{" "}
          <a
            href="#"
            className="text-primary font-semibold underline underline-offset-4"
          >
            Создать
          </a>
        </p>
      </div>
    </div>
  );
}
