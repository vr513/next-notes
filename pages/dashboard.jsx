import { useAuth } from "../contexts/AuthContext";
import withAuth from "./withAuth";
import { useRouter } from 'next/router'
import react, { useEffect, useState, useRef } from "react";
;
function dashboard() {
    const { LogOut, getNotes, setNewNotes } = useAuth();
    const nav = useRouter();
    useEffect(() => {

        const fetchData = async () => {
            console.log("in use effect")
            const data = await getMe();
            console.log(data)
            setUiNotes(data)
            console.log("Use effect end")
        }
        fetchData()
    }, [])

    const [uiNotes, setUiNotes] = useState(null);
    const testRef = useRef();
    async function Logout() {
        try {
            await LogOut();
            nav.push('/login')
        } catch (c) {
            console.log(c)
        }
    }
    async function getMe() {
        let t = null;
        t = await getNotes()
        setUiNotes(t);
        return t;
    }
    async function addNote(evt) {
        evt.preventDefault();
        let target = null;
        const res = await setNewNotes(testRef.current.value)
        console.log(res)
        if (uiNotes === null) {
            target = [testRef.current.value]
        }
        else { target = [...uiNotes, testRef.current.value] }
        setUiNotes(target)
    }
    return (
        <>
            <button class="btn btn-primary" onClick={Logout}>Logout</button>
            <button class="btn btn-primary" onClick={getMe}>Get New Notes</button>
            <div className="container">
                {uiNotes && uiNotes.map((note, index) => (
                    <h2 key={index}>{note}</h2>
                ))}
                <form onSubmit={addNote}>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Example textarea</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" ref={testRef}></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default withAuth(dashboard);