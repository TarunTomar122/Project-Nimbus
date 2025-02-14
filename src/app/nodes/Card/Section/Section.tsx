import './styles.css';

import { useState, useEffect } from 'react';
import EditableLabel from '../EditableLabel/EditableLabel';
import { Handle, Position } from '@xyflow/react';

import { useGlobalState } from '../../../utils/globalState';
import { generateId } from '../../../utils/commons';

import {CardProps} from '../Card';

export interface SectionRowProps {
    label: string;
    id: string;
}

export interface SectionProps {
    label: string;
    rows: SectionRowProps[];
    id: string;
}


export default function Section(props: SectionProps) {

    const { globalNodes, setGlobalNodes, updateNodeData } = useGlobalState();

    const [rows, setRows] = useState<SectionRowProps[]>(props.rows);

    useEffect(() => {
        setRows(props.rows);
    }, [props.rows]);

    const addRow = () => {
        const newRow = { label: `${props.label} ${rows.length + 1}`, id: generateId() };
        setRows([...rows, newRow]);
        setGlobalNodes(globalNodes.map((node: CardProps) => {
            if (node.id === props.id) {
                if(props.label === 'Attributes') {
                    return { ...node, data: { ...node.data, attributes: [...node.data.attributes, newRow] } };
                } else if(props.label === 'Actions') {
                    return { ...node, data: { ...node.data, actions: [...node.data.actions, newRow] } };
                }
            }
            return node;
        }));
    };

    const removeRow = (id: string) => {
        setRows(rows.filter((row) => row.id !== id));
        setGlobalNodes(globalNodes.map((node: CardProps) => {
            if (node.id === props.id) {
                return { ...node, data: { ...node.data, attributes: node.data.attributes.filter((row: SectionRowProps) => row.id !== id) } };
            }
            return node;
        }));
    };

    const updateRowData = (id: string, updatedName: string) => {
        setRows(rows.map((row) => row.id === id ? { ...row, label: updatedName } : row));
        setGlobalNodes(globalNodes.map((node: CardProps) => {
            if (node.id === props.id) {
                if(props.label === 'Attributes') {
                    return { ...node, data: { ...node.data, attributes: node.data.attributes.map((row: SectionRowProps) => row.id === id ? { ...row, label: updatedName } : row) } };
                } else if(props.label === 'Actions') {
                    return { ...node, data: { ...node.data, actions: node.data.actions.map((row: SectionRowProps) => row.id === id ? { ...row, label: updatedName } : row) } };
                }
            }
            return node;
        }));
    };

    return (
        <section className='content'>

        <div className='content-header'>
            <p className='section-title'>{props.label}</p>
            <div className="section-icon" onClick={(event) => {addRow(); event?.stopPropagation(); event?.preventDefault();}}>
                <svg className="h-6 w-6 text-stone-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            </div>
        </div>

        <section className='section-content'>

            {rows.map((row, index) => (
                     <div className='content-row' key={row.id}>
                        
                        <div className="section-icon" onClick={(event) => {removeRow(row.id); event?.stopPropagation(); event?.preventDefault();}}>
                            <svg className="h-6 w-6 text-stone-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </div>

            
                        <EditableLabel 
                            id={row.id} 
                            value={row.label} 
                            onComplete={(updatedName: string) => {
                                updateRowData(row.id, updatedName);
                            }}
                            spanClassName='checkbox-title' inputClassName='checkbox-input' />

                        <Handle
                            type="target"
                            position={Position.Left}
                            id={row.id}
                            className="left-connector"
                        />
                        <Handle
                            type="source"
                            position={Position.Right}
                            id={row.id}
                            className="right-connector"
                        />
                 </div>
            ))}
            

        </section>

    </section>
    )
}