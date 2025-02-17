import { useEffect, useRef, useState } from 'react';
import { useGlobalState } from '../../utils/globalState';
import { reiterateContent } from '../../utils/inference';
import './styles.css';

interface Point {
    x: number;
    y: number;
}

export function SelectionOverlay() {
    const { 
        isSelectionToolActive, 
        selection, 
        setSelection, 
        setIsSelectionToolActive 
    } = useGlobalState();
    const overlayRef = useRef<HTMLDivElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState<Point | null>(null);
    const [currentPoint, setCurrentPoint] = useState<Point | null>(null);
    const [reiteratePrompt, setReiteratePrompt] = useState('');
    const [isReiterating, setIsReiterating] = useState(false);

    useEffect(() => {
        if (!isSelectionToolActive) {
            setIsDrawing(false);
            setStartPoint(null);
            setCurrentPoint(null);
        }
    }, [isSelectionToolActive]);

    const findElementsInIframe = () => {
        // Find all content viewer divs (they contain the rendered HTML)
        const contentViewers = document.querySelectorAll('.content-viewer');
        if (!selection || !contentViewers.length) return;

        contentViewers.forEach((viewer) => {
            const viewerRect = viewer.getBoundingClientRect();
            const contentDiv = viewer.querySelector('.content-viewer-content');
            if (!contentDiv) return;

            // Adjust selection coordinates relative to the content viewer
            const relativeSelection = {
                x: selection.x - viewerRect.left + viewer.scrollLeft,
                y: selection.y - viewerRect.top + viewer.scrollTop,
                width: selection.width,
                height: selection.height
            };

            // Get all elements in the content div
            const elements = contentDiv.querySelectorAll('*');
            
            // Find elements that intersect with our selection
            const selectedElements = Array.from(elements).filter(element => {
                const rect = element.getBoundingClientRect();
                const elementRect = {
                    left: rect.left - viewerRect.left + viewer.scrollLeft,
                    right: rect.right - viewerRect.left + viewer.scrollLeft,
                    top: rect.top - viewerRect.top + viewer.scrollTop,
                    bottom: rect.bottom - viewerRect.top + viewer.scrollTop
                };

                return (
                    elementRect.left < (relativeSelection.x + relativeSelection.width) &&
                    elementRect.right > relativeSelection.x &&
                    elementRect.top < (relativeSelection.y + relativeSelection.height) &&
                    elementRect.bottom > relativeSelection.y
                );
            });

            // Log the selected elements and their HTML
            console.log('Selected Elements:', selectedElements);
            const htmlStrings = selectedElements.map(el => {
                const clone = el.cloneNode(true) as HTMLElement;
                // Remove any ids to avoid conflicts
                clone.removeAttribute('id');
                return clone.outerHTML;
            });
            console.log('Selected HTML:', htmlStrings);
        });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!isSelectionToolActive) return;
        
        const rect = overlayRef.current?.getBoundingClientRect();
        if (!rect) return;

        setIsDrawing(true);
        const point = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        setStartPoint(point);
        setCurrentPoint(point);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDrawing || !isSelectionToolActive) return;

        const rect = overlayRef.current?.getBoundingClientRect();
        if (!rect) return;

        setCurrentPoint({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const handleMouseUp = () => {
        if (!isDrawing || !startPoint || !currentPoint) return;

        const x = Math.min(startPoint.x, currentPoint.x);
        const y = Math.min(startPoint.y, currentPoint.y);
        const width = Math.abs(currentPoint.x - startPoint.x);
        const height = Math.abs(currentPoint.y - startPoint.y);

        if (width > 10 && height > 10) {
            setSelection({ x, y, width, height });
            // Call findElementsInIframe after setting the selection
            setTimeout(findElementsInIframe, 0);
        }

        setIsDrawing(false);
        setStartPoint(null);
        setCurrentPoint(null);
    };

    const getSelectionStyle = () => {
        if (isDrawing && startPoint && currentPoint) {
            const x = Math.min(startPoint.x, currentPoint.x);
            const y = Math.min(startPoint.y, currentPoint.y);
            const width = Math.abs(currentPoint.x - startPoint.x);
            const height = Math.abs(currentPoint.y - startPoint.y);

            return {
                left: `${x}px`,
                top: `${y}px`,
                width: `${width}px`,
                height: `${height}px`,
            };
        }

        if (selection) {
            return {
                left: `${selection.x}px`,
                top: `${selection.y}px`,
                width: `${selection.width}px`,
                height: `${selection.height}px`,
            };
        }

        return null;
    };

    const handleReiterate = async () => {
        if (isReiterating) return;
        setIsReiterating(true);

        try {
            // Find all content viewer divs (they contain the rendered HTML)
            const contentViewers = document.querySelectorAll('.content-viewer');
            if (!selection || !contentViewers.length) return;

            for (const viewer of contentViewers) {
                const viewerRect = viewer.getBoundingClientRect();
                const contentDiv = viewer.querySelector('.content-viewer-content');
                if (!contentDiv) continue;

                // Check if the selection is within this viewer's bounds
                const isWithinViewer = (
                    selection.x >= viewerRect.left &&
                    selection.x <= viewerRect.right &&
                    selection.y >= viewerRect.top &&
                    selection.y <= viewerRect.bottom
                );

                if (!isWithinViewer) continue;

                // Get selected elements (reusing logic from findElementsInIframe)
                const relativeSelection = {
                    x: selection.x - viewerRect.left + viewer.scrollLeft,
                    y: selection.y - viewerRect.top + viewer.scrollTop,
                    width: selection.width,
                    height: selection.height
                };

                const elements = contentDiv.querySelectorAll('*');
                const selectedElements = Array.from(elements).filter(element => {
                    const rect = element.getBoundingClientRect();
                    const elementRect = {
                        left: rect.left - viewerRect.left + viewer.scrollLeft,
                        right: rect.right - viewerRect.left + viewer.scrollLeft,
                        top: rect.top - viewerRect.top + viewer.scrollTop,
                        bottom: rect.bottom - viewerRect.top + viewer.scrollTop
                    };

                    return (
                        elementRect.left < (relativeSelection.x + relativeSelection.width) &&
                        elementRect.right > relativeSelection.x &&
                        elementRect.top < (relativeSelection.y + relativeSelection.height) &&
                        elementRect.bottom > relativeSelection.y
                    );
                });

                // Get the selected HTML and full iframe HTML
                const selectedHtml = selectedElements.map(el => {
                    const clone = el.cloneNode(true) as HTMLElement;
                    clone.removeAttribute('id');
                    return clone.outerHTML;
                });
                const fullHtml = contentDiv.innerHTML;

                // Find the page index from the node that contains our selection
                const node = viewer.closest('[data-id]');
                if (!node) continue;
                
                const nodeId = node.getAttribute('data-id');
                if (!nodeId) continue;

                // Find the actual node in the global nodes to get its page index
                const { globalNodes } = useGlobalState.getState();
                const contentViewerNode = globalNodes.find(n => n.id === nodeId);
                if (!contentViewerNode || typeof contentViewerNode.data.pageIndex !== 'number') continue;

                const pageIndex = contentViewerNode.data.pageIndex;

                // Call the reiteration function
                await reiterateContent(selectedHtml, fullHtml, reiteratePrompt, pageIndex);

                // Clear the selection and prompt after successful reiteration
                setSelection(null);
                setReiteratePrompt('');
                // Deactivate the selection tool
                setIsSelectionToolActive(false);
                break; // Only process the first matching viewer
            }
        } catch (error) {
            console.error('Error during reiteration:', error);
        } finally {
            setIsReiterating(false);
        }
    };

    if (!isSelectionToolActive) return null;

    return (
        <div
            ref={overlayRef}
            className="selection-overlay"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {/* Show selection box while drawing */}
            {(isDrawing || selection) && (
                <div 
                    className={`selection-box ${!isDrawing && selection ? 'selection-box-active' : ''}`} 
                    style={getSelectionStyle() || undefined} 
                />
            )}
            
            {/* Debug info panel with reiterate prompt */}
            {selection && (
                <div className="debug-panel">
                    <div className="debug-info">
                        <p>Selected Area:</p>
                        <p>X: {Math.round(selection.x)}</p>
                        <p>Y: {Math.round(selection.y)}</p>
                        <p>Width: {Math.round(selection.width)}</p>
                        <p>Height: {Math.round(selection.height)}</p>
                    </div>
                    
                    <div className="reiterate-section">
                        <textarea
                            value={reiteratePrompt}
                            onChange={(e) => setReiteratePrompt(e.target.value)}
                            placeholder="Enter your prompt for the selected area..."
                            className="reiterate-prompt"
                            disabled={isReiterating}
                        />
                        <div className="button-group">
                            <button 
                                onClick={handleReiterate}
                                className="reiterate-btn"
                                disabled={!reiteratePrompt.trim() || isReiterating}
                            >
                                {isReiterating ? 'Generating...' : 'Reiterate'}
                            </button>
                            <button 
                                onClick={() => {
                                    setSelection(null);
                                    setReiteratePrompt('');
                                }}
                                className="clear-selection-btn"
                                disabled={isReiterating}
                            >
                                Clear Selection
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 