import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ component: Component, redirectTo,socket }) {
    const { isLoggedIn, isRefresh } = useSelector(state => state.authorisation);
    return !isLoggedIn && !isRefresh ? <Navigate to={redirectTo} /> : <Component socket={ socket} />
}