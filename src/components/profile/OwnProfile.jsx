import useForm from '../../hooks/useFrom'
import { useAuthContext } from '../../contexts/AuthContext'
import { useLangContext } from '../../contexts/LangContext'
import UserForm from '../UserForm'
import Box from '../UI/Box'
import TextLink from '../UI/TextLink'
import { message } from 'antd'
import DeleteUser from './DeleteUser'

export default function OwnProfile() {
    const { user, updateUser } = useAuthContext()
    const { langValues } = useLangContext()
    const [messageApi, messageContextHolder] = message.useMessage()

    if (!user) return null

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
            defaultValue: user.first_name,
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
            defaultValue: user.last_name,
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
            defaultValue: user.email,
            placeholder: langValues.login.email_placeholder,
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
        data.avatar = undefined
        data[""] = undefined
        console.log(data)
        try {
            const resPut = await fetch('/api/users/self', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!resPut || !resPut.ok) {
                const dataRes = await resPut.json()
                messageApi.error(langValues.profile[dataRes.message_code_string]);
                return;
            }
        } catch (error) {
            messageApi.error(langValues.profile.user_not_updated)
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
        updateUser()
        messageApi.success(langValues.profile.update_success)
    }

    return (
        <Box>
            {messageContextHolder}
            <div className='flex gap-2 border rounded-full py-10 justify-center mobile:text-sm'>
                {langValues.profile.your_coins.replace('{coins}', user.coin_balance)}
                <TextLink
                    to="/buy"
                >
                    {langValues.profile.buy_coins}
                </TextLink>
            </div>
            <h3 className='text-xl'>{langValues.profile.title}</h3>
            <UserForm
                form={form}
                handleSubmit={handleSubmit}
                submitText={langValues.profile.save_changes}
                defaultPhoto={user.avatar_url}
            >
                <div className='flex justify-end mr-2'>
                    <TextLink
                        to="/forgot-password"
                    >
                        {langValues.profile.change_password}
                    </TextLink>
                </div>
            </UserForm>
            <DeleteUser />
        </Box>
    )
}