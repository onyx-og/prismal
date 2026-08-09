import Icon from "components/Icon";
import { getRandId } from "utils/";
import { PaletteEntry } from "./types";

/**
 * The six built-in shapes, offered as-is by `NodePalette` when `Canvas` isn't given its own
 * `paletteEntries`. Exported so consumers can compose off of it — `defaultPaletteEntries.filter(...)`
 * to disable one, `[...defaultPaletteEntries, myEntry]` to add one — rather than needing a separate
 * "disable" prop.
 */
export const defaultPaletteEntries: PaletteEntry[] = [
    {
        id: "circle",
        label: "Circle",
        icon: <Icon name="circle-o" />,
        createNode: (position) => ({
            id: getRandId(), shape: "circle", name: "Circle", position,
            width: 70, height: 70, data: {},
        }),
    },
    {
        id: "rectangle",
        label: "Rectangle",
        icon: <Icon name="square-o" />,
        createNode: (position) => ({
            id: getRandId(), shape: "rectangle", name: "Rectangle", variant: "rounded", position,
            width: 150, height: 60, data: {},
        }),
    },
    {
        id: "control",
        label: "Decision",
        icon: <Icon name="code-fork" />,
        createNode: (position) => ({
            id: getRandId(), shape: "control", name: "Decision", position,
            width: 120, height: 90, data: {},
        }),
    },
    {
        id: "union",
        label: "Merge",
        icon: <Icon name="compress" />,
        createNode: (position) => ({
            id: getRandId(), shape: "union", name: "Merge", position,
            width: 100, height: 70, data: {},
        }),
    },
    {
        id: "loop",
        label: "Loop",
        icon: <Icon name="repeat" />,
        createNode: (position) => ({
            id: getRandId(), shape: "loop", name: "Loop", mode: "foreach", position,
            width: 150, height: 60, data: {},
        }),
    },
    {
        id: "end",
        label: "End",
        icon: <Icon name="stop-circle-o" />,
        createNode: (position) => ({
            id: getRandId(), shape: "end", name: "End", position,
            width: 50, height: 50, data: {},
        }),
    },
];
