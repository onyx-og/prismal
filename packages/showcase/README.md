# Components showcase for @prismal/react

This project features the Storybook instance located at `packages/storybook`. The `packages/storybook/src` folder contains the Storybook stories (`stories.tsx` files) for most of the UI-kit components, with more showcases currently in development.

## 🛠️ Getting Started (Local Development)

### Prerequisites & Dependency Installation

This `storybook` package is part of a larger monorepo. To ensure all necessary dependencies are installed for both the main `@prismal/react` library and this Storybook environment, you must install them from the **root directory** of the monorepo.

1.  **Clone the main repository.**
2.  **Navigate to the root directory of the monorepo.**
3.  **Install all monorepo dependencies:** This command will install dependencies for *all* packages within the workspace, including this `storybook` package.

    ```bash
    npm install --legacy-peer-deps
    ```

### Running Storybook Live View

Once all monorepo dependencies are installed, you can start the Storybook development server. Navigate into *this* `packages/storybook` directory and run the command:

```bash
cd packages/storybook
npm run start
```

This command will start the Storybook development server, typically opening in your browser at http://localhost:6006 (or another available port). Any changes you make to your components in the main @prismal/react package or the story files within packages/storybook/src will trigger a hot reload in the browser.

### Building Storybook for Deployment
To generate a static build of this Storybook instance:

```bash
cd packages/storybook
npm run build
```
This command will create a storybook-static directory at the `docs` folder. This directory will contain all the static files necessary for viewing your Storybook documentation.

## 🔗 Live Component Preview
You can always explore the deployed Storybook instance here:

[Visit the Storybook Preview](https://onyx-og.github.io/prismal-react/)