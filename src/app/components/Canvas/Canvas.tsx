import './styles.css';

import { useCallback } from 'react';
import {
    ReactFlow,
    addEdge,
    Background,
    Edge,
    Controls,
    MiniMap,
    NodeChange,
    EdgeChange,
    MarkerType,
    NodeTypes,
    ConnectionMode,
    applyNodeChanges,
    applyEdgeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import Card from '../../nodes/Card/Card';
import ContentViewer from '../../nodes/ContentViewer/ContentViewer';
import { useGlobalState } from '../../utils/globalState';

const nodeTypes: NodeTypes = {
    card: Card as any,
    contentViewer: ContentViewer as any,
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

    const {globalNodes, globalEdges, setGlobalNodes, setGlobalEdges} = useGlobalState();

    const onEdgesChange = useCallback((changes: EdgeChange[]) => {
        console.log("onEdgesChange", changes, globalEdges);

        const newEdges = applyEdgeChanges(changes, globalEdges);

        newEdges.forEach((edge) => {
            if (edge.selected) {
                (edge as any).style = SELECTED_EDGE_STYLE;
            } else {
                (edge as any).style = DEFAULT_EDGE_STYLE;
            }
        });

        setGlobalEdges(newEdges);
        
    }, [globalEdges, setGlobalEdges]);

    const onNodesChange = (changes: NodeChange[]) => {
        setGlobalNodes(applyNodeChanges(changes, globalNodes));
    };

    const onConnect = useCallback((params: any) => {
        if (params.source === params.target) {
            return;
        }
        const newEdge: Edge = {
            ...params,
            style: DEFAULT_EDGE_STYLE
        };
        const newEdges = addEdge(newEdge, globalEdges);

        setGlobalEdges(newEdges);
    }, [globalEdges, setGlobalEdges]);

    return (
        <ReactFlow
            nodes={globalNodes}
            edges={globalEdges}
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
            <Background bgColor="#E9E9E9" color="#ccc" size={-1} />
            <Controls />
            <MiniMap 
                nodeColor={() => DEFAULT_EDGE_STYLE.stroke}
                maskColor="rgba(255, 255, 255, 0.8)"
            />
        </ReactFlow>
    );

}

export default Flow;