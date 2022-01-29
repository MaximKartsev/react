import * as React from "react"
import {useEffect, useState} from "react";

type NoteLengthValidatorProps = {
    value: string
    callback: (valid: boolean) => void
}

export const NoteContentLengthValidator: React.FC<NoteLengthValidatorProps> = ({value, callback}) => {
    const MAX_LENGTH = 1000

    const [valid, setValid] = useState<boolean>(false)

    useEffect(() => {
        const isValid = value.length > 0 && value.length <= MAX_LENGTH;
        setValid(isValid)
        callback(isValid)
    }, [value])

    return value.length === 0 ? null : (
        <>
            {!valid && (
                <>
                    <p>maximum content length is {MAX_LENGTH} characters</p>
                    <p>maximum length exceeded by {value.length - MAX_LENGTH} characters</p>
                </>
            )}
        </>
    );

}