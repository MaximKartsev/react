import * as React from "react"
import {useEffect, useState} from "react";

type NoteLengthValidatorProps = {
    value: string
    fieldName: string
    maxLength: number
    callback: (valid: boolean) => void
}

export const NoteLengthValidator: React.FC<NoteLengthValidatorProps> = ({value, callback, fieldName, maxLength}) => {
    const [valid, setValid] = useState<boolean>(false)

    useEffect(() => {
        const isValid = value.length > 0 && value.length <= maxLength;
        setValid(isValid)
        callback(isValid)
    }, [value])

    return value.length === 0 ? null : (
        <>
            {!valid && (
                <>
                    <p>maximum {fieldName} length is {maxLength} characters</p>
                    <p>maximum length exceeded by {value.length - maxLength} characters</p>
                </>
            )}
        </>
    );

}