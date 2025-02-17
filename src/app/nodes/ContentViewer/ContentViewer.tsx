import { useGlobalState } from '../../utils/globalState';
import { useState, useEffect, useRef } from 'react';
import { NodeResizer, NodeProps } from '@xyflow/react';
import './styles.css';

type ContentViewerNodeData = {
    pageIndex: number;
    isLoading?: boolean;
    error?: boolean;
};

export default function ContentViewer({ id, data, selected }: NodeProps) {
    const [currentHtml, setCurrentHtml] = useState<string>('');
    const { pages } = useGlobalState();
    const pageIndex = (data as ContentViewerNodeData).pageIndex;
    const isLoading = (data as ContentViewerNodeData).isLoading || false;
    const hasError = (data as ContentViewerNodeData).error || false;
    const containerRef = useRef<HTMLDivElement>(null);
    const tempDivRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 1800, height: 1200 });

    useEffect(() => {
        if (pages.length > 0 && pageIndex < pages.length) {
            setCurrentHtml(pages[pageIndex].html);
        }
    }, [pageIndex, pages]);

    // Convert HTML to SVG when HTML content changes
    useEffect(() => {
        if (!currentHtml || !tempDivRef.current) return;
        const tempDiv = tempDivRef.current;
        tempDiv.innerHTML = currentHtml;
        //     console.log("canvas",canvas);
        //     document.body.appendChild(canvas);
        // });
        // Convert to SVG
        // htmlToImage.toSvg(tempDiv, {
        //     width: dimensions.width,
        //     height: dimensions.height,
        //     backgroundColor: 'white',
        //     style: {
        //         margin: '0',
        //         padding: '0',
        //     }
        // })
        // .then((svgString) => {
        //     console.log("svgString",svgString);
        //     setSvgContent(svgString);
        //     // Clear the temp div
        //     tempDiv.innerHTML = '';
        // })
        // .catch((error) => {
        //     console.error('Error converting to SVG:', error);
        // });
    }, [currentHtml, dimensions.width, dimensions.height]);

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


    // console.log("dimensions",dimensions);
    return (
        <>
            {selected && (
                <NodeResizer 
                    isVisible={selected}
                    lineStyle={{ border: '12px dotted #d3d2d2' }}
                    handleStyle={{ width: 16, height: 16, backgroundColor: '#2196F3' }}
                    onResize={(event, { width, height }) => {
                        setDimensions({ width, height });
                    }}
                />
            )}

            <div 
                ref={containerRef}
                className="content-viewer"
                style={{
                    background: '#d3d2d2',
                    padding: '0px',
                    border: '1px solid #d3d2d2',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    height: `${dimensions.height}px`,
                    width: `${dimensions.width}px`,
                    overflow: 'scroll',
                }}
            >
                {isLoading ? (
                    <LoadingSpinner />
                ) : hasError ? (
                    <ErrorMessage />
                ) : (
                    <div 
                        ref={tempDivRef}
                        className="content-viewer-content"
                        style={{ 
                            overflow: 'initial',
                            border: '4px solid #f0f0f0',
                            width: '100%',
                            height: '100%'
                        }} 
                    />
                )}
            </div>
        </>
    );
}