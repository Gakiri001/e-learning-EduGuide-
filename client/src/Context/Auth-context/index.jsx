import { Skeleton } from "@/components/ui/skeleton";
import { InitialSignInFormData, InitialSignUpFormData } from "@/config";
import { checkAuthService, logInService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(InitialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(InitialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });

  const [loading, setLoading] = useState(true);

  async function handleRegisterUser(event) {
    event.preventDefault();
    const data = await registerService(signUpFormData);

    console.log("New User", data);
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    const data = await logInService(signInFormData);

    if (data.data.success) {
      console.log("Metadata", data);
      console.log("user", data.data.data.user);
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(data.data.data.accessToken),
      );
      setAuth({
        authenticate: true,
        user: data.data.data.user,
      });
    } else {
      setAuth({
        authenticate: false,
        user: null,
      });
      console.log("The authentication failed");
    }
  }

  //Check Auth user

  async function checkAuthUser() {
    try {
      const data = await checkAuthService();

      if (data.data.success) {
        setAuth({
          authenticate: true,
          user: data.data.data.user,
        });
        setLoading(false);
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (!error?.response?.data?.success) {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    }
  }

  function resetCredentials() {
    setAuth({
      authenticate: false,
      user: null,
    });
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        setAuth,
        resetCredentials,
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthProvider;
