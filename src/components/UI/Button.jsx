import { LoadingOutlined } from "@ant-design/icons";

export default function Button({
    className,
    loading = false,
    style = 'main',
    children,
    ...props
}) {
    const styles = {
        main: 'bg-main text-white',
        text: 'bg-transparent text-black',
        bordered: 'bg-white text-black border',
        secondary: 'bg-secondary text-white',
        danger: 'bg-red-500 text-white',
    }

    return (
        <button
            disabled={loading}
            {...props}
            className={`px-4 py-[6px] rounded-md hover:brightness-75 transition-brightness duration-100 ease-in-out focus:outline-none disabled:grayscale [&[disabled]]:cursor-not-allowed ${styles[style]} ${className}`}
        >
            <div className="flex gap-2 justify-center">
                {children}
                {loading && <LoadingOutlined />}
            </div>
        </button>
    );
}
