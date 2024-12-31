import { InitialSignInFormData, InitialSignUpFormData } from "@/config";
import { logInService, registerService } from "@/services";
import { createContext, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(InitialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(InitialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });

  async function handleRegisterUser(event) {
    event.preventDefault();
    const data = await registerService(signUpFormData);

    console.log("New User", data);
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    const data = await logInService(signInFormData);

    if (data.data.success) {
      console.log("dataaaaaa", data);
      console.log("user", data.data.data.user);
      sessionStorage.setItem("accessToken", data.data.data.accessToken);
      setAuth({
        authenticate: true,
        user: data.data.data.user,
      });
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

export { AuthContext };
export default AuthProvider;
