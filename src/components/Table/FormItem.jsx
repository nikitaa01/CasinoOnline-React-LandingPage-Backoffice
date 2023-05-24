import { Form, Input } from "antd"

const validateValueInArray = (array, arrayName) => (_, value) => {
    return new Promise((resolve, reject) => {
        if (array.includes(value)) {
            reject(`\"${value}\" ya exsiste en ${arrayName}`)
        } else {
            resolve()
        }
    })
}

export default function FormItem({
    input = false,
    label,
    name,
    required = true,
    unique = false,
    uniqueCompareArr = [],
    uniqueCompareArrName,
}) {
    const rulesToCompare = [
        { required: required, message: `\"${name}\" es obligatiorio!` },
    ]

    const InputType = input ? Input : Input.TextArea

    if (unique) {
        rulesToCompare.push({
            validator: validateValueInArray(
                uniqueCompareArr,
                uniqueCompareArrName
            ),
        })
    }
    return (
        <Form.Item label={label} name={name} rules={rulesToCompare}>
            <InputType size="large" name={name} autoComplete="off" />
        </Form.Item>
    )
}
