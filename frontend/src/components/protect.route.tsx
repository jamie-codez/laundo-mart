import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from "@/providers/AuthContext.tsx";


const ProtectedRoute = () => {
    const {isAuthenticated} = useAuth();

    return (isAuthenticated ? <Outlet/> : <Navigate to="/login" replace={true}/>);
};

export default ProtectedRoute;