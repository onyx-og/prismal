# Variable: Tabs

> `const` **Tabs**: `ForwardRefExoticComponent`\<`TabsProps` & `RefAttributes`\<`TabRef` \| `undefined`\>\>

Defined in: [components/Tabs/index.tsx:225](https://github.com/onyx-og/prismal/blob/9a285ef7c2a5fc4511a360c2837da1f9e4206acf/packages/react/src/components/Tabs/index.tsx#L225)

## Component

Tabs

## Description

A component for displaying content in a tabbed interface.

## Param

**props**

The component props.

## Param

**ref**

The forwarded ref.

## Returns

The rendered Tabs component.

## Examples

```ts
<Tabs data={[{ name: 'tab1', label: 'Tab 1' }, { name: 'tab2', label: 'Tab 2' }]}>
  <div data-tab="tab1">Content 1</div>
  <div data-tab="tab2">Content 2</div>
</Tabs>
```

```ts
// Controlled scrollspy-style nav: no panels, external state decides `selected`.
<Tabs
  variant="nav"
  navLabel="Sections"
  data={[{ name: 'intro', label: 'Intro' }, { name: 'details', label: 'Details' }]}
  selected={activeSection}
  onChange={scrollToSection}
/>
```
