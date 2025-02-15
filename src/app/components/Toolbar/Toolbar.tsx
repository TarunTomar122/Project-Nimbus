import './styles.css';

import { useGlobalState } from '../../utils/globalState';
import { generateId, findBestPosition } from '../../utils/commons';
import { generateCode } from '../../utils/inference';
import { useState, useRef, useEffect } from 'react';

function Toolbar() {
    const { globalNodes, globalEdges, setGlobalNodes, prompt, setPrompt } = useGlobalState();
    const [openPromptBox, setOpenPromptBox] = useState(false);
    const [inputPrompt, setInputPrompt] = useState('');
    const promptContainerRef = useRef<HTMLDivElement>(null);

    // THIS doesn't work because the click is on the canvas, not the document :(
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (promptContainerRef.current && !promptContainerRef.current.contains(event.target as Node)) {
                setOpenPromptBox(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="toolbar">
            <button onClick={() => setGlobalNodes([...globalNodes, { id: generateId(), type: 'card', position: findBestPosition(globalNodes), data: { name: 'Card 1', attributes: [{ label: 'Attribute 1', id: generateId() }], actions: [{ label: 'Action 1', id: generateId() } ] } }])}>
                <svg className="h-6 w-6 text-cyan-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
            <button onClick={async () => await generateCode(globalNodes, globalEdges)}>
                <svg className="h-6 w-6 text-cyan-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
            </button>
            <div className="prompt-box-container" ref={promptContainerRef}>            
                <button onClick={() => {
                    setOpenPromptBox(!openPromptBox);
                }}>
                    <svg className="h-6 w-6 text-cyan-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                </button>
                {openPromptBox && 
                    <div className="prompt-box">
                        <div className="prompt-box-header">
                            <p>Write a nice prompt telling the AI about your mapping and your vision with what you want to achieve</p>
                        </div>
                        <textarea placeholder="Enter your prompt here..." value={inputPrompt} onChange={(e) => setInputPrompt(e.target.value)}></textarea>
                        <button onClick={() => {
                            setPrompt(inputPrompt);
                            setOpenPromptBox(false);
                        }}>Add Prompt</button>
                    </div>
                }
            </div>
        </div>
    );
}

export default Toolbar;