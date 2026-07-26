import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { View, ViewItem, Card, Button } from '@prismal/react';

import "./stories.scss";

const meta = {
    title: 'Commons/View',
    component: View,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
        reflow: {
            control: 'select',
            options: ['clamp', 'wrap', 'transpose', 'stack', 'none']
        },
        dense: { control: 'boolean' }
    }
} as Meta<typeof View>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
    columns: 4,
    rows: 2,
    cellWidth: "1fr",
    cellHeight: 10,
    gap: 1,
    children: [
        <ViewItem key="1">
            <Card style={{ height: "100%" }} header={<h4>Card 1</h4>} elevation={1}>
                Auto-placed, first in DOM order.
            </Card>
        </ViewItem>,
        <ViewItem key="2">
            <Card style={{ height: "100%" }} header={<h4>Card 2</h4>} elevation={1}>
                Auto-placed, second.
            </Card>
        </ViewItem>,
        <ViewItem key="3">
            <Card style={{ height: "100%" }} header={<h4>Card 3</h4>} elevation={1}>
                Auto-placed, third.
            </Card>
        </ViewItem>,
        <ViewItem key="4">
            <Card style={{ height: "100%" }} header={<h4>Card 4</h4>} elevation={1}>
                Auto-placed, fourth.
            </Card>
        </ViewItem>,
    ]
};

export const HookedAndSpanning: Story = {};
HookedAndSpanning.args = {
    columns: 4,
    rows: 3,
    cellWidth: "1fr",
    cellHeight: 8,
    gap: 1,
    children: [
        <ViewItem key="hero" at="A1" width={2} height={2}>
            <Card style={{ height: "100%" }} elevation={2}
                header={<h3>Featured</h3>}
                footer={<Button type="primary">Read more</Button>}>
                Hooked at A1, spans 2 columns by 2 rows.
            </Card>
        </ViewItem>,
        <ViewItem key="c1" at="C1">
            <Card style={{ height: "100%" }} elevation={1} header={<h4>C1</h4>}>
                A single cell, hooked explicitly.
            </Card>
        </ViewItem>,
        <ViewItem key="d1" at="D1">
            <Card style={{ height: "100%" }} elevation={1} header={<h4>D1</h4>}>
                Another single cell.
            </Card>
        </ViewItem>,
        <ViewItem key="flow">
            <Card style={{ height: "100%" }} elevation={1} header={<h4>Flowed</h4>}>
                No address — falls into the next open cell.
            </Card>
        </ViewItem>,
    ]
};

export const AutoScaleColumns: Story = {};
AutoScaleColumns.args = {
    columns: 12,
    autoScale: true,
    cellWidth: "1fr",
    cellHeight: 6,
    gap: 1,
    children: Array.from({ length: 12 }, (_, i) => (
        <ViewItem key={i}>
            <Card style={{ height: "100%" }} elevation={1}>
                {i + 1}
            </Card>
        </ViewItem>
    ))
};
AutoScaleColumns.parameters = {
    docs: {
        description: {
            story: "Base count of 12 with `autoScale`. Resize the preview to see the ladder: 4 columns at xs, 6 at sm, 8 at md, 12 from lg up."
        }
    }
};

export const LayeredOverlay: Story = {};
LayeredOverlay.args = {
    columns: 12,
    rows: 8,
    cellWidth: "1fr",
    cellHeight: "1fr",
    style: { height: "20rem" },
    children: [
        <ViewItem key="base" at="B2" width={10} height={6} layer={0}>
            <Card style={{ height: "100%" }} elevation={2}
                header={<h3>Base layer</h3>}>
                Inset a full cell from every edge.
            </Card>
        </ViewItem>,
        <ViewItem key="badge" at="A1" width={12} height={8} layer={1}
            justify="start" align="start" pointerEvents="content">
            <Button type="primary" shape="circle">New</Button>
        </ViewItem>,
        <ViewItem key="corner" at="J6" width={3} height={2} layer={2}
            justify="end" align="end" offset={{ x: 1, y: 1 }}>
            <Button type="primary">Straddles the corner</Button>
        </ViewItem>,
    ]
};
LayeredOverlay.parameters = {
    docs: {
        description: {
            story: "A base Card and two overlays sharing the same area. `layer` orders them, `justify`/`align` pin each to an edge, and `pointerEvents=\"content\"` on the badge lets clicks pass through its empty space to the card beneath."
        }
    }
};
