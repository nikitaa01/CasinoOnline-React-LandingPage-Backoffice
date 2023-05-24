import { useAuthContext } from "../contexts/AuthContext"
import { useLangContext } from "../contexts/LangContext"
import useForm from "../hooks/useFrom"
import Button from "../components/UI/Button"
import { useNavigate } from "react-router-dom"
import { message } from "antd"
import LoginInput from "../components/login/LoginInput"
import GoogleLogin from "../components/GoogleLogin"
import { Link } from "react-router-dom"
import Box from "../components/UI/Box"
import TextLink from "../components/UI/TextLink"

export default function Login() {
    const { langValues } = useLangContext()
    const { login } = useAuthContext()
    const navigate = useNavigate()
    const [messageApi, messageContextHolder] = message.useMessage()

    const form = useForm(
        {
            name: 'email',
            label: langValues.login.email_label,
            validate: (value) => {
                if (!value) return false
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return false
                return true
            },
            type: 'email',
            placeholder: langValues.login.email_placeholder,
        },
        {
            name: 'password',
            label: langValues.login.password_label,
            validate: (value) => {
                if (!value) return false
                if (value.length < 4) return false
                return true
            },
            type: 'password',
            placeholder: langValues.login.password_placeholder,
        },
    )

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.hasErrors) {
            messageApi.error(langValues.login.form_has_errors);
            return;
        }
        const formItems = form.formRef.current.elements;
        const data = {};
        for (const item of formItems) {
            data[item.name] = item.value;
        }
        const res = await login(data.email, data.password)
        if (!res || !res.ok) {
            messageApi.error(langValues.login[res.data.message_code_string]);
            return;
        }
        navigate('/')
    }


    return (
        <div>
            {messageContextHolder}
            <div className="py-10 flex items-center justify-center gap-4">
                <Link
                    to={'/login'}
                    className="px-4 py-[6px] rounded-md hover:brightness-75 transition-brightness duration-100 ease-in-out flex items-center justify-center gap-2 bg-secondary text-white"
                >
                    {langValues.login.login_button}
                </Link>
                <Link
                    to={'/register'}
                    className="px-4 py-[6px] rounded-md hover:brightness-75 transition-brightness duration-100 ease-in-out flex items-center justify-center gap-2 bg-transparent"
                >
                    {langValues.login.register_button}
                </Link>
            </div>
            <Box>
                <form
                    className="flex flex-col gap-6"
                    ref={form.formRef}
                    onChange={form.validate}
                    onSubmit={handleSubmit}
                >
                    {
                        form.fields.map((field, i) => (
                            <div
                                className="flex flex-col gap-1"
                                key={i}
                            >
                                <label htmlFor={field.name}>{field.label}</label>
                                <LoginInput
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                />
                            </div>
                        ))}
                    <div className="ml-auto mr-1">
                        <TextLink
                            to={'/forgot-password'}
                            className="text-main hover:underline"
                        >
                            {langValues.login.forgot_password}
                        </TextLink>
                    </div>
                    <Button
                        type="submit"
                        disabled={form.hasErrors}
                    >
                        {langValues.login.login_button}
                    </Button>
                </form>
                <GoogleLogin />
            </Box>
        </div>
    )
}