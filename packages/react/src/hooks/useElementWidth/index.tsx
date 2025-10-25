import { RefObject, useState, useEffect } from 'react';

/**
 * @function useElementWidth
 * @description A custom hook that tracks the width of a DOM element, updating on resize and content changes.
 * @param {RefObject<HTMLElement | undefined | null>} ref A ref to the element to measure.
 * @returns {number} The current width of the element.
 * @example
 * const myRef = useRef(null);
 * const width = useElementWidth(myRef);
 * <div ref={myRef}>Width is {width}px</div>
 */
const useElementWidth = (ref: RefObject<HTMLElement | undefined | null>) => {
	// save current element width in the state object
	const [width, setWidth] = useState(ref.current?.clientWidth || 0);

	useEffect(() => {
		if (ref.current) {
			// timeoutId for debounce mechanism
			let timeoutId: number;
			setWidth(ref.current.clientWidth);

			const resizeListener = () => {
				// prevent execution of previous setTimeout
				window.clearTimeout(timeoutId);
				// trigger execution after 150 milliseconds
				timeoutId = window.setTimeout(() => {
					// change width only if it differs from current one
					if (ref.current?.clientWidth !== width) setWidth(ref.current?.clientWidth || 0)
				}, 150);
			};
			// set resize listener
			window.addEventListener('resize', resizeListener);

			// clean up function
			return () => {
				// remove resize listener
				window.removeEventListener('resize', resizeListener);
			}
		}
	}, [ref, width])

	// Tracks elemenet width also when changing in content size
	useEffect(() => {
		setWidth(ref.current?.clientWidth || 0)
	}, [ref.current?.clientWidth])

	return width;
}

export default useElementWidth;