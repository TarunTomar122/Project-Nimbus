import './styles.css';

import { useGlobalState } from '../../utils/globalState';
import { generateId, findBestPosition } from '../../utils/commons';
import { generateCode } from '../../utils/inference';

function Toolbar() {
    const { globalNodes, globalEdges, setGlobalNodes } = useGlobalState();

    return (
        <div className="toolbar">
            <button onClick={() => setGlobalNodes([...globalNodes, { id: generateId(), type: 'card', position: findBestPosition(globalNodes), data: { name: 'Card 1', attributes: [{ label: 'Attribute 1', id: generateId() }], actions: [{ label: 'Action 1', id: generateId() } ] } }])}>
                <svg className="h-6 w-6 text-stone-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
            <button onClick={async () => await generateCode(globalNodes, globalEdges)}>
                <svg className="h-6 w-6 text-stone-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
            </button>
        </div>
    );
}

export default Toolbar;