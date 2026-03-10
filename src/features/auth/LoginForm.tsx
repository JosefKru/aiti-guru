import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "../../components/ui/Button";
import { Checkbox } from "../../components/ui/Checkbox";
import { Input } from "../../components/ui/Input";
import { IconLock } from "../../components/ui/icons/IconLock";
import { IconUser } from "../../components/ui/icons/IconUser";
import { loginSchema, type LoginFormValues } from "./schema";

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  isLoading?: boolean;
  apiError?: string | null;
}

export function LoginForm({ onSubmit, isLoading, apiError }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "", remember: false },
  });

  const username = useWatch({ control, name: "username" });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Логин"
        placeholder="Введите логин"
        className="h-13.75"
        leftIcon={<IconUser />}
        error={errors.username?.message}
        value={username}
        {...register("username")}
        onChange={(e) => setValue("username", e.target.value)}
      />
      <Input
        label="Пароль"
        type="password"
        placeholder="Введите пароль"
        className="h-13.75 mb-1"
        leftIcon={<IconLock />}
        error={errors.password?.message}
        {...register("password")}
      />
      <Checkbox label="Запомнить данные" {...register("remember")} className="my-1" />
      {apiError && (
        <p className="text-sm text-red-500">{apiError}</p>
      )}
      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? "Вход..." : "Войти"}
      </Button>
    </form>
  );
}
