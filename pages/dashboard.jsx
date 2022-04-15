import { useAuth } from "../contexts/AuthContext";
import withAuth from "./withAuth";
import { useRouter } from 'next/router'
import react, { useEffect } from "react";
function dashboard() {
    const { LogOut, currentUser } = useAuth();
    const nav = useRouter();

    useEffect(() => {
        if (currentUser === null) {
            nav.push("/login")
        } else {
            nav.push("/dashboard")
        }
    }, [])


    async function Logout() {
        try {
            await LogOut();
            nav.push('/login')
        } catch (c) {
            console.log(c)
        }
    }
    return (
        <button onClick={Logout}>Logout</button>
    )
}

export default withAuth(dashboard);