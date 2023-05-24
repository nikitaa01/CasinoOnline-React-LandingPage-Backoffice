import Highlighter from "react-highlight-words"

export default function NameCell({text, searchText}) {
    return (
        searchText.length !== 0 ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[
                        searchText ? searchText[0] : "",
                    ]}
                    autoEscape
                    textToHighlight={
                        text ? text.toString() : ""
                    }
                />
            ) : (
                text
            )
    )
}