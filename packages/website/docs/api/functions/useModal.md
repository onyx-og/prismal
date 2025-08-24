# Function: useModal()

> **useModal**(`config?`): `object`

Defined in: [hooks/useModal/index.tsx:9](https://github.com/onyx-og/prismal-react/blob/f611b276376e5e5dfd4621937c01a0c007234c7b/src/hooks/useModal/index.tsx#L9)

Custom hook meant to export a Modal component and the methods to manage its state
This allows to provide the Modal component with headers, footers or content that can already alter that state
Also to ease the management of the state from other components outside the Modal.

## Parameters

### config?

#### areaId?

`string`

## Returns

`object`

### close()

> **close**: () => `void`

#### Returns

`void`

### Modal

> **Modal**: `FC`\<`ModalProps`\> = `_Modal`

### open()

> **open**: () => `void`

#### Returns

`void`

### state

> **state**: `boolean`
