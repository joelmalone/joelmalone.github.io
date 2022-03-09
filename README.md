# joelmalone.com.au

This website was bootstrapped, developed and built with [Vite](https://vitejs.dev/guide/).

It looks good because of the [Lens by Pixelarity](https://pixelarity.com/lens) HTML5 template available from [pixelarity.com](pixelarity.com).

The 3D stuff runs on [babylon.js](https://www.babylonjs.com/).

## How to do the things

### Develop

To run the app locally, using Vite's development server, do this:

> ```bsh
> yarn dev
> ```

### Build

To build the app using Vite, give this bad boy a slap:

> ```bsh
> yarn build
> ```

The output goes into `dist/`.

### Deploy

To build the app and get it ready for deployment to the live website, squanch this:

> ```bsh
> yarn deploy
> ```

That will build the project and then copy the output into the `docs/` directory.

When the `docs/` directory is committed and pushed into git, the live website will be updated automatically.
