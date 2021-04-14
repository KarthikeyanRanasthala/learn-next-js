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

## 03 - Data Fetching Methods

- Next.js supports two types of pre-rendering,
    1. Static Generation
    2. Server-side Rendering

- There are 4 different functions for pre-rendering,
    1. `getStaticProps` (Static Generation)
    2. `getStaticPaths` (Static Generation)
    3. `getServerSideProps` (Server-side Rendering)
    4. `getInitialProps` (Server-side Rendering)

- We have to export an `async` function from a pages to use these data fetching methods.


### getStaticProps (Static Generation)

- This should return an object with,
    1. `props` (required - serializable object)
    2. `notFound` (optional - boolean)


```js
// pages/courses/index.js

const CoursesMainPage = (props) => {
    console.log(props);

    return (
        <>
            <h1>Courses</h1>
            <ol>
            {props.courses.map(course => <li key={course}>{course}</li>)}
            </ol>
        </>
    )
};

export const getStaticProps = async () => {
    return {
        props: {
            courses: ['Full Stack Web Development', 'Full Stack Android Development'],
        },
    }
}

export default CoursesMainPage;
```

### getStaticPaths (Static Generation)

- If a page with dynamic routes has `getStaticProps` then the page will need `getStaticPaths` to define the paths for pre-rendering.

- This should return an object with,
    1. paths (required - Array of Objects)
    2. fallback (required - boolean)

- When fallback is set to `false` then any path that is defined in `getStaticPaths` will result in `404 page` .

```js
// pages/courses/[id].js

import { withRouter } from "next/router";

const coursesMap = {
  "full-stack-web-development": "Full Stack Web Development",
  "full-stack-android-development": "Full Stack Android Development",
};

const FSDCoursePage = (props) => {
  console.log(props.router.query);

  return (
    <>
      <h1>{coursesMap[props.router.query.id] || "Unknown"} Course</h1>
    </>
  );
};

export const getStaticProps = async (context) => {
  return {
    props: {
      id: context.params.id,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: "full-stack-web-development" },
      },
      {
        params: { id: "full-stack-android-development" },
      },
    ],
    fallback: false,
  };
};

export default withRouter(FSDCoursePage);
```

### getServerSideProps (Server-side rendering)

- If a page exports `getServerSideProps` then the page will be pre-rendered on every request.

- This should return an object with,
    1. props (required - serializable object)
    2. notFound (optional - boolean)

```js
// pages/ssr/getServerSideProps-example.js

const Page = (props) => (
    <>
       {props.data.map(ele => <p key={ele}>{ele}</p>)} 
    </>
);

export const getServerSideProps = async () => {
    return {
        props: {
            data: ['a', 'b', 'c', 'd']
        }
    }
}

export default Page;
```

### getInitialProps (Server-side rendering)

- Pages with `getInitialProps` will also be pre-rendered on every request.

- This should return a serializable object.

```js
// pages/ssr/getInitialProps-example.js

const Page = (props) => (
    <>
       {props.data.map(ele => <p key={ele}>{ele}</p>)} 
    </>
);

Page.getInitialProps = async () => {
    return {
        data: ['a', 'b', 'c', 'd']
    }
}

export default Page;
```

## 04 - Custom App & Custom Document

- Custom App & Custom Document does not support data fetching methods like `getServerSideProps`, `getStaticProps` and `getStaticPaths`.
### Custom App

- Next.js uses `App` component to initialize all pages. You can override it by creating a new file `_app.js` in `pages` directory and can do the following,
    1. Common layout for all pages
    2. Global CSS
    3. Meta tags in `head`.
    4. Use Redux Provider
    5. Custom error handling with `componentDidCatch`

- Adding `getInitialProps` to `_app.js` will disable `Automatic Static Optimiation`.

```js
// pages/_app.js

const CustomApp = ({ Component, pageProps }) => (
    <Component {...pageProps} />
);

export default CustomApp;
```

### Custom Document

- Next.js uses `Document` component to augment the application's `<html>` and `<body>` tags. We can override it by creating a new file `_document.js` in pages directory.

- `Document` is rendered only on server-side, so `react lifecycle methods` and `event handlers` will not work.

```js
// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document'

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
```

## 05 - Styling in Next.js

- By default, Next.js comes with support for `css modules` and `styled-jsx`.

### Using CSS Modules

- Create a file with filename in `<something>.module.css`. `ClassNames` in the file should be camelCased.

```css
/* src/styles/index.module.css */

.heading {
    text-align: center;
}

.linksContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}
```

- Import the `css` file and which will expose the styles as an object with `classNames` as keys.

```js
// pages/index.js

import Link from 'next/link';
import { withRouter } from 'next/router';

import styles from '../src/styles/index.module.css';

const IndexPage = (props) => (
    <>
        <h1 className={styles.heading}>Index Page</h1>
        <div className={styles.linksContainer}>
            <Link href="/about">Goto About</Link>
            <button onClick={() => props.router.push('/courses')}>Goto Courses</button>
        </div>
    </>
);

export default withRouter(IndexPage);
```

### Using Styled-JSX

- Styles can be written within the react components and no restriction on camelCasing classNames as seen in css modules.

- A simple component with scoped CSS is shown below,

```js
// src/components/Button.js

const Button = (props) => (
    <>
        <style jsx>
            {`
                .button {
                    padding: 6px 8px;
                    background: black;
                    color: white;
                    border-radius: 4px;
                    border: none;
                }
                .button:hover {
                    transform: translateY(-1px);
                    cursor: pointer;
                }
            `}
        </style>
        <button
            onClick={props.onClick}
            className="button"
        >
            {props.children}
        </button>
    </>
);

export default Button;
```

- To add/override styles of children components, we can using global selector (`:global`).

```js
// pages/about.js

import { useRouter } from 'next/router'
import Button from '../src/components/Button';

const AboutPage = () => {
    const router = useRouter();
    return (
    <>
        <style jsx>
            {`
                .about-page-container :global(.button) {
                    background: red;
                    color: white;
                }
            `}
        </style>
        <div className="about-page-container">
            <h1>About Page</h1>
            <Button onClick={() => router.push('/')}>Goto Home</Button>
        </div>
    </>
)};

export default AboutPage;
```

- To add global styles to your application which reflects across all the pages, we can use `<style jsx global>` in `_app.js`.

```js
// pages/_app.js

const CustomApp = ({ Component, pageProps }) => (
    <>
        <style jsx global>
            {`
                a {
                    color: maroon;
                }
            `}
        </style>
        <Component {...pageProps} />
    </>
);

export default CustomApp;
```

## 06 - Static File Serving

- Next.js supports static serving from `public` directory. This can be used to serve static content like images, fonts and `robots.txt`.

- We can use the static assets by setting the path without the `public` prefix. For example, to use an image at `/public/some-image.jpg`,

```html
<img src="/some-image.jpg" />
```

## 07 - Next Head & Next Image

- Next.js exposes a custom component for appending elements to `head` element. We can use this to add dynamic document titles and SEO related meta tags.

```js
// pages/_app.js

import Head from 'next/head';

const CustomApp = ({ Component, pageProps }) => (
    <>
        <style jsx global>
            {`
                a {
                    color: maroon;
                }
            `}
        </style>
        <Head>
            <title>Learn Next.js</title>
        </Head>
        <Component {...pageProps} />
    </>
);

export default CustomApp;
```

- Next.js also exposes a custom image component for automatic image optimization. This allow for resizing, optimizing and serving images in modern formats (webp when the browser supports it). Images are optimized on request, so this will not effect your build time.

```js
// pages/index.js

import Link from 'next/link';
import { withRouter } from 'next/router';
import Image from 'next/image';

import styles from '../src/styles/index.module.css';

const IndexPage = (props) => (
    <>
        <style jsx>
            {`
                .icecream-container {
                    width: 500px;
                    margin: 32px auto;
                }
            `}
        </style>
        <h1 className={styles.heading}>Index Page</h1>
        <div className={styles.linksContainer}>
            <Link href="/about">Goto About</Link>
            <button onClick={() => props.router.push('/courses')}>Goto Courses</button>
        </div>
        <div className="icecream-container">
            <Image src="/icecream-by-pexels.jpeg" width={500} height={750} />
        </div>
    </>
);

export default withRouter(IndexPage);
```

## 08 - API Routes with Next.js 

- Any file inside `/api` folder will be considered as an API route instead of a page.

```js
// pages/api/health.js

const handler = (req, res) => {
    res.status(200).json({ status: 'OK' })
};

export default handler;
```

- This also follows the same file system based routing. So you can access this API route at `/api/health`.

- `req` and `res` are standard node `IncomingMessage` and `ServerResponse` instance with some pre-built middlewares. So you can use most of the express/connect middlewares with API routes.

```
NOTE: We should not use these API routes in `getStaticProps`, instead you can directly import the logic used in the API route into `getStaticProps`. `getStaticProps`, `getStaticPaths` and `getServerSideProps` are not included in the client-side bundle.

Checkout https://next-code-elimination.vercel.app/
```