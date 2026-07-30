# Variable: ActionBar

> `const` **ActionBar**: `ForwardRefExoticComponent`\<`ActionBarProps` & `RefAttributes`\<`ActionBarRef`\>\>

Defined in: [components/ActionBar/index.tsx:50](https://github.com/onyx-og/prismal/blob/4fbc5ce1b55f11c076a1a42e3e11304f57a96dd9/packages/react/src/components/ActionBar/index.tsx#L50)

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
