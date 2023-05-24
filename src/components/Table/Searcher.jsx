import { AutoComplete, Button } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { useState, useEffect } from "react"

export default function Searcher({
    setSearchText,
    data,
    cancelEdit,
}) {
    const [inputText, setInputText] = useState("")

    useEffect(() => {
        const searchDelay = setTimeout(() => {
            if (inputText.length > 0) {
                setSearchText(inputText ? [inputText] : [])
            } else {
                setSearchText([])
            }
        }, 500)
        return () => clearTimeout(searchDelay)
    }, [inputText])

    return (
        <>
            {inputText.length > 0 && (
                <Button
                    className="w-44 h-auto"
                    onClick={() => {
                        setSearchText([])
                        setInputText("")
                    }}
                    danger
                    ghost
                    size="large"
                >
                    Limpiar
                </Button>
            )}
            <AutoComplete
                className="w-44 h-auto"
                options={[...new Set(data.map((item) => item.email))].map(
                    (item) => ({ value: item })
                )}
                filterOption={(inputValue, option) =>
                    option.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                }
                value={inputText}
                backfill={true}
                onSelect={(e) => setInputText(e ?? '')}
            >
                <label className="flex items-center rounded-md p-2 border w-auto focus-within:border-meetmaps">
                    <SearchOutlined className="align-middle" />
                    <input
                        className="pl-2 outline-none border-none flex-1 ml-1 w-full text-base bg-transparent"
                        onFocus={() => cancelEdit()}
                        placeholder="Buscar..."
                        value={inputText}
                        onChange={(e) =>
                            setInputText(e.target.value ?? "")
                        }
                    />
                </label>
            </AutoComplete>
        </>
    )
}
