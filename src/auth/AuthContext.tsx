// 1. constant for context
// 2. function to retrieve the context
// 3. default function to wrap our app using the react context provider

import { auth } from "@/lib/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

type AuthUser = {
  currentUser: User | undefined;
  isLoading: boolean;
};

const AuthContext = createContext<AuthUser>({
  currentUser: undefined,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(undefined);
        navigate("/login");
      }
      setIsLoading(false);
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  const value = {
    currentUser,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
