import { GoogleGenerativeAI } from '@google/generative-ai';
import { useGlobalState } from './globalState';
import { Node, Edge } from '@xyflow/react';
import { generateId } from './commons';

interface Page {
    name: string;
    svg: string;
}

const generatePrompt = (nodes: Node[], edges: Edge[]) => `
  
  You are an expert in creating figma ui like wireframes using html, tailwind, and javascript. 
  You will be provided with a two JSON files (Nodes - the objects and Edges - the relationships between the objects) structured using the Object-Oriented UX (OOUX) methodology. 
  Your task is to analyze the objects, their attributes, actions, and relationships, then generate a complete 
  set of UI screens needed for the described application.
   Please make sure to create a separate UI screens for all the screens that might be needed based on your understanding of the app from the json file. 
   don't use any other library than svg CSS tailwind and js. gimme separate files for all the screens that are needed. 
   separate svg. 
   please fill in details and imgs if required with the placeholder values from somewhere. 
   You can use the following for images - 
  cataas API - https://cataas.com/cat
  no commentary.
  Gimme the svg files of those webpages as an array. You have to return a single json file which will contain an array of all the pages and the svg for all those pages. the json that you return should be in the following format - { pages: [{ name, svg }] } thank you
  Do not create unnecessary or extra pages that are not explicitly mentioned in the jsons. 
    

  here's your jsons
    Nodes:
  ${JSON.stringify(nodes)}
    Edges:
  ${JSON.stringify(edges)}
`;

export const loadModel = async () => {
    const genAI = new GoogleGenerativeAI("AIzaSyAyycEffMJ-NaBNgp4hYKulRFcKvH9vNIo");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
    return model;
};

export const generateCode = async (nodes: Node[], edges: Edge[]) => {
    const model = await loadModel();
    if (!model) return;

    const { setPages, globalNodes, setGlobalNodes } = useGlobalState.getState();

    console.log('loaded the model');
    const prompt = generatePrompt(nodes, edges);
    const result = await model.generateContent(prompt);

    const json = result.response.text().replace(/```json|```/g, '');
    console.log('json', json);

    // parse the json
    const jsonObject = JSON.parse(json);
    console.log('jsonObject', jsonObject);

    // Store pages in global state
    setPages(jsonObject.pages);

    // Create ContentViewer nodes for each page
    const contentViewerNodes = jsonObject.pages.map((page: Page, index: number) => ({
        id: generateId(),
        type: 'contentViewer',
        position: { x: 800, y: index * 400 }, // Stack them vertically with some spacing
        data: { pageIndex: index }
    }));

    // Add the new nodes to the canvas
    setGlobalNodes([...globalNodes, ...contentViewerNodes]);

    return jsonObject.pages;
};
