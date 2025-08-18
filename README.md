# **Taiv Web UI Toolkit**

This toolkit is designed to make frontend work quicker, easier, and better for developers working on Taiv’s web apps.

To get started with the toolkit in a new repo, the npm package for the toolkit needs to be installed and setup.

## Installation

To get started with the toolkit, ensure you have the following installed in your project:

- Node 20
- TypeScript 5
- React 17

Then, you can install the package from npm:

```tsx
npm i @taiv/ui
```

The npm package is **public** and requires no access keys. It contains **strictly** UI components, constants, etc. so in order to test changes, you will need to npm link to your web project and run that.

## Making Toolkit Changes

To implement UI Toolkit changes:

1. In the toolkit repo, start a new terminal and run `npm link`
2. In your project repo (i.e. web app), run `npm link @taiv/ui` 
3. Make any changes and test them in your project. The Web App has a UITester page you can easily add components to.
4. If you created a new component, add it the appropriate `index.ts`
5. Once you’re satisfied, `npm run build` and commit your changes to the toolkit repo along with a **version bump** ‼️ in `package.json`
6. In the toolkit repo, run `npm publish` to update npm
7. In your project repo (i.e. web app), run `npm unlink @taiv/ui`  and then `npm i @taiv/ui` to get the version from npm instead of your local one
8. Test again and make sure that the latest version of the package contains your changes and works as expected
9. Done! If you created a new component, update the Notion documentation.

See the Notion documentation for more information on usages and best practices.

## Dependencies

The Taiv UI toolkit was built with the following additional dependencies. These are not required in your project but are used by the toolkit.

```tsx
    "@tabler/icons-react": "^2.47.0",
    "@mantine/core": "^6.0.0",
    "@mantine/hooks": "^6.0.0",
    "@mantine/modals": "^6.0.0",
    "@mantine/notifications": "^6.0.0"
```
