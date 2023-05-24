import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import useForm from "../hooks/useFrom"
import { message } from "antd"
import { useLangContext } from "../contexts/LangContext"
import ErrorViewFormItem from "../components/login/ErrorViewFormItem"
import Button from "../components/UI/Button"
import { useAuthContext } from "../contexts/AuthContext"
import Box from "../components/UI/Box"

export default function ForgotPasswordCallback() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')
    const { langValues } = useLangContext()
    const form = useForm({
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
    })
    const [messageApi, messageContextHolder] = message.useMessage()
    const { updateUser } = useAuthContext()

    useEffect(() => {
        if (!code) return navigate('/forgot-password')
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.hasErrors) {
            messageApi.error(langValues.login.form_has_errors);
            return;
        }
        const formItems = form.formRef.current.elements;
        const data = {};
        for (const item of formItems) {
            data[item.name] = item.value;
        }
        data.code = code
        const res = await fetch('/api/auth/reset-password/confirm', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (!res.ok) {
            messageApi.error(langValues.resetPassword.callback.can_not_reset_password);
            return;
        }
        updateUser()
        navigate('/')
    }

    return (
        <Box>
            {messageContextHolder}
            <h1 className="text-3xl mt-10">{langValues.resetPassword.callback.title}</h1>
            <form
                className="flex flex-col gap-6 mt-6"
                ref={form.formRef}
                onChange={form.validate}
                onSubmit={handleSubmit}
            >
                <ErrorViewFormItem
                    field={form.fields[0]}
                    validateField={() => form.validateField(form.fields[0].name)}
                />
                <Button
                    type="submit"
                    className="w-full"
                    disabled={form.hasErrors}
                >
                    {langValues.resetPassword.callback.submit_button}
                </Button>
            </form>
        </Box>
    )
}