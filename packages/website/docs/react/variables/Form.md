# Variable: Form

> `const` **Form**: `FC`\<`FormProps`\>

Defined in: [components/Form/index.tsx:52](https://github.com/onyx-og/prismal/blob/17254afab57ba6cf30b0e7f50b84dce8aff4426c/packages/react/src/components/Form/index.tsx#L52)

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
