# ab_tracing_service

This is a website that helps with handling Organic Farming requirements in Europe. It is basic but deploys on Vercel.
This is very much a work in progress.
It will handle tracing of all organic materials via QRCodes. The project is to produce both public and private tracing QRCodes to access tracing information about plants (was it grown? was the seed organic? what treatments were applied? Are the treatments home-made?). By scanning these codes you can have a look at the entire graph of the plant/material/etc.
The system is intended to give partial access to this graph to your clients by scanning the QRCode on the product.

## Technologies

The frontend is an Vue based website.
The services are in Golang, the core of the Go code is in https://github.com/alixMougenot/ab_tracing, this is because Vercel can only import 'external' packages in its serverless functions.

## How to install

- Create the database (on Vercel): _TODO_
- Setup the database: _TODO_
- Clone this project into your repository: _TODO_
- Edit the config to use your vercel database: _TODO_
- Edit the config to setup your credentials: _TODO_
- Deploy !


# Vue3 Default documentation 
## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

