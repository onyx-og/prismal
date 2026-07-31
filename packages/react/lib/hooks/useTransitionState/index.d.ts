/**
 * @typedef {'entering' | 'entered' | 'exiting' | 'exited'} TransitionPhase
 * @description The lifecycle phase of a visibility transition.
 */
export type TransitionPhase = 'entering' | 'entered' | 'exiting' | 'exited';
/**
 * @typedef {object} UseTransitionStateReturn
 * @property {boolean} shouldRender Whether the component should still be mounted in the DOM.
 * @property {TransitionPhase} phase The current phase of the transition.
 */
export type UseTransitionStateReturn = {
    shouldRender: boolean;
    phase: TransitionPhase;
};
/**
 * @function useTransitionState
 * @description A custom hook that coordinates mount/unmount timing around a CSS transition,
 * so a component can keep rendering long enough to play its exit animation instead of
 * disappearing instantly when `visible` flips to false.
 * @param {boolean} visible Whether the content should be visible.
 * @param {number} [duration=250] The transition duration in milliseconds. Should match the
 * CSS transition duration used for the enter/exit animation.
 * @returns {UseTransitionStateReturn} Whether to render, and the current transition phase.
 * @example
 * const { shouldRender, phase } = useTransitionState(visible, 400);
 * if (!shouldRender) return null;
 * return <div className={phase === 'entered' ? 'modal visible' : 'modal'}>...</div>;
 */
declare const useTransitionState: (visible: boolean, duration?: number) => UseTransitionStateReturn;
export default useTransitionState;
