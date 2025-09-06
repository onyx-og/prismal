import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {Alert, Button, Icon} from '@prismal/react';

const meta = {
	title: 'Commons/Alert',
	component: Alert,
	args: {
		visible: true,
		showClose: true
	},
	argTypes: {
		accent: { control: 'color' },
		accentDark: { control: 'color' },
		accentLight: { control: 'color' },
	}
}


export default meta;

export const Info = {
	args: {
		cover: <Icon name='info'/>,
		message: 'This is an info alert'
	}
}

export const Prompt = {};
Prompt.args = {
	cover: <Icon name='question'/>,
	message: 'This is an prompt alert. Lorem ipsum dolor etcetera andiamo avnati consi finche mo non finisco lo spazio per farelo stare su una sola riga',
	action:	[
		<Button>Yes</Button>,
		<Button>No</Button>
	]
};

export const ImageCover = {};
ImageCover.args = {
	cover: <div style={{
		height: '100%',
		width: '100%',
		background: 'url("//upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Great_Wave_off_Kanagawa2.jpg/330px-Great_Wave_off_Kanagawa2.jpg")',
		backgroundSize: 'cover',
	}}> </div>,
	message: 'This is a warning alert'
};

export const Complex = {};
Complex.args = {
	cover: <div style={{
		height: '100%',
		width: '100%',
		background: 'url("//upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Great_Wave_off_Kanagawa2.jpg/330px-Great_Wave_off_Kanagawa2.jpg")',
		backgroundSize: 'cover',
	}}> </div>,
	children: <div style={{
		display: 'flex',
		flexDirection: 'column'
	}}>
		<img src='https://www.w3schools.com/howto/img_avatar2.png' />
		<span>By using the children option you may add whatever you like</span>
		<Button>Ok</Button>
		<Button>Maybe</Button>
	</div>
};
