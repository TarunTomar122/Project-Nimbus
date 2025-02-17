import './styles.css';

import { useGlobalState } from '../../utils/globalState';
import { generateId, findBestPosition } from '../../utils/commons';
import { generateCode } from '../../utils/inference';
import { useState, useRef, useEffect } from 'react';

function Toolbar() {
    const { globalNodes, globalEdges, setGlobalNodes, prompt, setPrompt, saveToLocalStorage, loadFromLocalStorage, clearLocalStorage } = useGlobalState();
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
            <button onClick={saveToLocalStorage} title="Save to localStorage">
                <svg className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
            </button>
            <button onClick={loadFromLocalStorage} title="Load from localStorage">
                <svg className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
            </button>
            <button onClick={clearLocalStorage} title="Clear localStorage">
                <svg className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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