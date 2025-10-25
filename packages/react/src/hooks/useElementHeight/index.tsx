import { RefObject, useState, useEffect } from 'react';

/**
 * @function useElementHeight
 * @description A custom hook that tracks the height of a DOM element, updating on resize and content changes.
 * @param {RefObject<HTMLElement>} ref A ref to the element to measure.
 * @returns {number} The current height of the element.
 * @example
 * const myRef = useRef(null);
 * const height = useElementHeight(myRef);
 * <div ref={myRef}>Height is {height}px</div>
 */
const useElementHeight = (ref: RefObject<HTMLElement>) => {
	// save current element width in the state object
	const [height, setHeight] = useState(ref.current?.clientHeight || 0);

	useEffect(() => {
		if (ref.current) {
			// timeoutId for debounce mechanism
			let timeoutId: number;
			setHeight(ref.current.clientHeight);

			const resizeListener = () => {
				// prevent execution of previous setTimeout
				window.clearTimeout(timeoutId);
				// trigger execution after 150 milliseconds
				timeoutId = window.setTimeout(() => {
					// change height only if it differs from current one
					if (ref.current?.clientHeight !== height) setHeight(ref.current?.clientHeight || 0)
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
	}, [ref, height])

	// Tracks elemenet height also when changing in content size
	useEffect(() => {
		setHeight(ref.current?.clientHeight || 0)
	}, [ref.current?.clientHeight])

	return height;
}

export default useElementHeight;