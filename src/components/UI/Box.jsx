export default function Box({ className, children }) {
    return (
        <div
            className={`flex flex-col gap-10 mx-auto 2xl:px-[35rem] px-[20rem] nav-lite:px-10 h-full ${className}`}
        >
            {children}
        </div>
    )
}