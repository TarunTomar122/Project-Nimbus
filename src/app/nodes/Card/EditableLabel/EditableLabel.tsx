import './styles.css';

import { useEffect, useState } from 'react';

interface EditableLabelProps {
    id?: string;
    value: string;
    spanClassName?: string;
    inputClassName?: string;
    onComplete?: (value: string) => void;
}

export default function EditableLabel({ value, onComplete, ...props }: EditableLabelProps) {
    const [editing, setEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);

    const handleComplete = () => {
        setEditing(false);
        if (localValue !== value) {
            onComplete?.(localValue);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleComplete();
        }
    };

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    return editing ? (
        <input
            id="input"
            value={localValue}
            className="nodrag"
            onChange={(e) => setLocalValue(e.target.value)}
            onBlur={handleComplete}
            onKeyDown={handleKeyDown}
            autoFocus
            {...props}
        />
    ) : (
        <span onClick={() => setEditing(true)} className={props.spanClassName}>
            {localValue}
        </span>
    );
}