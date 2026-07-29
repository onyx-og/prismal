# Function: useSidebar()

> **useSidebar**(`config?`): `UseSidebarReturn`

Defined in: [hooks/useSidebar/index.tsx:30](https://github.com/onyx-og/prismal/blob/82c8311339de452d56900b0f6783f46c131baa95/packages/react/src/hooks/useSidebar/index.tsx#L30)

useSidebar

## Parameters

### config?

Configuration for the sidebar.

#### areaId?

`string`

The ID of the DOM element to render the sidebar into.

## Returns

`UseSidebarReturn`

An object containing the Sidebar component and state management functions.

## Description

A custom hook to manage the state of a Sidebar component.

## Example

```ts
const { Sidebar, open } = useSidebar();
<Button onClick={open}>Open Sidebar</Button>
<Sidebar>Content</Sidebar>
```
