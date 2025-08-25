# Function: useSidebar()

> **useSidebar**(`config?`): `object`

Defined in: [hooks/useSidebar/index.tsx:9](https://github.com/onyx-og/prismal-react/blob/4de964c33b6496e718d9735afb715c0a69193872/src/hooks/useSidebar/index.tsx#L9)

Custom hook meant to export a Sidebar component and the methods to manage its state
This allows to provide the Sidebar component with headers, footers or content that can already alter that state
Also to ease the management of the state from other components outside the Sidebar.

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

### open()

> **open**: () => `void`

#### Returns

`void`

### Sidebar

> **Sidebar**: `FC`\<`SidebarProps`\> = `_Sidebar`

### state

> **state**: `boolean`
