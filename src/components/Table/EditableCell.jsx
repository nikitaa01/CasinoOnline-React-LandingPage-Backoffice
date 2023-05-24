import FormItem from "./FormItem"

export default function EditableCell({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    tableData,
    ...props
}) {
    return (
        <td {...props}>
            {editing ? (
                <FormItem
                    name={dataIndex}
                    required={true}
                    unique={dataIndex === "email"}
                    uniqueCompareArr={tableData.map(
                        (item) => item.email !== record.email && item.email
                    )}
                    uniqueCompareArrName="los emails"
                />
            ) : (
                children
            )}
        </td>
    )
}
