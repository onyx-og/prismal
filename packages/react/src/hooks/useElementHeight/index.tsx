import { RefObject, useState, useEffect } from 'react';

/**
 * 
 * https://dev.to/vitaliemaldur/resize-event-listener-using-react-hooks-1k0c
 */
const useElementHeight = (ref: RefObject<HTMLElement>) => {
// const useElementHeight = (element: HTMLElement | null) => {
	// save current element width in the state object
	const [height, setHeight] = useState(ref.current?.clientHeight || 0);

	useEffect(() => {
		// let element = ref.current;
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
	}, [ref])

	// Tracks elemenet height also when changing in content size
	useEffect(() => {
		setHeight(ref.current?.clientHeight || 0)
	}, [ref.current?.clientHeight])

	return height;
}

export default useElementHeight;