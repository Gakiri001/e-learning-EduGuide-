import { InitialSignInFormData, InitialSignUpFormData } from "@/config";
import { logInService, registerService } from "@/services";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(InitialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(InitialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null
  })

  async function handleRegisterUser(event) {
    event.preventDefault();
    const data = await registerService(signUpFormData);

    console.log(data);
  }

  async function handleLoginUser(event){
    event.preventDefault()
    const data = await logInService(signInFormData)

    if(data.success){
      setAuth({
        authenticate: true,
        user: data.user
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
