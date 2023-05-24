import { useNavigate, useLocation } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'

export default function BackLayout({ children }) {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div className='mb-10 h-full'>
            <a
                className='p-4 cursor-pointer block'
                onClick={() => {
                    if (location.state && location.state.from) {
                        navigate(-1);
                    } else {
                        navigate('/')
                    }
                }}
            >
                <LeftOutlined />
            </a>
            {children}
        </div>
    )
}