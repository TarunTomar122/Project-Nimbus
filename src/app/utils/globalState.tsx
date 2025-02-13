import { create } from 'zustand';

export const useGlobalState = create((set) => ({
    nodes: [
        {
            id: '1',
            type: 'card',
            position: { x: 0, y: 0 },
            data: {
                attributes: [
                    {
                        label: 'Attribute 1',
                        id: '1'
                    },
                    {
                        label: 'Attribute 2',
                        id: '2'
                    }
                ],
                actions: [
                    {
                        label: 'Action 1',
                        id: '3'
                    }
                ]
            }
        }
    ],
    setNodes: (nodes: Node[]) => set({ nodes }),
}));