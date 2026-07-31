import { useEffect, useState } from "react";

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
}

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
const useTransitionState = (
    visible: boolean,
    duration: number = 250
): UseTransitionStateReturn => {
    const [shouldRender, setShouldRender] = useState(visible);
    const [phase, setPhase] = useState<TransitionPhase>(visible ? 'entered' : 'exited');

    useEffect(() => {
        let raf1: number;
        let raf2: number;
        let timeout: ReturnType<typeof setTimeout>;

        if (visible) {
            setShouldRender(true);
            setPhase('entering');
            // Double rAF: mount with the closed state painted first, then flip
            // to the open state on the next frame so the transition actually plays.
            raf1 = requestAnimationFrame(() => {
                raf2 = requestAnimationFrame(() => setPhase('entered'));
            });
        } else {
            setPhase((current) => current === 'exited' ? current : 'exiting');
            timeout = setTimeout(() => {
                setShouldRender(false);
                setPhase('exited');
            }, duration);
        }

        return () => {
            cancelAnimationFrame(raf1);
            cancelAnimationFrame(raf2);
            clearTimeout(timeout);
        }
    }, [visible, duration]);

    return { shouldRender, phase };
}

export default useTransitionState;
