import { FC } from "react";
import Button from "components/Button";

export interface ViewportControlsProps {
    scale: number;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onReset: () => void;
}

/**
 * @component ViewportControls
 * @description A small floating zoom-in/zoom-out/reset control docked to the canvas, showing the
 * current zoom percentage (click it to reset to 100%). Purely a convenience over `useViewport`'s
 * `zoomIn`/`zoomOut`/`resetView` — wheel/pinch-zoom and drag-to-pan work without it.
 */
const ViewportControls: FC<ViewportControlsProps> = ({ scale, onZoomIn, onZoomOut, onReset }) => (
    <div className="prismal-canvas-zoom-controls">
        <Button type="text" size="sm" iconName="search-minus" title="Zoom out" onClick={onZoomOut} />
        <button type="button" className="prismal-canvas-zoom-level" onClick={onReset} title="Reset view">
            {Math.round(scale * 100)}%
        </button>
        <Button type="text" size="sm" iconName="search-plus" title="Zoom in" onClick={onZoomIn} />
    </div>
);

export default ViewportControls;
