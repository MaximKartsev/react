import * as React from "react"

type NoteLengthValidatorProps = {
    text: string
    isValid: boolean|undefined
}

export const NoteValidationMessage: React.FC<NoteLengthValidatorProps> = ({text, isValid}) => {
    return isValid ? null : (
        <>
            {text}
        </>
    );

}