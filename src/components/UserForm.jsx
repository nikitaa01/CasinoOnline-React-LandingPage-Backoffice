import Box from "./UI/Box"
import Button from "./UI/Button"
import { useLangContext } from "../contexts/LangContext"
import ErrorViewFormItem from "./login/ErrorViewFormItem"
import FileInput from "./UI/FileInput"

export default function UserForm({ form, handleSubmit, submitText, defaultPhoto, children }) {
    const { langValues } = useLangContext()
    return (
        <form
            className="flex flex-col gap-6"
            ref={form.formRef}
            onChange={form.validate}
            onSubmit={handleSubmit}
        >
            <div>
                <label htmlFor='avatar'>{langValues.login.avatar_label}</label>
                <FileInput name='avatar' defaultValue={defaultPhoto} />
            </div>
            {form.fields.map((field, i) => (
                <ErrorViewFormItem
                    key={i}
                    field={field}
                    validateField={form.validateField}
                />
            ))}
            {children}
            <Button
                type="submit"
                disabled={form.hasErrors}
            >
                {submitText}
            </Button>
        </form>
    )
}