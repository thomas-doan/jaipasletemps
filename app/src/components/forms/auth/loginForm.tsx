import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import {useRouter} from "next/navigation";

export const LoginForm = () => {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();
  const router = useRouter()

  const onSubmit = async (data: any) => {
    const { email, password } = data;
    try {
      await login(email, password);
      router.push("/games");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="email">Email</Label>
      <Input id="email" {...register("email")} />
      <Label htmlFor="password">Mot de passe</Label>
      <Input id="password" type="password" {...register("password")} />
      <Button type="submit">Connexion</Button>
    </form>
  );
};
