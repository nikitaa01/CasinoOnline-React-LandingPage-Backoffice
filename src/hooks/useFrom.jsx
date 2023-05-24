import { useEffect, useRef, useState } from "react";

export default function useForm(...formItemsOptions) {
    const formRef = useRef();
    const [errors, setErrors] = useState([
        {
            name: "all",
            validated: "initial error",
        },
    ]);
    const [hasErrors, setHasErrors] = useState(false);
    const [fields, setFields] = useState(formItemsOptions);

    useEffect(() => {
        setHasErrors(errors.some((error) => error.validated !== true));
    }, [errors]);

    const validate = () => {
        setErrors([]);
        for (const field of fields) {
            const item = formRef.current.elements[field.name];
            if (!field) continue;
            const validated = field.validate(item.value);
            if (validated !== true) {
                setErrors((prev) => [
                    ...prev,
                    { name: field.name, validated },
                ]);
            }
        }
        return errors;
    };

    const validateField = (name) => {
        const field = fields.find((field) => field.name === name);
        if (!field) return;
        const item = formRef.current.elements[name];
        const validated = field.validate(item.value);
        if (validated !== true) {
            setErrors((prev) => [
                ...prev,
                { name: field.name, validated },
            ]);
        }
        return validated;
    };

    return {
        formRef,
        fields,
        validate,
        validateField,
        errors,
        hasErrors,
    };
}
