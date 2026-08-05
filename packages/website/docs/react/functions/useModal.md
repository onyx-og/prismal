# Function: useModal()

> **useModal**(`config?`): `UseModalReturn`

Defined in: [hooks/useModal/index.tsx:31](https://github.com/onyx-og/prismal/blob/17254afab57ba6cf30b0e7f50b84dce8aff4426c/packages/react/src/hooks/useModal/index.tsx#L31)

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
