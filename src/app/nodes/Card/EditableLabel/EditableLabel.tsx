import './styles.css';

import { useEffect, useState } from 'react';

interface EditableLabelProps {
    id?: string;
    value: string;
    spanClassName?: string;
    inputClassName?: string;
    onChange?: (value: string) => void;
}

export default function EditableLabel(props: EditableLabelProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(props.value);


    const handleFocus = () => {
        setIsEditing(true);
    }

    const handleBlur = () => {
        setIsEditing(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        if (props.onChange) {
            props.onChange(e.target.value);
        }
    }

    useEffect(() => {
        setText(props.value);
    }, [props.value]);

    return (
        <div className='editable-label'>
            {isEditing ? (
                <input
                    id="input"
                    value={text}
                    className="nodrag"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            ) : (
                <span onClick={handleFocus} className={props.spanClassName}>{text}</span>
            )}
        </div>
    )
}