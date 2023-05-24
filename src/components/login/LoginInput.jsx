import PasswordInput from '../UI/PasswordInput';

export default function index({ type, name, placeholder, defaultValue, ...props }) {
    return (
        <>
            {
                type !== 'password'
                    ? (<input
                        {...props}
                        autoComplete="off"
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        className="border border-gray-300 rounded-md px-3 py-1 outline-none focus:ring ring-main ring-opacity-30"
                    />)
                    : (<PasswordInput
                        {...props}
                        name={name}
                        defaultValue={defaultValue}
                        className="border border-gray-300 rounded-md px-3 py-1 outline-none focus:ring ring-main ring-opacity-30"
                        placeholder={placeholder}
                    />)
            }
        </>
    )
}