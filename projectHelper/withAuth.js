import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/authProvider";
import { useRouter } from "next/router";
import Index from "../pages/index";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { useDispatch } from "react-redux";

const withAuth = (Component) => {
  // Authntication

  const Auth = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, [user]);

    // If user is not logged in, return login component
    
    if (!user) {
      return <>{isLoading ? <Spinner /> : <Index />}</>;
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
