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

## 02 - Pages & Navigation

Next.js uses `file system` based routing. Which means each page (route) corresponds to a `.js` or `.jsx` file within pages directory.

### Simple Pages

- For `/about`, create a new file `about.js` in `pages` directory.

```js
// pages/about.js

const AboutPage = () => <p>About Page</p>;

export default AboutPage;
```

### Nested Pages

- For pages like `/courses/` and `/courses/full-stack-development`, create a folder `courses` inside `pages` directory and create two files `index.js` and `full-stack-development`.

```js
// pages/courses/index.js

const CoursesMainPage = () => (
    <>
        <h1>Courses</h1>
    </>
);

export default CoursesMainPage;
```

```js
// pages/courses/full-stack-development.js

const FSDCoursePage = () => (
    <>
        <h1>Full Stack Development Course</h1>
    </>
);

export default FSDCoursePage;
```

### Navigating between pages

- Next.js provides a `Link` component to allow client-side navigation between pages.

```js
// pages/index.js

import Link from 'next/link';

const IndexPage = () => (
    <>
        <h1>Index Page</h1>
        <Link href="/about">Goto About</Link>
    </>
);

export default IndexPage;
```

- We can also navigate imperatively in Next.js using `useRouter` hook and `withRouter` HOC.

```js
// pages/about.js

import { useRouter } from 'next/router'

const AboutPage = () => {
    const router = useRouter();
    return (
    <>
        <h1>About Page</h1>
        <button onClick={() => router.push('/')}>Goto Home</button>
    </>
)};

export default AboutPage;
```

```js
// pages/index.js

import Link from 'next/link';
import { withRouter } from 'next/router';

const IndexPage = (props) => (
    <>
        <h1>Index Page</h1>
        <Link href="/about">Goto About</Link>
        <button onClick={() => props.router.push('/courses')}>Goto Courses</button>
    </>
);

export default withRouter(IndexPage);
```

### Dynamic routing

- For pages like `/courses/:id` with `:id` being a dynamic value, we can create a file like `[id].js` where `id` will be available as a `query param` for the page.

- The query params from `props.router.query` are only available on the client-side. On server-side, `props.router.query` will be an empty object.

```js
// pages/courses/[id].js

import { withRouter } from "next/router";

const coursesMap = {
    'full-stack-web-development': 'Full Stack Web Development',
    'full-stack-android-development': 'Full Stack Android Development',
}

const FSDCoursePage = (props) => {
    console.log(props.router.query);

    if (typeof window === 'undefined') {
        return <p>Loading...</p>
    }

    return (
        <>
            <h1>{coursesMap[props.router.query.id] || 'Unknown'} Course</h1>
        </>
    )
};

export default withRouter(FSDCoursePage);
```