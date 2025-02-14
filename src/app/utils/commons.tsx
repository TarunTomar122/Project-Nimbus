import { Node, Edge } from '@xyflow/react';

export const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const convertToJson = (nodes: Node[], edges: Edge[]) => {
    console.log("nodes", nodes);
    console.log("edges", edges);
};

// Find the rightmost position of all nodes
const findRightmostPosition = (nodes: Node[]): number => {
    if (nodes.length === 0) return 0;
    let nodeWidth = 300; // Standard node width
    return Math.max(...nodes.map(node => {
        if(node.type === 'contentViewer') {
            nodeWidth = 400;
        }
        return node.position.x + nodeWidth;
    }));
};

// Find position for new node
export const findBestPosition = (nodes: Node[]): { x: number, y: number } => {
    const padding = 100; // Increased space between nodes for better readability
    const rightmostX = findRightmostPosition(nodes);

    if(nodes.length === 0) {
        return { x: 0, y: 0 };
    }

    // get the y position of the last node
    const lastNode = nodes[nodes.length - 1];
    const lastNodeY = lastNode.position.y;
    
    return {
        x: rightmostX + padding,
        y: lastNodeY
    };
};
