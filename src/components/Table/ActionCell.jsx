import { Popover, Typography } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Button from "../UI/Button";
import { useState } from "react";

export default function ActionCell({
    record,
    editingRow,
    savePopOpen,
    setSavePopOpen,
    editRow,
    cancelEditRow,
    saveEditRow,
}) {
    const [visibleCancel, setVisibleCancel] = useState(false);
    return (
        <Popover
            placement="left"
            triger="click"
            open={editingRow === record.key && savePopOpen}
            content={
                <div className="flex flex-col gap-1">
                    <div>
                        <Button
                            style="main"
                            onClick={() => saveEditRow(record.key)}
                        >
                            Guardar
                        </Button>
                    </div>
                    <div>
                        <Popover
                            open={visibleCancel}
                            placement="left"
                            content={
                                <>
                                    <p>Seguro que quieres cancelar?</p>
                                    <div className="mt-2 grid grid-cols-2 gap-1">
                                        <Button
                                            onClick={() => {
                                                cancelEditRow();
                                                setSavePopOpen(false);
                                            }}
                                            style="bordered"
                                        >
                                            si
                                        </Button>
                                        <Button
                                            style="danger"
                                            title="Sure to cancel?"
                                            onClick={() => {
                                                setVisibleCancel(false);
                                                setSavePopOpen(false);
                                            }}
                                        >
                                            no
                                        </Button>
                                    </div>
                                </>
                            }
                        >
                            <Button
                                style="danger"
                                onClick={() => setVisibleCancel(true)}
                            >
                                Cancelar
                            </Button>
                        </Popover>
                    </div>
                </div>
            }
        >
            <Typography.Link
                disabled={editingRow !== "" && editingRow !== record.key}
                className="text-[1.5rem]"
                onClick={() => {
                    if (editingRow !== record.key) {
                        editRow(record);
                        return;
                    }
                    setSavePopOpen(!savePopOpen);
                }}
            >
                <MoreOutlined />
            </Typography.Link>
        </Popover>
    );
}
