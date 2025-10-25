# Variable: Tabs

> `const` **Tabs**: `ForwardRefExoticComponent`\<`TabsProps` & `RefAttributes`\<`undefined` \| `TabRef`\>\>

Defined in: [components/Tabs/index.tsx:162](https://github.com/onyx-og/prismal/blob/7e948b825c73ffc9bb10fe5a1890783eb7215c77/packages/react/src/components/Tabs/index.tsx#L162)

## Component

Tabs

## Description

A component for displaying content in a tabbed interface.

## Param

The component props.

## Param

The forwarded ref.

## Returns

The rendered Tabs component.

## Example

```ts
<Tabs data={[{ name: 'tab1', label: 'Tab 1' }, { name: 'tab2', label: 'Tab 2' }]}>
  <div data-tab="tab1">Content 1</div>
  <div data-tab="tab2">Content 2</div>
</Tabs>
```
