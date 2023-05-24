import { Popover } from "antd"

export default function PopoverCell({text}) {
    return (
        <Popover
            content={<div className="max-w-[30vw] text-[1.1rem]">{text}</div>}
        >
            <div className={`h-full w-full`}>{text}</div>
        </Popover>
    )
}