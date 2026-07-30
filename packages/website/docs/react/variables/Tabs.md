# Variable: Tabs

> `const` **Tabs**: `ForwardRefExoticComponent`\<`TabsProps` & `RefAttributes`\<`TabRef` \| `undefined`\>\>

Defined in: [components/Tabs/index.tsx:225](https://github.com/onyx-og/prismal/blob/4fbc5ce1b55f11c076a1a42e3e11304f57a96dd9/packages/react/src/components/Tabs/index.tsx#L225)

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
