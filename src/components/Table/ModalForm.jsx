import { Form } from "antd"
import FormItem from "./FormItem"
import Modal from "../UI/Modal"
import Button from "../UI/Button"

export default function ModalForm({
    open,
    onClose,
    onFinish,
    formItems,
    submitText = "Create",
}) {
    const [form] = Form.useForm()
    const mainInput = formItems[0]

    const handleFinish = () => {
        form.validateFields()
            .then((newRow) => {
                onFinish(newRow)
                form.resetFields()
            }).catch((err) => {
                console.log(err)
            })
    }

    const handleClose = () => {
        onClose()
        form.resetFields()
    }
    return (
        <Modal open={open} handleClose={handleClose}>
            <Form form={form} onFinish={handleFinish} layout="vertical">
                <div>
                    <h2 className="text-lg font-semibold pb-2">
                        {mainInput.label}
                    </h2>
                    <FormItem
                        {...mainInput}
                        label=''
                    />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {formItems.map(
                        (item, index) =>
                            index !== 0 && (
                                <FormItem
                                    key={index}
                                    {...item}
                                />
                            )
                    )}
                </div>
                <Form.Item>
                    <Button
                        className="w-full bg-meetmaps text-white text-lg "
                        htmltype="submit"
                    >
                        {submitText}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
