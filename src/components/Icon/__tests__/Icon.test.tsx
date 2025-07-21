import { render, screen, cleanup } from '@testing-library/react';
import Icon from '../';

afterEach( () => cleanup());

test('Icon should use corresponding class', () => {
    render(<Icon name='close'/>);

    const iconEl = screen.getByTestId('icon-close');

    expect(iconEl).toHaveClass('alenite-icon icon-close');
});