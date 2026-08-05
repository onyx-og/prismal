import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Gallery, Icon } from '@prismal/react';
import './stories.scss';

type Photo = { id: number; label: string; color: string; icon: string };

const COLORS = ['#6200EE', '#B988FF', '#230055', '#3b82f6', '#10b981', '#f59e0b'];
const ICONS = ['image', 'camera', 'photo', 'picture-o', 'film', 'star'];

const makePhotos = (start: number, count: number): Photo[] =>
    Array.from({ length: count }, (_, i) => {
        const n = start + i;
        return {
            id: n,
            label: `Photo ${n + 1}`,
            color: COLORS[n % COLORS.length],
            icon: ICONS[n % ICONS.length],
        };
    });

const renderPhoto = (photo: Photo) => (
    <div className="gallery-photo-placeholder" style={{ background: photo.color }}>
        <Icon name={photo.icon} />
    </div>
);

const meta = {
    title: 'Commons/Gallery',
    component: Gallery,
} as Meta<typeof Gallery>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
Default.args = {
    data: makePhotos(0, 12),
    itemRenderer: renderPhoto,
};

export const WithLegend: Story = {};
WithLegend.args = {
    data: makePhotos(0, 8),
    itemRenderer: renderPhoto,
    legend: (photo: Photo, context: Record<string, unknown>) => (
        <span>{photo.label} · {String(context.capturedOn ?? '')}</span>
    ),
    legendContext: { capturedOn: '2026' },
};

export const LoadOnScroll = () => {
    const [photos, setPhotos] = useState<Photo[]>(() => makePhotos(0, 10));

    const handleLoadMore = () => {
        setPhotos((prev) => [...prev, ...makePhotos(prev.length, 6)]);
    };

    return (
        <div className="gallery-load-more-demo">
            <Gallery data={photos} itemRenderer={renderPhoto} onLoadMore={handleLoadMore} />
        </div>
    );
};
