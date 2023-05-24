import { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { CloudUploadOutlined } from '@ant-design/icons'
import { useLangContext } from '../../contexts/LangContext'
import { message } from 'antd'

export default function FileInput({ name, defaultValue }) {
    const inputRef = useRef(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const { langValues } = useLangContext()
    const [messageApi, messageContextHolder] = message.useMessage()

    const onDrop = useCallback(acceptedFiles => {
        const extensions = ["jpg", "jpeg", "png", "gif", "bmp", "tif", "tiff", "raw", "svg", "webp"];
        const fileExtension = acceptedFiles[0].name.split('.').pop().toLowerCase();
        if (!extensions.includes(fileExtension)) {
            messageApi.error(langValues.fileInput.invalid_extension)
            return
        }
        const fileList = new DataTransfer();
        fileList.items.add(acceptedFiles[0]);
        inputRef.current.files = fileList.files;
        setSelectedImage(URL.createObjectURL(acceptedFiles[0]));
        console.log(inputRef.current.files)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div className='h-40 aspect-square'>
            <div {...getRootProps()}>
                {messageContextHolder}
                <input className='h-40 aspect-square' name={name} {...getInputProps()} ref={inputRef} />
                <div
                    className='h-40 aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 cursor-pointer'
                >
                    {
                        inputRef.current?.files?.length > 0 || defaultValue ? (
                            <img className='h-32' src={selectedImage ?? defaultValue} />
                        ) :
                            isDragActive
                                ? <p>{langValues.fileInput.drag_active}</p>
                                : (
                                    <>
                                        <CloudUploadOutlined className='text-[3rem] text-gray-600' />
                                        <p className='text-xs'>{langValues.fileInput.drag_inactive}</p>
                                    </>
                                )
                    }
                </div>
            </div>
        </div>
    )
}