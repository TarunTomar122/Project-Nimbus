import { create } from 'zustand';

import { Node, Edge } from '@xyflow/react';

interface Page {
    name: string;
    svg: string;
}

interface GlobalState {
    globalNodes: Node[];
    globalEdges: Edge[];
    pages: Page[];
    setGlobalNodes: (nodes: Node[]) => void;
    setGlobalEdges: (edges: Edge[]) => void;
    setPages: (pages: Page[]) => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
    globalNodes: [
        {
            id: '1',
            type: 'card',
            position: { x: 0, y: 0 },
            data: {
                name: 'Profile',
                attributes: [
                    {
                        label: 'email',
                        id: '1'
                    },
                    {
                        label: 'password',
                        id: '2'
                    },
                ],
                actions: [
                    {
                        label: 'logout',
                        id: '3'
                    },
                    {
                        label: 'updateProfile',
                        id: '4'
                    },
                ]
            }
        },
        {
            id: '2',
            type: 'card',
            position: { x: -500, y: -300 },
            data: { 
                name: 'User',
                attributes: [
                    {
                        label: 'userId',
                        id: '12143'
                    },
                    {
                        label: 'profile',
                        id: '3sdfgsdf'
                    },
                    {
                        label: 'todos',
                        id: '3sdfdsafadsgsdf'
                    }
                ], 
                actions: [
                    {
                        label: 'updateProfile',
                        id: '3123123'
                    },
                    {
                        label: 'logout',
                        id: '4123123'
                    }
                ],
            }
        },
        {
            id: '3',
            type: 'card',
            position: { x: 500, y: -300 },
            data: {
                name: 'Todo',
                attributes: [
                    {
                        label: 'content',
                        id: 'dfaasdfaf'
                    },
                    {
                        label: 'due date',
                        id: 'dfaasdsadfadsffaf'
                    }
                ],
                actions: [
                    {
                        label: 'add',
                        id: 'asdfasf'
                    },
                    {
                        label: 'delete',
                        id: 'asasfafdfasf'
                    }
                ]
            }
        }
    ],
    globalEdges: [
        {
            id: '1',
            source: '2',
            sourceHandle: '3sdfgsdf',
            target: '1',
            type: 'smoothstep'
        },
        {
            id: '2',
            source: '2',
            sourceHandle: '3sdfdsafadsgsdf',
            target: '3',
            type: 'smoothstep'
        }
    ],
    pages: [],
    setGlobalNodes: (nodes: Node[]) => set({ globalNodes: nodes }),
    setGlobalEdges: (edges: Edge[]) => set({ globalEdges: edges }),
    setPages: (pages: Page[]) => set({ pages }),
}));
