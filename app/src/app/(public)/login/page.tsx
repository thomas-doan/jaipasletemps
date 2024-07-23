"use client";

import { LoginForm } from "@/components/forms/auth/loginForm";
import { RegisterForm } from "@/components/forms/auth/registerForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

function LoginPage() {
  const [successRegister, setSuccessRegister] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  useEffect(() => {
    if (successRegister) {
      handleTabChange("login");
    }
    setSuccessRegister(false);
  }, [successRegister]);

  return (
    <>
      <section className="flex justify-center items-center w-screen h-screen">
        <div className="xl:w-[500px] xl:max-h-[680px] xl:h-[680px] rounded-xl p-4">
          <Tabs
            value={activeTab}
            className="w-full"
            onValueChange={handleTabChange}
          >
            <TabsList className="w-full bg-sunshine-yellow-light">
              <TabsTrigger value="login" className="w-1/2">
                Connexion
              </TabsTrigger>
              <TabsTrigger value="register" className="w-1/2">
                Inscription
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="h-full">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register" className="h-full">
              <RegisterForm setSuccessRegister={setSuccessRegister} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}

export default LoginPage;