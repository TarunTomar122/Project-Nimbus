import { GoogleGenerativeAI } from '@google/generative-ai';
import { useGlobalState } from './globalState';
import { Node, Edge } from '@xyflow/react';
import { generateId, findBestPosition } from './commons';

interface Page {
    name: string;
    svg: string;
}

const generatePrompt = (nodes: Node[], edges: Edge[], prompt: string) => `
  
  You are an expert in creating UX pages using html,css, tailwind, and javascript.
  You will be provided with a two JSON files (Nodes - the objects and Edges - the relationships between the objects) structured using the Object-Oriented UX (OOUX) methodology. 
  Your task is to analyze the objects, their attributes, actions, and relationships, then generate a complete 
  set of UI screens needed for the described application.
   Please make sure to create a separate UI screens for all the screens that might be needed based on your understanding of the app from the json file. 
   A single file should contain the entire UI for a single page and it should be a single html file. 
   please fill in details and imgs if required with the placeholder values from somewhere. 
   You can use the following for images - 
  cataas API - https://cataas.com/cat
  no commentary.
  Gimme the html files of those webpages as an array. You have to return a single json file which will contain an array of all the pages 
  and the html for all those pages. the json that you return should be in the following format - { pages: [{ name, html }] } thank you

  Also the user who made this mapping has written the following prompt for your understanding - 
  ${prompt}
  and
  here's your ooux mapping tool based jsons - 
  Nodes:
  ${JSON.stringify(nodes)}
    Edges:
  ${JSON.stringify(edges)}
`;

export const loadModel = async () => {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
    return model;
};

export const generateCode = async (nodes: Node[], edges: Edge[]) => {
    const model = await loadModel();
    if (!model) return;

    const { setPages, globalNodes, setGlobalNodes, prompt } = useGlobalState.getState();

    // Create initial loading node
    const initialPosition = findBestPosition(globalNodes);
    const loadingNodeId = generateId();
    const loadingNode = {
        id: loadingNodeId,
        type: 'contentViewer',
        position: initialPosition,
        data: { pageIndex: 0, isLoading: true }
    };

    // Add the loading node to the canvas
    setGlobalNodes([...globalNodes, loadingNode]);

    try {
        console.log('loaded the model');
        const finalPrompt = generatePrompt(nodes, edges, prompt);

        console.log('finalPrompt', finalPrompt);

        const result = await model.generateContent(finalPrompt);

        const json = result.response.text().replace(/```json|```/g, '');
        console.log('json', json);

        // parse the json
        const jsonObject = JSON.parse(json) as { pages: Page[] };
        console.log('jsonObject', jsonObject);

        // Store pages in global state
        setPages(jsonObject.pages);

        // Create ContentViewer nodes sequentially to properly calculate positions
        const contentViewerNodes: Node[] = [];
        jsonObject.pages.forEach((page: Page, index: number) => {
            // Calculate position based on all existing nodes and previously created content viewers
            const allNodesForPosition = [...globalNodes, ...contentViewerNodes];
            const position = findBestPosition(allNodesForPosition);
            
            contentViewerNodes.push({
                id: index === 0 ? loadingNodeId : generateId(), // Reuse the loading node ID for first page
                type: 'contentViewer',
                position,
                data: { pageIndex: index, isLoading: false }
            });
        });

        // Update nodes, replacing the loading node and adding new nodes
        const nodesWithoutLoading = globalNodes.filter(node => node.id !== loadingNodeId);
        setGlobalNodes([...nodesWithoutLoading, ...contentViewerNodes]);

        return jsonObject.pages;
    } catch (error) {
        // If there's an error, update the loading node to show error state
        const updatedNodes = globalNodes.map(node => 
            node.id === loadingNodeId 
                ? { ...node, data: { pageIndex: 0, isLoading: false, error: true } }
                : node
        );
        setGlobalNodes(updatedNodes);
        console.error('Error generating content:', error);
        throw error;
    }
};
