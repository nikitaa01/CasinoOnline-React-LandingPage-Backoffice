import { useEffect, useState } from "react"
import Table from "../components/Table"

export default function Backoffice() {
    const [columns, setColumns] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(res => {
                const columns = Object.keys(res[0]).map(key => ({ key }))
                const emailIndex = columns.findIndex(item => item.key === 'email');
                const email = columns.splice(emailIndex, 1);
                columns.splice(0, 0, ...email);
                setColumns(columns)
                const data = res.map((item, index) => ({ ...item, key: index }))
                setData(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <>
            {columns.length > 0 && data.length > 0 && <Table columns={columns} originData={data} setOriginData={setData} />}
        </>
    )
}