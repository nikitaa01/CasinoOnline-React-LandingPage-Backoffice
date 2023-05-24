import { Link } from 'react-router-dom'

export default function TextLink({to, children, className, ...props}) {
    return (
        <Link
            {...props}
            className={`text-main hover:underline ${className}`}
            to={to}
        >
            {children}
        </Link>
    )
}