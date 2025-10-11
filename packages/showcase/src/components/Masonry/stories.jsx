import { Masonry, Card } from '@prismal/react';

const meta = {
    title: 'Commons/Masonry',
    component: Masonry,
    argTypes: {
        accent: { control: 'color' },
        accentDark: { control: 'color' },
        accentLight: { control: 'color' },
    }
};

export default meta;

export const ProcessedMasonry = {
    args: {
        data: [
            {
                image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=60',
                title: 1
            },
            {
                image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1000&q=60',
                title: 2
            },
            {
                image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=60',
                title: 3
            },
            {
                image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=60',
                title: 4
            },
            {
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=60',
                title: 5
            },
            {
                image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=60',
                title: 6
            },
            {
                image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60',
                title: 7
            },
            {
                image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=60',
                title: 8
            },
            {
                image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=60',
                title: 9
            },
            {
                image: '',
                title: 10
            },
            {
                image: '',
                title: 11
            },
        ],
        type: 'process',
        itemRenderer: (el) => <Card>
            <img src={el.image} />
            {`Element ${el.title}`}
        </Card>
    }
}

export const RawMasonry = {};
RawMasonry.args = {
    type: 'raw',
    children: [
        {
            image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=60',
            title: 1
        },
        {
            image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1000&q=60',
            title: 2
        },
        {
            image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=60',
            title: 3
        },
        {
            image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=60',
            title: 4
        },
        {
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=60',
            title: 5
        },
        {
            image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=60',
            title: 6
        },
        {
            image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60',
            title: 7
        },
        {
            image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=60',
            title: 8
        },
        {
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=60',
            title: 9
        },
        {
            image: '',
            title: 10
        },
        {
            image: '',
            title: 11
        },
    ].map((el) => <Card>
        <img src={el.image} />
        {`Element ${el.title}`}
    </Card>)
};