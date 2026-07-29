# Variable: Form

> `const` **Form**: `FC`\<`FormProps`\>

Defined in: [components/Form/index.tsx:52](https://github.com/onyx-og/prismal/blob/9a285ef7c2a5fc4511a360c2837da1f9e4206acf/packages/react/src/components/Form/index.tsx#L52)

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
