import { Handle, Position } from '@xyflow/react';

import './styles.css';

import EditableLabel from './EditableLabel/EditableLabel';
import Section from './Section/Section';

// Define handle styles
const HANDLE_STYLES = {
    background: '#2196F3',
    width: 12,
    height: 12,
    border: '2px solid #fff',
};

// Generic handle position configuration
export interface HandleConfig {
    id: string;
    position: Position;
    top: number;
}

export interface NodeConfig {
    sources: HandleConfig[];
    targets: HandleConfig[];
}

export interface CardData {
    name: string;
    description?: string;
    type: string;
    attributes: Array<{
        label: string;
        id: string;
    }>;
    actions: Array<{
        label: string;
        id: string;
    }>;
    height?: number;
    width?: number;
    handleConfig?: NodeConfig;
    [key: string]: unknown; // Add index signature for Record<string, unknown>
}

export interface CardProps {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: CardData;
    selected?: boolean;
    dragging?: boolean;
    zIndex?: number;
}

export default function Card(props: CardProps) {
    const defaultHandleConfig: NodeConfig = {
        sources: [
            { id: 'default-source', position: Position.Right, top: 40 }
        ],
        targets: [
            { id: 'default-target', position: Position.Left, top: 40 }
        ]
    };
    const handleConfig = props.data.handleConfig || defaultHandleConfig;

    return (
         <div className='card'>
            {/* Add source handles */}
            {handleConfig.sources.map((handle: HandleConfig) => (
                <Handle
                    key={`source-${handle.id}`}
                    type="source"
                    position={handle.position}
                    id={`source-${handle.id}`}
                    style={{ ...HANDLE_STYLES, top: handle.top}}
                />
            ))}

             {/* Add target handles */}
             {handleConfig.targets.map((handle: HandleConfig) => (
                <Handle
                    key={`target-${handle.id}`}
                    type="target"
                    position={handle.position}
                    id={`target-${handle.id}`}
                    style={{ ...HANDLE_STYLES, top: handle.top }}
                />
            ))}

            <div className='card-header'>
                <EditableLabel 
                    value={props.data.name}
                    spanClassName='header-title' 
                    inputClassName='header-input' 
                />
            </div>

            {/* Attributes */}
            <Section
                label="Attributes"
                key={JSON.stringify(props.data.attributes)}
                rows={props.data.attributes}
                id={props.id}
            />

            {/* Actions */}
            <Section
                label="Actions"
                key={JSON.stringify(props.data.actions)}
                rows={props.data.actions}
                id={props.id}
            />
         </div>
    )
}