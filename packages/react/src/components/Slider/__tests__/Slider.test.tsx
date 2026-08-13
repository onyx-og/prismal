import { render, cleanup, fireEvent } from '@testing-library/react';
import { afterEach, test, expect, jest } from '@jest/globals';

import Slider from '../';
import React from 'react';

afterEach(() => cleanup());

// canAdvance only ever blocks moving *forward* to slide index 2 — every other
// transition (backward, or forward to any other slide) is allowed. Exercises
// the gate without hardcoding a single-slide wizard shape.
const blockForwardToIndex2 = (from: number, to: number) => !(to === 2 && to > from);

const renderGatedSlider = (onChange: (i: number) => void) =>
    render(
        <Slider type="raw" id={1} showNavBar canAdvance={blockForwardToIndex2} onChange={onChange}>
            <div>Slide 0</div>
            <div>Slide 1</div>
            <div>Slide 2</div>
        </Slider>
    );

const getRadio = (container: HTMLElement, index: number): HTMLInputElement =>
    container.querySelector(`#slider_${index}-1`) as HTMLInputElement;

const getSlideArea = (container: HTMLElement): HTMLElement =>
    container.querySelector('.prismal-slider-slides') as HTMLElement;

test('canAdvance blocks a forward pagination click and fires no onChange for the blocked index', () => {
    const onChange = jest.fn();
    const { container } = renderGatedSlider(onChange);

    fireEvent.click(container.querySelector('label[for="slider_2-1"]')!);

    expect(getRadio(container, 0).checked).toBe(true);
    expect(getRadio(container, 2).checked).toBe(false);
    expect(onChange).not.toHaveBeenCalledWith(2);
});

test('canAdvance still allows an unblocked forward click', () => {
    const onChange = jest.fn();
    const { container } = renderGatedSlider(onChange);

    fireEvent.click(container.querySelector('label[for="slider_1-1"]')!);

    expect(getRadio(container, 1).checked).toBe(true);
    expect(onChange).toHaveBeenCalledWith(1);
});

test('canAdvance still allows backward navigation past the blocked slide once already there via an allowed path', () => {
    const onChange = jest.fn();
    const { container } = renderGatedSlider(onChange);

    // Reach slide 1 (allowed), then back to slide 0 (allowed, backward).
    fireEvent.click(container.querySelector('label[for="slider_1-1"]')!);
    fireEvent.click(container.querySelector('label[for="slider_0-1"]')!);

    expect(getRadio(container, 0).checked).toBe(true);
    expect(onChange).toHaveBeenLastCalledWith(0);
});

test('canAdvance blocks a forward keyboard arrow-press', () => {
    const onChange = jest.fn();
    const { container } = renderGatedSlider(onChange);

    // slide 0 -> 1 is allowed, landing just before the blocked slide 2.
    fireEvent.click(container.querySelector('label[for="slider_1-1"]')!);
    onChange.mockClear();

    fireEvent.keyDown(getSlideArea(container), { key: 'ArrowRight' });

    expect(getRadio(container, 1).checked).toBe(true);
    expect(onChange).not.toHaveBeenCalled();
});

test('canAdvance blocks a forward swipe', () => {
    const onChange = jest.fn();
    const { container } = renderGatedSlider(onChange);

    fireEvent.click(container.querySelector('label[for="slider_1-1"]')!);
    onChange.mockClear();

    const slideArea = getSlideArea(container);
    fireEvent.touchStart(slideArea, { touches: [{ clientX: 300, clientY: 0 }] });
    fireEvent.touchEnd(slideArea, { changedTouches: [{ clientX: 0, clientY: 0 }] });

    expect(getRadio(container, 1).checked).toBe(true);
    expect(onChange).not.toHaveBeenCalled();
});
