import { Node, Edge } from '@xyflow/react';

export const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const convertToJson = (nodes: Node[], edges: Edge[]) => {
    console.log("nodes", nodes);
    console.log("edges", edges);
};
