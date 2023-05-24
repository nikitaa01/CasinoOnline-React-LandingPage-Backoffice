import { useParams } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"
import OtherProfile from "../components/profile/OtherProfile"
import OwnProfile from "../components/profile/OwnProfile"

export default function Profile() {
    const { id } = useParams()
    const { user } = useAuthContext()

    return (
        <>
            {
                user && user?.id === id
                    ? (
                        <OwnProfile />
                    )
                    : (
                        <OtherProfile />
                    )
            }
        </>
    )

}