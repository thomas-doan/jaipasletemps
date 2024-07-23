import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface RegisterFormProps {
  setSuccessRegister: (value: boolean) => void;
}
export const RegisterForm: FC<RegisterFormProps> = (props) => {
  const { setSuccessRegister } = props;
  const { registerContext } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const { email, password, name } = data;
    try {
      await registerContext(email, password, name);
      setSuccessRegister(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="email">Email</Label>
        <Input id="email" {...register("email")} />
        <Label htmlFor="name">Pseudo</Label>
        <Input id="name" type="text" {...register("name")} />
        <Label htmlFor="password">Mot de passe</Label>
        <Input id="password" type="password" {...register("password")} />
        <Button type="submit">Inscription</Button>
      </form>
    </>
  );
};
