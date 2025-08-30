import { useAuth } from "@/hooks/useAuth";
import { RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState, type ElementType } from "react";
import { useNavigate } from "react-router-dom";

const withAuth =
  (WrappedComponent: ElementType, isAuth = true) =>
  (props: any) => {
    // const pathname = useMemo(() => window.location.pathname, []);
    const navigate = useNavigate();
    // const { user, loading } = useAuth();
    const { user, loading} = useAuth()

    // console.log(pathname);

    useEffect(() => {
      if (!user && !loading && isAuth) {
        navigate(`/signin`);
      }

      if (user && !isAuth) {
        navigate("/");
      }
    }, [loading]);

  
    if (isAuth) {
      if (loading) return <Loading />;
      if (user) return <WrappedComponent {...props} />;
      return null; // redirect happening
    }

    // Public page = Signin and signup
    if (!isAuth) {
      if (!loading && !user) return <WrappedComponent {...props} />; 
      return <Loading />;
    }

    return null;

  
  };

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-60px)]">
      <h1 className="text-3xl login-font flex items-center gap-5">
        <RefreshCw className="animate-spin mt-1" /> Please wait...
      </h1>
    </div>
  );
};

export default withAuth;

// import { useAuth } from "@/hooks/useAuth";
// import { RefreshCw } from "lucide-react";
// import { useEffect, type ElementType } from "react";
// import { useNavigate } from "react-router-dom";

// const withAuth = (WrappedComponent: ElementType, isAuth = true) => (props: any) => {
//     const navigate = useNavigate();
//     const { user, loading } = useAuth();

//     useEffect(() => {
//       if (!user && !loading && isAuth) {
//         navigate("/signin");
//       }

//       if (user && !isAuth) {
//         navigate("/");
//       }
//     }, [loading]);

    
//     if (isAuth) {
//       if (loading) return <Loading />;
//       if (user) return <WrappedComponent {...props} />;
//       return null; 
//     }

//     if (!isAuth) {
     
//       if (!loading && !user) return <WrappedComponent {...props} />;
//       return <Loading />;
//     }

//     return null;

//   };

// const Loading = () => {
//   return (
//     <div className="flex justify-center items-center h-[calc(100vh-60px)]">
//       <h1 className="text-3xl login-font flex items-center gap-5">
//         <RefreshCw className="animate-spin mt-1" /> Please wait...
//       </h1>
//     </div>
//   );
// };

// export default withAuth;