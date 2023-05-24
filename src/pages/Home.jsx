import { Link } from 'react-router-dom'
import Box from '../components/UI/Box'
import { useLangContext } from '../contexts/LangContext'

export default function Home() {
    const { langValues } = useLangContext()

    return (
        <Box className="h-full">
            <div className='flex flex-col justify-center items-center h-full gap-4 pb-32'>
                <p className='text-lg'>{langValues.home.description}</p>
                <h1 className='text-[5rem] mobile:text-[2.5rem] nav-lite:text-[3.5rem]'>Pixel Casino</h1>
                <Link to='/download' className='py-4 px-6 bg-main text-white rounded'>
                    {langValues.home.get_started}
                </Link>
            </div>
        </Box>
    )
}