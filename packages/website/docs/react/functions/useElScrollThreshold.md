# Function: useElScrollThreshold()

> **useElScrollThreshold**(`elementRef`, `refTrigger`, `offset`, `threshold`, `scrollEl`): `boolean`

Defined in: [hooks/useScrollPosition/index.ts:39](https://github.com/onyx-og/prismal-react/blob/c800194f7409ec5ee2985ddabc203568950fbd7d/packages/react/src/hooks/useScrollPosition/index.ts#L39)

Tracks the (dynamic) position from the top of the viewport of a (ref) element

## Parameters

### elementRef

`MutableRefObject`\<`undefined` \| `HTMLElement`\>

### refTrigger

required to manage the reference presence and its mutation

`string` | `number` | `boolean`

### offset

`number` = `0`

### threshold

`number` = `0`

### scrollEl

`Document` | `HTMLElement`

## Returns

`boolean`

boolean
