import ModalForm from "./ModalForm"
import { useState } from "react"
import Button from "../UI/Button"

export default function CreateNewElementForm({
    formItems,
    onFinish,
    buttonText,
    formTitle,
}) {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const onFinishProp = (newElement) => {
        onFinish(newElement)
        setDrawerOpen(false)
    }

    return (
        <>
            <Button
                style="main"
                onClick={() => setDrawerOpen(true)}
            >
                {buttonText}
            </Button>
            <ModalForm
                title={formTitle}
                open={drawerOpen}
                onClose={() => {
                    setDrawerOpen(false)
                }}
                onFinish={onFinishProp}
                formItems={formItems}
            />
        </>
    )
}
