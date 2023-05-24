import { Table, Form } from "antd"
import { useState } from "react"
import Searcher from "./Searcher"
import CreateNewElementForm from "./CreateNewElementForm"
import EditableCell from "./EditableCell"
import ActionCell from "./ActionCell"
import NameCell from "./NameCell"
import PopoverCell from "./PopoverCell"

export default function TableComponent({ columns, originData }) {
    const [currentPagination, setCurrentPagination] = useState(1)
    const [searchText, setSearchText] = useState([])
    const [editingRow, setEditingRow] = useState("")
    const [tableData, setTableData] = useState(originData || [])
    const [savePopOpen, setSavePopOpen] = useState(false)
    const [formTableData] = Form.useForm()

    const editRow = (record) => {
        const emptyRecord = {}
        for (const key of Object.keys(record)) {
            emptyRecord[key] = ""
        }
        formTableData.setFieldsValue({
            ...emptyRecord,
            key: record.key,
            ...record,
        })
        setEditingRow(record.key)
    }

    const cancelEditRow = () => {
        setEditingRow("")
    }

    const saveEditRow = async (key) => {
        const row = await formTableData.validateFields()
        const rowBefore = tableData.find((item) => item.key === key)
        const fieldsModified = Object.keys(row).filter((key) => {
            return rowBefore[key] !== row[key]
        })
        const fieldsToSave = {}
        for (const key of fieldsModified) {
            fieldsToSave[key] = row[key]
        }
        const newData = [...tableData]
        fetch(`/api/users/${rowBefore.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fieldsToSave)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (!res.error) {
                    const index = newData.findIndex((item) => key === item.key)
                    if (index > -1) {
                        const item = newData[index]
                        newData.splice(index, 1, {
                            ...item,
                            ...row,
                        })
                        setTableData(newData)
                        setEditingRow("")
                    } else {
                        newData.push(row)
                        setTableData(newData)
                        setEditingRow("")
                    }
                }
            })
    }

    const actionColumn = {
        title: "",
        key: "action",
        fixed: "right",
        className:
            "mx-auto h-full text-lg text-center whitespace-nowrap width-50",
        render: (_, record) => (
            <ActionCell
                record={record}
                editingRow={editingRow}
                savePopOpen={savePopOpen}
                setSavePopOpen={setSavePopOpen}
                editRow={editRow}
                cancelEditRow={cancelEditRow}
                saveEditRow={saveEditRow}
            />
        ),
    }

    const extendsColumnEmail = {
        fixed: "left",
        filteredValue: searchText ? searchText : null,
        onFilter: (value, record) =>
            record["email"]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        render: (text) => <NameCell text={text} searchText={searchText} />,
    }

    const extendsColumns = [...columns, actionColumn].map((col) => {
        if (col.key !== "action")
            col = {
                ...col,
                title: (
                    <span className="whitespace-nowrap">
                        {col.key}
                    </span>
                ),
                dataIndex: col.key,
                editable: true,
                className: `text-lg ${col.key !== "name" && "min-w-[15rem]"
                    } align-top`,
                render: (text) => <PopoverCell text={text} />,
                onCell: (record) => {
                    return {
                        record,
                        inputType: "text",
                        dataIndex: col.dataIndex,
                        title: col.title,
                        editing: record.key === editingRow,
                    }
                },
            }
        if (col.key === "email") {
            col = {
                ...col,
                ...extendsColumnEmail,
            }
        }
        return col
    })

    const createRowItems = extendsColumns.slice(0, -1).filter(item => !['id', 'created_at', 'updated_at', 'avatar_url', 'coin_balance'].includes(item.key)).map((item) => {
        return {
            label: (
                <div className="flex items-center gap-1">
                    {item.key === "email" && (
                        <span className="text-[#ff4d4f] font-[SimSun,sans-serif] leading-none text-[14px]">
                            *
                        </span>
                    )}
                    <span>{item.key}</span>
                </div>
            ),
            name: item.key,
            unique: item.key === "email",
            input: item.key === "email",
            uniqueCompareArr:
                item.key === "email" ? tableData.map((item) => item.email) : [],
            uniqueCompareArrName: "en algun usuario",
        }
    })
    createRowItems.push({
        label: "Contraseña",
        name: "password",
    })

    const handleNewRow = (newRowForm) => {
        fetch("/api/auth/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRowForm)
        })
            .then(res => res.json())
            .then(res => {
                if (!res.error) {
                    res.key = res.id
                    setTableData([...tableData, res])
                    setCurrentPagination(Math.trunc(tableData.length / 50) + 1)
                }
            })
    }

    return (
        <div className="max-w-full">
            <div className="p-2 flex row gap-2 justify-end w-full flex-wrap [&>*]:h-[40px] mb-8">
                <Searcher
                    searchText={searchText}
                    setSearchText={setSearchText}
                    data={tableData}
                    cancelEdit={cancelEditRow}
                />
                <CreateNewElementForm
                    formItems={createRowItems}
                    onFinish={handleNewRow}
                    buttonText={"Crear nueva entrada"}
                />
            </div>
            <Form form={formTableData} component={false}>
                <Table
                    bordered
                    components={{
                        body: {
                            cell: (props) =>
                                EditableCell({ ...props, tableData }),
                        },
                    }}
                    pagination={{
                        showSizeChanger: false,
                        pageSize: 50,
                        current: currentPagination,
                        onChange: (page) => {
                            setCurrentPagination(page)
                            setEditingRow("")
                        },
                        position: ["bottomCenter"],
                    }}
                    columns={extendsColumns}
                    dataSource={tableData}
                    scroll={{ x: true, y: 600 }}
                    tableClassName="w-full h-auto"
                />
            </Form>
        </div>
    )
}
