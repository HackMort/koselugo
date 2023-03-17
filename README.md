# Clone Repository

```
git clone https://github.com/HackMort/koselugo.git
```
## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI       


<!-- Screenshot here when its ready -->
## 🚀 Project Structure

```

├── public
│   ├── favicon.svg
│   ├── fonts
│   ├── icons
│   ├── images
│   └── pdf
├── src
│   ├── components
│   ├── env.d.ts
│   ├── js
│   ├── layouts
│   ├── pages
│   └── styles
│       ├── components
│       ├── settings
│       └── style.scss
├── tsconfig.json
├── README.md
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.
              |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) 
