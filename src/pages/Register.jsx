import { useAuthContext } from "../contexts/AuthContext"
import { useLangContext } from "../contexts/LangContext"
import useForm from "../hooks/useFrom"
import { Link, useNavigate } from "react-router-dom"
import { message } from "antd"
import GoogleLogin from '../components/GoogleLogin'
import UserForm from "../components/UserForm"
import Box from "../components/UI/Box"

export default function Register() {
    const { langValues } = useLangContext()
    const { register } = useAuthContext()
    const navigate = useNavigate()
    const [messageApi, messageContextHolder] = message.useMessage()

    const form = useForm(
        {
            name: 'first_name',
            label: langValues.login.first_name_label,
            validate: (value) => {
                if (!value) return langValues.login.first_name_required
                if (value.length < 4) return langValues.login.first_name_length
                return true
            },
            type: 'text',
            placeholder: langValues.login.first_name_placeholder,
        },
        {
            name: 'last_name',
            label: langValues.login.last_name_label,
            validate: (value) => {
                if (!value) return langValues.login.last_name_required
                if (value.length < 4) return langValues.login.last_name_length
                return true
            },
            type: 'text',
            placeholder: langValues.login.last_name_placeholder,
        },
        {
            name: 'email',
            label: langValues.login.email_label,
            validate: (value) => {
                if (!value) return langValues.login.email_required
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return langValues.login.email_invalid
                return true
            },
            type: 'email',
            placeholder: langValues.login.email_placeholder,
        },
        {
            name: 'password',
            label: langValues.login.password_label,
            validate: (value) => {
                const errors = {}
                if (!value) errors.required = langValues.login.password_required
                if (value.length < 8) errors.length = langValues.login.password_length
                if (!/[a-z]/.test(value)) errors.lower = langValues.login.password_lower
                if (!/[A-Z]/.test(value)) errors.upper = langValues.login.password_upper
                if (!/[0-9]/.test(value)) errors.number = langValues.login.password_number
                return Object.keys(errors).length === 0 ? true : errors
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
        const res = await register(data)
        if (!res || !res.ok) {
            messageApi.error(langValues.login[res.data.message_code_string]);
            return;
        }
        if (formItems['avatar'].files.length > 0) {
            const formData = new FormData();
            formData.append('avatar', formItems['avatar'].files[0]);
            const res = await fetch('/api/avatar', {
                method: 'POST',
                body: formData,
            })
            if (!res.ok) {
                messageApi.error(langValues.login[res.data.message_code_string]);
                return;
            }
        }
        navigate('/')
    }


    return (
        <div>
            {messageContextHolder}
            <div className="py-10 flex items-center justify-center gap-4">
                <Link
                    to={'/login'}
                    className="px-4 py-[6px] rounded-md hover:brightness-75 transition-brightness duration-100 ease-in-out flex items-center justify-center gap-2 bg-transparent"
                >
                    {langValues.login.login_button}
                </Link>
                <Link
                    to={'/register'}
                    className="px-4 py-[6px] rounded-md hover:brightness-75 transition-brightness duration-100 ease-in-out flex items-center justify-center gap-2 bg-secondary text-white"
                >
                    {langValues.login.register_button}
                </Link>
            </div>
            <Box>
                <UserForm
                    form={form}
                    handleSubmit={handleSubmit}
                    submitText={langValues.login.register_button}
                />
                <GoogleLogin />
            </Box>
        </div>
    )
}