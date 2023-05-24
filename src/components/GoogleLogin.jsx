import { useLangContext } from "../contexts/LangContext";
import { GoogleOutlined } from "@ant-design/icons";

export default function GoogleLogin() {
    const { langValues } = useLangContext()

    return (
        <a
            href="/api/auth/login/google"
            className="px-4 py-[6px] rounded-md hover:brightness-75 transition-brightness duration-100 ease-in-out flex items-center justify-center gap-2 bg-white text-black border"
        >
            <GoogleOutlined
                className="flex items-center"
            />
            {langValues.login.login_google}
        </a>
    )
}