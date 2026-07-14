# @taiv/ui Toolkit — Claude Context

Source of the `@taiv/ui` component library consumed by Taiv's web apps
(TaiV_Web_App, and others). Node version is pinned via `.nvmrc` (`lts/iron`,
Node 20) — run `nvm use` before anything.

## Commands

- `npm run dev` — registers this checkout as the global `npm link` target and
  starts `tsc --watch`. This is the linked-development mode.

## Linked development against the web app

To see toolkit changes live inside the Partner Portal:

1. Here: `nvm use && npm run dev` (leave the watcher running).
2. In `~/Documents/Taiv/Code/TaiV/TaiV_Web_App`:
   `nvm use lts/iron && npm link @taiv/ui && npm run start`.

The watcher recompiles on save; the web app's vite dev server picks the output
up through the symlink. To restore the registry package in the web app when
done: `npm unlink @taiv/ui && npm install` there.

## Conventions

UI component conventions (component precedence, tokens, layout primitives) are
governed by the team `taiv-ui` skill — changes here should stay consistent
with it, and durable convention changes should be reflected back into that
skill (agent-skills repo).
