import { useState } from 'react'
import LoginInput from './LoginInput'
import { CheckCircleTwoTone } from "@ant-design/icons";
import { useLangContext } from '../../contexts/LangContext';

export default function ErrorViewFormItem({ field, validateField }) {
    const { langValues } = useLangContext()
    const [error, setError] = useState(null)

    const handleChange = () => {
        const validated = validateField(field.name)
        if (validated !== true) {
            setError(validated)
            return
        }
        setError(true)
    }
    return (
        <div
            className="flex flex-col gap-1"
        >
            <label htmlFor={field.name}>{field.label}</label>
            <LoginInput
                onChange={handleChange}
                defaultValue={field.defaultValue}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
            />
            {error && field.type !== 'password' && <span className="text-red-500 text-sm">{error}</span>}
            {field.type === 'password' && (
                <div className='p-2 gap-y-4 gap-x-2 grid grid-cols-2 items-center pb-6'>
                    {
                        ['length', 'lower', 'upper', 'number'].map((key, i) => (
                            <div className='flex items-center gap-2' key={i}>
                                <CheckCircleTwoTone className='flex items-center' twoToneColor={error === true ? '#52c41a' : error === null || key in error ? '#d4d4d4' : '#52c41a'} />
                                <span className="text-sm text-gray-500">{langValues.login[`password_${key}`]}</span>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    )
}