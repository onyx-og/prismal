# Alenite Design

[![NPM](https://img.shields.io/npm/v/alenite-design.svg)](https://www.npmjs.com/package/alenite-design) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Alenite Design is a React UI library designed to provide a set of reusable components for building modern web applications. It's mainly inspired by Material Design 3

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Preview
You can preview most of the components on storybook [here](https://onyxcodes.github.io/alenite-design/).

## Installation

This project is still in early development, please use with care, and don't be afraid to report any bug!
To install Alenite Design, you can use npm:

```bash
npm install alenite-design
```

## Usage
To use a component from Alenite Design, simply import it into your React application:

```jsx
import React from 'react';
import { Button } from 'alenite-design';

const App = () => (
  <div>
    <Button>Click Me</Button>
  </div>
);

export default App;
```

Also remember to import the styles:
```js
require('alenite-design/lib/index.css')
```

## Components

Alenite Design provides the following components:

- Button: A basic button component.
- Input: A customizable input field.
- Modal: A modal dialog component.
- Card: A card component for displaying content.
- ActionBar: Menus and action bars with a focus on responsiveness
- SASS utilities: helps streamline the development of user interfaces

## Contributing
We welcome contributions to Alenite Design! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

### Building
To set up the development environment:

1. Clone the repository:
```
git clone https://github.com/onyxcodes/alenite-design.git
```
2. Install dependencies:
```
npm install
```
3. Run build
```
npm run build
```

And you should be good to go.

### Running tests
To run the tests, use the following command:

## License
Alenite Design is licensed under the CC-BY-SA-4.0 License. See the LICENSE file for more information.

### Author
Onyx - https://onyx.ac