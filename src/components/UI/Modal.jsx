import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import { CloseOutlined } from "@ant-design/icons"

export default function Modal({ children, open, handleClose }) {
    const [modalRoot, setModalRoot] = useState(null)

    useEffect(() => {
        const modalRoot = document.createElement("div")
        document.body.insertAdjacentElement('afterbegin', modalRoot)
        setModalRoot(modalRoot)
        return () => {
            document.body.removeChild(modalRoot)
        }
    }, [])

    if (!modalRoot && !open) {
        return null
    }

    return createPortal(
        <>
            {open && <div>
                <div
                    className={`w-full h-screen z-[50] fixed inset-0 bg-black bg-opacity-20 backdrop-blur-[0.5px]`}
                    onClick={handleClose}
                ></div>
                <dialog
                    open={true}
                    className='mt-20 fixed rounded-md z-[51] shadow-2xl min-w-[60vw]'
                >
                    <div>
                        <div className="flex justify-between">
                            <button
                                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                                onClick={handleClose}
                            >
                                <CloseOutlined />
                            </button>
                        </div>
                        {children}
                    </div>
                </dialog>
            </div>}
        </>,
        modalRoot
    )
}
