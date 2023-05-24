import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLangContext } from "../../contexts/LangContext";
import Box from "../UI/Box";

export default function OtherProfile() {
    const [user, setUser] = useState(null)
    const { langValues } = useLangContext()
    const { id } = useParams()

    useEffect(() => {
        fetch(`/api/users/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data?.error) {
                    return
                }
                setUser(data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Box>
            {user
                ? (<div className="flex flex-row gap-4">
                <img src={user.avatar_url} className="w-40"/>
                <div className="flex flex-col gap-2">
                    <div className="text-2xl font-bold">
                        {user.first_name} {user.last_name}
                    </div>
                    <div className="text-xl">
                        {user.email}
                    </div>
                </div>
                </div>)
                : <h1>usuario no exsiste</h1>}
        </Box>
    )
}