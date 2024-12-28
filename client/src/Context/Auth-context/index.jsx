import { InitialSignInFormData, InitialSignUpFormData } from "@/config";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(InitialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(InitialSignUpFormData);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
