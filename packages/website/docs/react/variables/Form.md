# Variable: Form

> `const` **Form**: `FC`\<`FormProps`\>

Defined in: [components/Form/index.tsx:52](https://github.com/onyx-og/prismal/blob/4fbc5ce1b55f11c076a1a42e3e11304f57a96dd9/packages/react/src/components/Form/index.tsx#L52)

## Component

Form

## Description

A form component that manages form state, validation, and submission.

## Param

**props**

The component props.

## Returns

The rendered Form component.

## Example

```ts
<Form name="login" onSubmit={(data) => console.log(data)}>
  <TextInput name="username" label="Username" />
  <TextInput name="password" label="Password" type="password" />
</Form>
```
