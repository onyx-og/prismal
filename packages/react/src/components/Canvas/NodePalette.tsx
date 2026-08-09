import { FC } from "react";
import { PaletteEntry } from "./types";

export interface NodePaletteProps<TData = unknown> {
    entries: PaletteEntry<TData>[];
    onAdd: (entry: PaletteEntry<TData>) => void;
}

/**
 * @component NodePalette
 * @description A floating panel of buttons — one per `PaletteEntry` — for adding new nodes to the
 * canvas. Canvas renders this docked to the top-left corner while `editable` and `showPalette` are
 * both true, mirroring `NodeInspector` (top-right) and `ViewportControls` (bottom-right).
 */
const NodePalette: FC<NodePaletteProps> = ({ entries, onAdd }) => (
    <div className="prismal-canvas-palette">
        {entries.map((entry) => (
            <button
                key={entry.id}
                type="button"
                className="prismal-canvas-palette-item"
                title={`Add ${entry.label}`}
                onClick={() => onAdd(entry)}
            >
                {entry.icon}
                <span className="prismal-canvas-palette-item-label">{entry.label}</span>
            </button>
        ))}
    </div>
);

export default NodePalette;
