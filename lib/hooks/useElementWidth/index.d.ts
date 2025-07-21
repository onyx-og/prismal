import { RefObject } from 'react';
/**
 *
 * https://dev.to/vitaliemaldur/resize-event-listener-using-react-hooks-1k0c
 */
declare const useElementWidth: (ref: RefObject<HTMLElement | undefined | null>) => number;
export default useElementWidth;
