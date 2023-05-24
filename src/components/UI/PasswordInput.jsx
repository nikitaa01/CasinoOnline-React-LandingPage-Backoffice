import { useState } from 'react'
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

export default function PasswordInput({ name, placeholder, className, ...props }) {
    const [PasswordIconRender, setPasswordIconRender] = useState(EyeOutlined);
    const [inputFocus, setInputFocus] = useState(false);

    const togglePassword = () => {
        if (PasswordIconRender === EyeOutlined) {
            setPasswordIconRender(EyeInvisibleOutlined);
        } else {
            setPasswordIconRender(EyeOutlined);
        }
    };

    const focusClassNames = className
        .match(/focus:([^:\s]+)/g)
        .map(resultado => resultado.split(' ')[0]
            .replace('focus:', ''))

    return (
        <div className={`flex flex-row flex-nowrap items-center ${className} ${inputFocus && focusClassNames}`}>
            <input
                {...props}
                name={name}
                defaultValue={props.defaultValue}
                type={PasswordIconRender === EyeOutlined ? "password" : "text"}
                className={`outline-none border-none w-full text-base bg-transparent`}
                placeholder={placeholder}
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
            />
            <button
                type="button"
                onClick={togglePassword}
                className="bg-transparent border-none outline-none h-full flex items-center"
            >
                <PasswordIconRender />
            </button>
            <div className='hidden ring'></div>
        </div>
    );
}