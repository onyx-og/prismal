import React, { RefObject } from 'react';

/**
 * 
 * https://dev.to/vitaliemaldur/resize-event-listener-using-react-hooks-1k0c
 */
const useElementWidth = (ref: RefObject<HTMLElement | undefined | null>) => {
// const useElementWidth = (element: HTMLElement | null) => {
	// save current element width in the state object
	const [width, setWidth] = React.useState(ref.current?.clientWidth || 0);

	React.useEffect(() => {
		// let element = ref.current;
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
	}, [ref])

	// Tracks elemenet width also when changing in content size
	React.useEffect(() => {
		setWidth(ref.current?.clientWidth || 0)
	}, [ref.current?.clientWidth])

	return width;
}

export default useElementWidth;