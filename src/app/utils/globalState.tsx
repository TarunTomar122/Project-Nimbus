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
//     <title>Adult Sex Toys - Landing Page</title>
//     <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
//     <style>
//         /* Custom styles */
//         .hero-section {
//             background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
//         }
//         .product-card {
//             transition: transform 0.3s ease-in-out;
//         }
//         .product-card:hover {
//             transform: scale(1.05);
//         }
//     </style>
// </head>
// <body class="bg-gray-100 font-sans">

//     <!-- Header -->
//     <header class="bg-white shadow-md py-4">
//         <div class="container mx-auto px-4 flex items-center justify-between">
//             <a href="#" class="text-2xl font-bold text-indigo-600">Pleasure Palace</a>
//             <nav>
//                 <ul class="flex space-x-6">
//                     <li><a href="#" class="hover:text-indigo-500">Shop</a></li>
//                     <li><a href="#" class="hover:text-indigo-500">About</a></li>
//                     <li><a href="#" class="hover:text-indigo-500">Contact</a></li>
//                     <li><a href="#" class="hover:text-indigo-500">Blog</a></li>
//                 </ul>
//             </nav>
//             <div>
//                 <a href="#" class="text-gray-600 hover:text-indigo-500 mr-4">Login</a>
//                 <a href="#" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Sign Up</a>
//             </div>
//         </div>
//     </header>

//     <!-- Hero Section -->
//     <section class="hero-section py-20">
//         <div class="container mx-auto px-4 text-center">
//             <h1 class="text-5xl font-bold text-indigo-800 mb-6">Explore Your Sensuality</h1>
//             <p class="text-xl text-gray-700 mb-8">Discover a world of pleasure and intimacy with our curated collection of adult toys.</p>
//             <a href="#" class="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg hover:bg-indigo-700">Shop Now</a>
//         </div>
//     </section>

//     <!-- Featured Products -->
//     <section class="py-12">
//         <div class="container mx-auto px-4">
//             <h2 class="text-3xl font-semibold text-gray-800 mb-8 text-center">Featured Products</h2>
//             <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

//                 <!-- Product 1 -->
//                 <div class="product-card bg-white rounded-lg shadow-md p-4 hover:shadow-lg">
//                     <img src="https://cataas.com/cat" alt="Product 1" class="w-full h-48 object-cover rounded-md mb-4">
//                     <h3 class="text-xl font-semibold text-gray-800 mb-2">Vibrating Massager</h3>
//                     <p class="text-gray-600 mb-4">Experience intense pleasure with our top-rated vibrating massager.</p>
//                     <div class="flex items-center justify-between">
//                         <span class="text-lg font-bold text-indigo-600">$49.99</span>
//                         <a href="#" class="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Add to Cart</a>
//                     </div>
//                 </div>

//                 <!-- Product 2 -->
//                 <div class="product-card bg-white rounded-lg shadow-md p-4 hover:shadow-lg">
//                     <img src="https://cataas.com/cat" alt="Product 2" class="w-full h-48 object-cover rounded-md mb-4">
//                     <h3 class="text-xl font-semibold text-gray-800 mb-2">Couples' Pleasure Set</h3>
//                     <p class="text-gray-600 mb-4">Enhance intimacy and explore new sensations with our couples' set.</p>
//                     <div class="flex items-center justify-between">
//                         <span class="text-lg font-bold text-indigo-600">$79.99</span>
//                         <a href="#" class="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Add to Cart</a>
//                     </div>
//                 </div>

//                 <!-- Product 3 -->
//                 <div class="product-card bg-white rounded-lg shadow-md p-4 hover:shadow-lg">
//                     <img src="https://cataas.com/cat" alt="Product 3" class="w-full h-48 object-cover rounded-md mb-4">
//                     <h3 class="text-xl font-semibold text-gray-800 mb-2">Anal Beads Set</h3>
//                     <p class="text-gray-600 mb-4">Discover new levels of stimulation with our premium anal beads set.</p>
//                     <div class="flex items-center justify-between">
//                         <span class="text-lg font-bold text-indigo-600">$39.99</span>
//                         <a href="#" class="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Add to Cart</a>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     </section>

//     <!-- Call to Action -->
//     <section class="bg-indigo-100 py-12">
//         <div class="container mx-auto px-4 text-center">
//             <h2 class="text-3xl font-semibold text-indigo-800 mb-4">Ready to Explore?</h2>
//             <p class="text-lg text-gray-700 mb-6">Sign up today and receive exclusive offers and discounts.</p>
//             <a href="#" class="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg hover:bg-indigo-700">Sign Up Now</a>
//         </div>
//     </section>

//     <!-- Footer -->
//     <footer class="bg-gray-200 py-6">
//         <div class="container mx-auto px-4 text-center">
//             <p class="text-gray-600">&copy; 2024 Pleasure Palace. All rights reserved.</p>
//         </div>
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
}));
