import { Handle, Position } from '@xyflow/react';
import { useGlobalState } from '../../utils/globalState';
import { useState, useEffect } from 'react';

interface ContentViewerProps {
    data: {
        pageIndex?: number;
        isLoading?: boolean;
        error?: boolean;
    };
}

export default function ContentViewer({ data }: ContentViewerProps) {
    const [currentSvg, setCurrentSvg] = useState<string>('');
    const { pages } = useGlobalState();
    const pageIndex = data?.pageIndex || 0;
    const isLoading = data?.isLoading || false;
    const hasError = data?.error || false;

    useEffect(() => {
        if (pages.length > 0 && pageIndex < pages.length) {
            setCurrentSvg(pages[pageIndex].svg);
        }
    }, [pageIndex, pages]);

    const LoadingSpinner = () => (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            flexDirection: 'column',
            gap: '16px'
        }}>
            <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #2196F3',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
            }} />
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
            <div style={{ color: '#666' }}>Generating wireframes...</div>
        </div>
    );

    const ErrorMessage = () => (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            flexDirection: 'column',
            gap: '16px',
            color: '#dc2626'
        }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12" y2="16" />
            </svg>
            <div>Error generating wireframes. Please try again.</div>
        </div>
    );

    return (
        <div className="content-viewer" style={{
            background: 'white',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            width: '400px',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <div className="svg-container" style={{
                width: '100%',
                height: '100%',
                overflow: 'auto'
            }}>
                {isLoading ? (
                    <LoadingSpinner />
                ) : hasError ? (
                    <ErrorMessage />
                ) : (
                    <div dangerouslySetInnerHTML={{ 
                        __html: currentSvg || '<div style="display: flex; justify-content: center; align-items: center; height: 100%; color: #666;">No SVG generated yet</div>' 
                    }} />
                )}
            </div>
        </div>
    );
}