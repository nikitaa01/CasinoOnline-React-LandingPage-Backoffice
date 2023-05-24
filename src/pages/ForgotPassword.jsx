import { useState } from "react"
import useForm from "../hooks/useFrom"
import { useLangContext } from "../contexts/LangContext"
import Button from "../components/UI/Button"
import LoginInput from "../components/login/LoginInput"
import { message } from "antd"
import Box from "../components/UI/Box"

export default function ForgotPassword() {
    const [success, setSuccess] = useState(false)
    const [messageApi, messageContextHolder] = message.useMessage()
    const [loading, setLoading] = useState(false)

    const { langValues } = useLangContext()

    const form = useForm({
        name: 'email',
        label: langValues.login.email_label,
        validate: (value) => {
            if (!value) return false
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return false
            return true
        },
        type: 'email',
        placeholder: langValues.login.email_placeholder,
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (form.hasErrors) {
            messageApi.error(langValues.login.form_has_errors);
            setLoading(false)
            return;
        }
        const formItems = form.formRef.current.elements;
        const data = {};
        for (const item of formItems) {
            data[item.name] = item.value;
        }
        const res = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (!res.ok) {
            messageApi.error(langValues.login.can_not_send_email);
            setLoading(false)
            return;
        }
        setLoading(false)
        setSuccess(true)
    }

    return (
        <Box>
            {messageContextHolder}
            <h1 className="text-3xl mt-10">{langValues.resetPassword.title}</h1>
            <p className="text-lg">{langValues.resetPassword.description}</p>
            {!success
                ? (<form
                    className="flex flex-col gap-6 mt-6"
                    ref={form.formRef}
                    onChange={form.validate}
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-1">
                        <label htmlFor={form.fields[0].name}>{form.fields[0].label}</label>
                        <LoginInput
                            name={form.fields[0].name}
                            type={form.fields[0].type}
                            placeholder={form.fields[0].placeholder}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={form.hasErrors}
                        loading={loading}
                    >
                        {langValues.resetPassword.send_button}
                    </Button>
                </form>
                )
                : (
                    <div className="flex flex-col mt-6 whitespace-pre">
                        <p className="text-lg">{langValues.resetPassword.success_message}</p>
                    </div>
                )}
        </Box>
    )
}