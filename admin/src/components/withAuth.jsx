import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
const withAuth = (WrappedComponent) => (props) => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!user && !loading) {
            navigate("/login")
        }
    }, [loading])

    return user? <WrappedComponent {...props} />:<Loading/>;

};

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-center text-3xl">Please Wait....</h1>
        </div>
    )
}

export default withAuth;