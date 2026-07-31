# Function: useTransitionState()

> **useTransitionState**(`visible`, `duration?`): `UseTransitionStateReturn`

Defined in: [hooks/useTransitionState/index.ts:33](https://github.com/onyx-og/prismal/blob/22083a37c54803b3bac61332c2b8b20207a5d1cf/packages/react/src/hooks/useTransitionState/index.ts#L33)

useTransitionState

## Parameters

### visible

`boolean`

Whether the content should be visible.

### duration?

`number` = `250`

The transition duration in milliseconds. Should match the
CSS transition duration used for the enter/exit animation.

## Returns

`UseTransitionStateReturn`

Whether to render, and the current transition phase.

## Description

A custom hook that coordinates mount/unmount timing around a CSS transition,
so a component can keep rendering long enough to play its exit animation instead of
disappearing instantly when `visible` flips to false.

## Example

```ts
const { shouldRender, phase } = useTransitionState(visible, 400);
if (!shouldRender) return null;
return <div className={phase === 'entered' ? 'modal visible' : 'modal'}>...</div>;
```
