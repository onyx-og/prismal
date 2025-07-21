import { render, cleanup, screen, within, fireEvent } from '@testing-library/react';

import Button from '../';
import React from 'react';

afterEach(() => cleanup());

test('Base button', () => {
    render(<Button name='clickme'>Click me</Button>);

    const btnEl = screen.getByTestId('button-clickme');
    
    expect(btnEl).toBeInTheDocument();
    expect(btnEl).toHaveTextContent('Click me');
    expect(btnEl).toHaveClass('alenite-btn btn-default btn-default-shape');
    expect(btnEl).not.toHaveClass('btn-disabled btn-primary btn-text btn-circle');
});

test('Button with specific type, shape and disabled state', () => {
    render(<Button
        name='primary-circle'
        shape='circle'
        iconName='A'
        type='primary'
        disabled/>);

    const btnEl = screen.getByTestId('button-primary-circle');

    expect(btnEl).toHaveClass('alenite-btn btn-circle btn-primary btn-disabled');
});

test('Button should inherit class', () => {
    render(<Button
        name='custom-class'
        className='customClass'
        iconName='close'
    />);

    const btnEl = screen.getByTestId('button-custom-class');

    expect(btnEl).toHaveClass('customClass');
});

test('Button with an icon name', () => {
    render(<Button name='icon-only' iconName='close'/>);

    const btnEl = screen.getByTestId('button-icon-only');

    const iconEl = within(btnEl).getByTestId('icon-close');

    expect(iconEl).toBeInTheDocument();
});

test('Button should fire onClick callback', () => {
    const handleClick = jest.fn()
  
  
    render(<Button 
        name='onclick'
        iconName='close'
        onClick={handleClick}
    />);

    const btnEl = screen.getByTestId('button-onclick');

    fireEvent.click(btnEl);
    expect(handleClick).toHaveBeenCalledTimes(1);
});