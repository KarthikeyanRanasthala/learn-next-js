# Learn Next.js

## 01 - Create Next App

1. Initialize a NPM project. The following command will create a `package.json` file with sensible defaults.

```bash
npm init -y
```

2. Install necessary dependencies.

```bash
npm install react react-dom next
```

3. Add `node_modules` and `.next` to `.gitignore` file.

```
node_modules
.next
```

4. Add NPM scripts

```json
// package.json

"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
},
```

5. Create a new directory `pages` and create a new file `index.js` inside the directory.

```js
// pages/index.js

const IndexPage = () => <p>Index Page</p>;

export default IndexPage;
```

6. Run the app in `development` mode.

```bash
npm run dev
```

7. Build the app for `production`.

```bash
npm run build
```

8. Start the app in `production` mode.

```bash
npm start
```