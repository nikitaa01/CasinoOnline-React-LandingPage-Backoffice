import Box from "../components/UI/Box";
import { useLangContext } from "../contexts/LangContext";
import { fileUrl } from "../constants/fileUrl"

export default function Download() {
    const { langValues } = useLangContext()

    return (
        <Box>
            <div className="flex gap-6 justify-center items-center nav-lite:flex-col h-full">
                <h1 className="text-[2rem] nav-lite:text-[1.2rem] max-w-[80%]">{langValues.download.title}</h1>
                <div className="flex flex-col gap-6 max-w-[50%] nav-lite:max-w-[80%]">
                    <h3 className="text-lg mobile:hidden nav-lite:text-base">{langValues.download.description}</h3>
                    <a href={fileUrl} className='py-4 px-6 bg-main text-white rounded text-center'>{langValues.download.button}</a>
                </div>
            </div>
        </Box>
    )
}