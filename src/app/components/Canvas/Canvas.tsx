import './styles.css';

import { useState } from 'react';
import {
    ReactFlow,
    addEdge,
    Background,
    Edge,
    Connection,
    Controls,
    BackgroundVariant,
    MiniMap,
    NodeChange,
    EdgeChange,
    MarkerType,
    Node,
    NodeTypes,
    ConnectionMode,
    applyNodeChanges,
    applyEdgeChanges
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import Card from '../../nodes/Card/Card';
import { useGlobalState } from '../../utils/globalState';

interface GlobalState {
    nodes: any[];
    setNodes: (nodes: any[]) => void;
}

const nodeTypes: NodeTypes = {
    card: Card as any,
};

const DEFAULT_EDGE_STYLE = {
    type: 'smoothstep',
    stroke: '#2196F3',
    strokeWidth: 2,
    opacity: 0.8,
};

const SELECTED_EDGE_STYLE = {
    ...DEFAULT_EDGE_STYLE,
    stroke: '#FF4081',
    strokeWidth: 3,
    opacity: 1,
    animated: true,
    strokeDasharray: '5 5',
    strokeDashoffset: 0,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeMiterlimit: 10,
    targetMarkerEnd: {
        type: MarkerType.Arrow,
        width: 20,
        height: 20,
        color: '#FF4081'
    }
};

function Flow() {

    const { nodes, setNodes } = useGlobalState();

    const [edges, setEdges] = useState<Edge[]>([]);

    const onEdgesChange = (changes: EdgeChange[]) => {
        setEdges((eds) => {
            // Apply the changes to get the new edges
            const newEdges = applyEdgeChanges(changes, eds);
            
            // Update the styles based on selection
            return newEdges.map(edge => ({
                ...edge,
                style: edge.selected ? SELECTED_EDGE_STYLE : DEFAULT_EDGE_STYLE
            }));
        });
    };

    const onNodesChange = (changes: NodeChange[]) => {
        setNodes(applyNodeChanges(changes, nodes));
    };

    const onConnect = (params: any) => setEdges((eds) => {
        // do not add edge if the source and target are the same
        if (params.source === params.target) {
            return eds;
        }

        const newEdge = {
            ...params,
            style: DEFAULT_EDGE_STYLE
        };
        
        const newEdges = addEdge(newEdge, eds);
        return newEdges;
    });

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            connectionMode={ConnectionMode.Strict}
            snapToGrid={true}
            minZoom={0.2}
            maxZoom={4}
            fitView
            nodeTypes={nodeTypes}
            attributionPosition="top-right"
            deleteKeyCode={['Backspace', 'Delete']}
            defaultEdgeOptions={DEFAULT_EDGE_STYLE}
            connectionRadius={50}
            snapGrid={[15, 15]}
            connectOnClick={false}
        >
            <Background color="#ccc" size={1} variant={BackgroundVariant.Dots} />
            <Controls />
            <MiniMap 
                nodeColor={() => DEFAULT_EDGE_STYLE.stroke}
                maskColor="rgba(255, 255, 255, 0.8)"
            />
        </ReactFlow>
    );

}

export default Flow;