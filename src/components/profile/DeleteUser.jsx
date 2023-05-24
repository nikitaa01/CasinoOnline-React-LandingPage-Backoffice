import { useAuthContext } from "../../contexts/AuthContext";
import { useLangContext } from "../../contexts/LangContext";
import Button from "../UI/Button";
import { message } from "antd";

export default function DeleteUser() {
    const { langValues } = useLangContext()
    const { updateUser } = useAuthContext()
    const [messageApi, messageContextHolder] = message.useMessage()

    const handleClick = async () => {
        const { ok } = await fetch('/api/users/self', {
            method: "DELETE",
        })
        if (ok) {
            updateUser()
            messageApi.success(langValues.profile.deleted)
            return
        }
        messageApi.error(langValues.profile.do_not_deleted)
    }

    return (
        <>
            {messageContextHolder}
            <Button
                style="danger"
                onClick={handleClick}
            >
                {langValues.profile.delete_user}
            </Button>
        </>
    )
}