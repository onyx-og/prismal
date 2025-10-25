import { render, screen, cleanup } from '@testing-library/react';
// FIX: Import Jest functions to resolve test runner errors.
import { afterEach, test, expect } from '@jest/globals';
import Icon from '../';
import React from 'react';

afterEach( () => cleanup());

/**
 * @description Test case: Verifies that the Icon component renders with the correct CSS class.
 */
test('Icon should use corresponding class', () => {
    render(<Icon name='close'/>);

    const iconEl = screen.getByTestId('icon-close');

    expect(iconEl).toHaveClass('prismal-icon icon-close');
});