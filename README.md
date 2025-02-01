# neuroAI(client) - Personal Mental Health Assistant - (src wip)

## Prerequisites to be installed on your machine:
- Git
- NodeJS

## Getting started:

To run the project in your local machine:
- Clone/download this repo.
- Make sure you have NodeJS v18.x or above.
- Run in terminal:
```bash
cd neuroAI-client && npm i
```
- This will install all the required pkgs as per `package.json` file.
- Now run:
```bash
npm run dev
```
- This will generate a url like this:
```bash
http://localhost:5173/
```


## Packages to be installed:

### Client side:

<!-- ```bash
npm i @reduxjs/toolkit
``` -->
<!-- ```bash
npm i react-redux
``` -->
```bash
npm i react-router-dom
```
```bash
npm i react-hook-form
```
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
```bash
npm i react-loading-indicators
```
```bash
npm i -D daisyui@latest
```
```bash
npm i socket.io-client
```


<details>
<summary>Inline</summary>

```bash
npm i -D tailwindcss postcss autoprefixer react-router-dom react-hook-form react-loading-indicators -D daisyui@latest socket.io-client
```

</details>


### Server side:

```bash
npm i express
```
```bash
npm i cors
```
```bash
npm i socket.io
```


<details>
<summary>Inline</summary>

```bash
npm i express cors socket.io
```

</details>


### Folder structure
```bash
.
├── eslint.config.js
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── public
│   ├── contact.svg
│   ├── favicon
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon.ico
│   │   └── site.webmanifest
│   └── neuroAI-icon.svg
├── README.md
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── Button.jsx
│   │   ├── ChatBot.jsx
│   │   ├── container
│   │   │   └── Container.jsx
│   │   ├── Footer
│   │   │   └── Footer.jsx
│   │   ├── Header
│   │   │   └── Header.jsx
│   │   ├── index.js
│   │   ├── Input.jsx
│   │   ├── Login.jsx
│   │   ├── Logo.jsx
│   │   └── Signup.jsx
│   ├── index.css
│   ├── main.jsx
│   └── pages
│       ├── About.jsx
│       ├── ChatBot.jsx
│       ├── Contact.jsx
│       ├── Home.jsx
│       ├── index.js
│       ├── Login.jsx
│       └── Signup.jsx
├── tailwind.config.js
├── tree.txt
├── vercel.json
└── vite.config.js

11 directories, 45 files
```