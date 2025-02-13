import { Handle, Position } from '@xyflow/react';
import { useGlobalState } from '../../utils/globalState';
import { useState, useEffect } from 'react';

interface ContentViewerProps {
    data: {
        pageIndex?: number;
    };
}

export default function ContentViewer({ data }: ContentViewerProps) {
    const [currentSvg, setCurrentSvg] = useState<string>('');
    const { pages } = useGlobalState();
    const pageIndex = data?.pageIndex || 0;

    useEffect(() => {
        if (pages.length > 0 && pageIndex < pages.length) {
            setCurrentSvg(pages[pageIndex].svg);
        }
    }, [pageIndex, pages]);

    return (
        <div className="content-viewer" style={{
            background: 'white',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            width: '400px',
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <div className="svg-container" style={{
                width: '100%',
                height: '100%',
                overflow: 'auto'
            }}
                dangerouslySetInnerHTML={{ __html: currentSvg || '<div style="display: flex; justify-content: center; align-items: center; height: 100%; color: #666;">No SVG generated yet</div>' }}
            />
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}