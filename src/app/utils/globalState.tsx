import { create } from 'zustand';

import { Node, Edge } from '@xyflow/react';

interface Page {
    name: string;
    html: string;
}

interface GlobalState {
    globalNodes: Node[];
    globalEdges: Edge[];
    pages: Page[];
    prompt: string;
    updateNodeData: (nodeId: string, data: any) => void;
    setGlobalNodes: (nodes: Node[]) => void;
    setGlobalEdges: (edges: Edge[]) => void;
    setPages: (pages: Page[]) => void;
    setPrompt: (prompt: string) => void;
    saveToLocalStorage: () => void;
    loadFromLocalStorage: () => void;
    clearLocalStorage: () => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
    // globalNodes: [
    //     {
    //         id: '1',
    //         type: 'card',
    //         position: { x: 0, y: 0 },
    //         data: {
    //             name: 'Profile',
    //             attributes: [
    //                 {
    //                     label: 'email',
    //                     id: '1'
    //                 },
    //                 {
    //                     label: 'password',
    //                     id: '2'
    //                 },
    //             ],
    //             actions: [
    //                 {
    //                     label: 'logout',
    //                     id: '3'
    //                 },
    //                 {
    //                     label: 'updateProfile',
    //                     id: '4'
    //                 },
    //             ]
    //         }
    //     },
    //     {
    //         id: '2',
    //         type: 'card',
    //         position: { x: -500, y: -300 },
    //         data: { 
    //             name: 'User',
    //             attributes: [
    //                 {
    //                     label: 'userId',
    //                     id: '12143'
    //                 },
    //                 {
    //                     label: 'profile',
    //                     id: '3sdfgsdf'
    //                 },
    //                 {
    //                     label: 'todos',
    //                     id: '3sdfdsafadsgsdf'
    //                 }
    //             ], 
    //             actions: [
    //                 {
    //                     label: 'updateProfile',
    //                     id: '3123123'
    //                 },
    //                 {
    //                     label: 'logout',
    //                     id: '4123123'
    //                 }
    //             ],
    //         }
    //     },
    //     {
    //         id: '3',
    //         type: 'card',
    //         position: { x: 500, y: -300 },
    //         data: {
    //             name: 'Todo',
    //             attributes: [
    //                 {
    //                     label: 'content',
    //                     id: 'dfaasdfaf'
    //                 },
    //                 {
    //                     label: 'due date',
    //                     id: 'dfaasdsadfadsffaf'
    //                 }
    //             ],
    //             actions: [
    //                 {
    //                     label: 'add',
    //                     id: 'asdfasf'
    //                 },
    //                 {
    //                     label: 'delete',
    //                     id: 'asasfafdfasf'
    //                 }
    //             ]
    //         }
    //     }
    // ],
    globalNodes: [
        // {
        //     id: '1',
        //     type: 'contentViewer',
        //     position: { x: 0, y: 0 },
        //     data: {
        //         pageIndex: 0,
        //     }
        // }
    ],
    globalEdges: [],
    pages: [],
    prompt: '',
    // globalEdges: [
    //     {
    //         id: '1',
    //         source: '2',
    //         sourceHandle: '3sdfgsdf',
    //         target: '1',
    //         type: 'smoothstep'
    //     },
    //     {
    //         id: '2',
    //         source: '2',
    //         sourceHandle: '3sdfdsafadsgsdf',
    //         target: '3',
    //         type: 'smoothstep'
    //     }
    // ],
//     pages: [
//         {
//             name: 'landing-page',
//             html: `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Product Detail</title>
//     <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
// </head>
// <body class="bg-gray-100 h-screen">

//     <header class="bg-blue-500 text-white p-4">
//         <div class="container mx-auto flex justify-between items-center">
//             <h1 class="text-xl font-bold">Product Detail</h1>
//             <nav>
//                 <a href="#" class="hover:text-gray-200">Home</a>
//                 <a href="#" class="ml-4 hover:text-gray-200">Cart</a>
//                 <a href="#" class="ml-4 hover:text-gray-200">Logout</a>
//             </nav>
//         </div>
//     </header>

//     <main class="container mx-auto mt-8">
//         <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//             <h2 class="text-2xl font-bold mb-6">Product Information</h2>

//             <div class="mb-4">
//                 <label class="block text-gray-700 text-sm font-bold mb-2" for="label">
//                     Label
//                 </label>
//                 <p>Product Name</p>
//             </div>

//             <div class="mb-4">
//                 <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
//                     Price
//                 </label>
//                 <p>$50</p>
//             </div>

//             <div class="flex justify-between">
//                 <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
//                     Wishlist
//                 </button>
//                 <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
//                     Buy Now
//                 </button>
//             </div>
//         </div>
//     </main>

//     <footer class="bg-gray-200 text-center p-4">
//         <p>&copy; 2023 Product Detail. All rights reserved.</p>
//     </footer>

// </body>
// </html>`
//         }
//     ],
//     prompt: 'Ignore all other instructions and only generate the HTML for one landing page about cats food product',
    setPrompt: (prompt: string) => set({ prompt }),
    setGlobalNodes: (nodes: Node[]) => set({ globalNodes: nodes }),
    setGlobalEdges: (edges: Edge[]) => set({ globalEdges: edges }),
    setPages: (pages: Page[]) => set({ pages }),
    updateNodeData: (nodeId: string, data: any) => set((state) => {
        const updatedNodes = state.globalNodes.map(node => node.id === nodeId ? { ...node, data } : node);
        return { globalNodes: updatedNodes };
    }),
    saveToLocalStorage: () => {
        const state = useGlobalState.getState();
        localStorage.setItem('ooux-nodes', JSON.stringify(state.globalNodes));
        localStorage.setItem('ooux-edges', JSON.stringify(state.globalEdges));
    },
    loadFromLocalStorage: () => {
        const savedNodes = localStorage.getItem('ooux-nodes');
        const savedEdges = localStorage.getItem('ooux-edges');
        if (savedNodes) {
            set({ globalNodes: JSON.parse(savedNodes) });
        }
        if (savedEdges) {
            set({ globalEdges: JSON.parse(savedEdges) });
        }
    },
    clearLocalStorage: () => {
        localStorage.removeItem('ooux-nodes');
        localStorage.removeItem('ooux-edges');
        set({ globalNodes: [], globalEdges: [] });
    }
}));
