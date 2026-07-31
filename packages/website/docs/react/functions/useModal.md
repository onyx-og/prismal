# Function: useModal()

> **useModal**(`config?`): `UseModalReturn`

Defined in: [hooks/useModal/index.tsx:31](https://github.com/onyx-og/prismal/blob/22083a37c54803b3bac61332c2b8b20207a5d1cf/packages/react/src/hooks/useModal/index.tsx#L31)

useModal

## Parameters

### config?

Configuration for the modal.

#### areaId?

`string`

The ID of the DOM element to render the modal into.

## Returns

`UseModalReturn`

An object containing the Modal component and state management functions.

## Description

A custom hook to manage the state of a Modal component.

## Example

```ts
const { Modal, open, close } = useModal();
<Button onClick={open}>Open Modal</Button>
<Modal title="My Modal">Content</Modal>
```
