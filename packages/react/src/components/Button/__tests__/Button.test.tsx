import { render, cleanup, screen, within, fireEvent } from '@testing-library/react';
// FIX: Import Jest functions to resolve test runner errors.
import { afterEach, test, expect, jest } from '@jest/globals';

import Button from '../';
import React from 'react';

afterEach(() => cleanup());

/**
 * @description Test case: Renders a base button with default properties.
 */
test('Base button', () => {
    render(<Button name='clickme'>Click me</Button>);

    const btnEl = screen.getByTestId('button-clickme');
    
    expect(btnEl).toBeInTheDocument();
    expect(btnEl).toHaveTextContent('Click me');
    expect(btnEl).toHaveClass('prismal-btn btn-default btn-default-shape');
    expect(btnEl).not.toHaveClass('btn-disabled btn-primary btn-text btn-circle');
});

/**
 * @description Test case: Renders a button with specific type, shape, and disabled state.
 */
test('Button with specific type, shape and disabled state', () => {
    render(<Button
        name='primary-circle'
        shape='circle'
        iconName='A'
        type='primary'
        disabled/>);

    const btnEl = screen.getByTestId('button-primary-circle');

    expect(btnEl).toHaveClass('prismal-btn btn-circle btn-primary btn-disabled');
});

/**
 * @description Test case: Ensures the button can inherit a custom CSS class.
 */
test('Button should inherit class', () => {
    render(<Button
        name='custom-class'
        className='customClass'
        iconName='close'
    />);

    const btnEl = screen.getByTestId('button-custom-class');

    expect(btnEl).toHaveClass('customClass');
});

/**
 * @description Test case: Renders a button with an icon.
 */
test('Button with an icon name', () => {
    render(<Button name='icon-only' iconName='close'/>);

    const btnEl = screen.getByTestId('button-icon-only');

    const iconEl = within(btnEl).getByTestId('icon-close');

    expect(iconEl).toBeInTheDocument();
});

/**
 * @description Test case: Verifies that the onClick callback is fired on click.
 */
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