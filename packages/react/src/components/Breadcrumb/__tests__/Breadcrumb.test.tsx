import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { afterEach, test, expect, jest } from '@jest/globals';
import React from 'react';
import Breadcrumb, { BreadcrumbItem } from '../';

afterEach(() => cleanup());

/**
 * @description Test case: Renders breadcrumb with default items configuration.
 */
test('Data-driven breadcrumb rendering', () => {
    const items = [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Single Post' }
    ];

    render(<Breadcrumb items={items} />);

    // Breadcrumb nav exists
    const navEl = screen.getByLabelText('Breadcrumb');
    expect(navEl).toBeInTheDocument();

    // Verify list structure
    const listEl = screen.getByRole('list');
    expect(listEl).toBeInTheDocument();

    // Verify items
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');

    const blogLink = screen.getByText('Blog');
    expect(blogLink).toBeInTheDocument();
    expect(blogLink.closest('a')).toHaveAttribute('href', '/blog');

    const activeText = screen.getByText('Single Post');
    expect(activeText).toBeInTheDocument();
    expect(activeText.closest('span')).toHaveAttribute('aria-current', 'page');
    expect(activeText.closest('a')).toBeNull(); // Last item has no interactive <a> tag
});

/**
 * @description Test case: Checks preset separator mapping.
 */
test('Breadcrumb custom preset separator', () => {
    const items = [
        { label: 'Home', href: '/' },
        { label: 'About' }
    ];

    const { container } = render(<Breadcrumb items={items} separator="arrow" />);

    // Arrow is → (\u2192)
    const sepEl = container.querySelector('.prismal-breadcrumb-separator');
    expect(sepEl).toBeInTheDocument();
    expect(sepEl).toHaveTextContent('→');
});

/**
 * @description Test case: Verify compound component pattern works with auto-active last item.
 */
test('Compound component pattern rendering', () => {
    render(
        <Breadcrumb>
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
            <BreadcrumbItem>API</BreadcrumbItem>
        </Breadcrumb>
    );

    const homeLink = screen.getByText('Home');
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');

    const docsLink = screen.getByText('Docs');
    expect(docsLink.closest('a')).toHaveAttribute('href', '/docs');

    const activeEl = screen.getByText('API');
    expect(activeEl.closest('span')).toHaveAttribute('aria-current', 'page');
    expect(activeEl.closest('a')).toBeNull();
});

/**
 * @description Test case: Ensures callbacks fire on clickable intermediate links.
 */
test('BreadcrumbItem handles onClick callback', () => {
    const handleClick = jest.fn();

    render(
        <Breadcrumb>
            <BreadcrumbItem onClick={handleClick}>Home</BreadcrumbItem>
            <BreadcrumbItem>Docs</BreadcrumbItem>
        </Breadcrumb>
    );

    const homeEl = screen.getByText('Home');
    fireEvent.click(homeEl);
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Active item click shouldn't trigger anything since it's a span, not a link
    const docsEl = screen.getByText('Docs');
    fireEvent.click(docsEl);
    expect(handleClick).toHaveBeenCalledTimes(1); // Still 1
});

/**
 * @description Test case: Verifies text truncation and tooltips.
 */
test('BreadcrumbItem text truncation', () => {
    render(
        <Breadcrumb maxLabelWidth={100} truncate={true}>
            <BreadcrumbItem>VeryLongTitleThatShouldBeTruncated</BreadcrumbItem>
        </Breadcrumb>
    );

    const labelEl = screen.getByText('VeryLongTitleThatShouldBeTruncated');
    expect(labelEl).toHaveStyle('max-width: 100px');
});
