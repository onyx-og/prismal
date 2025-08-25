![Logo](_media/logo_banner.svg) 
# @prismal/react

**Breaking down complex UIs into React components.**

[![npm version](https://badge.fury.io/js/%40prismal%2Freact.svg)](https://www.npmjs.com/package/@prismal/react)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/CC%20BY--SA%204.0-pink)](LICENSE.md)
[![TypeScript](https://img.shields.io/badge/Written%20in-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://onyx-og.github.io/prismal-react/)

---

## 🌟 Overview

`@prismal/react` is a foundational React component library designed to simplify the development of complex user interfaces. By providing a set of fundamental, well-designed, and highly reusable components, it empowers developers to build robust and consistent UIs with ease and efficiency.

This library is built with:
* **React**: For building powerful and interactive UIs.
* **TypeScript**: Ensuring type safety and an enhanced developer experience with intelligent autocompletion and error checking.
* **Sass**: For flexible and maintainable styling, including utility mixins and base stylesheet classes.

## ✨ Features

* **Fundamental UI Components**: A curated set of essential React components to kickstart your projects.
* **Type-Safe Development**: Fully written in TypeScript for robust and predictable code.
* **Styling Utilities**: Includes ready-to-use stylesheet classes and powerful Sass utility mixins for consistent theming and customization.
* **Storybook Integration**: Live preview and interactive documentation for all components.

## 🚀 Installation

While the package is not yet published, once it is, installation will be straightforward:

```bash
npm install @prismal/react
```

In the meantime you can install the latest version of the library from the repo:
```bash
npm install onyx-og/prismal-react
```

## 💡 Usage
Prismal react components are designed to be imported individually, allowing for optimal bundle size and clear dependency management.

```jsx
import React from 'react';
// Import specific components and stylesheets
import { Button } from '@prismal/react';
import "@prismal/react/lib/styles/button.css";

function MyComponent() {
  return (
    <div>
      <h1>Welcome to Primal React!</h1>
      <Button onClick={() => alert('Button clicked!')}>
        Click Me
      </Button>
    </div>
  );
}

export default MyComponent;
```

### 📖 Component Preview & Documentation
Explore our components interactively with Storybook. This is the best way to see the components in action, play with their props, and understand their usage.

[Visit the Storybook Preview](https://onyx-og.github.io/prismal-react/)

## 🎨 Styling
The library provides both stylesheet classes for direct application and SCSS utility mixins for deeper customization within your Sass stylesheets.

For detailed information on available classes and mixins, please refer to the Storybook documentation for each component or the dedicated styling guide (coming soon).

## Building
To set up the development environment:

Clone the repository:
```bash
git clone https://github.com/onyx-og/prismal-react.git
```
Install dependencies:
```bash
npm install
```
Run build
```bash
npm run build
```
And you should be good go.

## Running tests
To run the tests, use the following command:
```
npm run test
```
## 📄 License
This project is licensed under the CC-BY-SA-4.0 License - see the [LICENSE](https://github.com/onyx-og/prismal-react/blob/main/LICENSE.md) for details.

## Author
Onyx - [onyx.ac](https://onyx.ac)

## Contributing
We welcome contributions! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.
