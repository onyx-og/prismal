# Variable: ActionBar

> `const` **ActionBar**: `ForwardRefExoticComponent`\<`ActionBarProps` & `RefAttributes`\<`ActionBarRef`\>\>

Defined in: [components/ActionBar/index.tsx:50](https://github.com/onyx-og/prismal/blob/9a285ef7c2a5fc4511a360c2837da1f9e4206acf/packages/react/src/components/ActionBar/index.tsx#L50)

## Component

ActionBar

## Description

A flexible bar for actions and navigation, divided into left, center, and right sections.

## Param

**props**

The component props.

## Param

**ref**

Forwarded ref to the ActionBar's managed DOM nodes.

## Returns

The rendered ActionBar component.

## Example

```ts
<ActionBar items={[{ item: <Button>Action</Button>, position: 'right', key: 'action1' }]} />
```
