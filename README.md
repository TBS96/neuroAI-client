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
cd neuroAI-client && git checkout testing && npm i
```
- This will install all the required pkgs as per `package.json` file.
- Now run:
```bash
npm run dev -- --host
```
- This will generate Local and Network urls as follows:
```bash
http://localhost:5173/
```
```bash
http://192.168.0.102:5173/
```
- For dev purpose change the url in neuroAI-server/Mentalhealth/NeuroAI/`views.py` in class `RequestPasswordReset`:
```bash
reset_url = f'http://192.168.0.102:5173/password_reset/confirm/{token}'
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
npm i react-simple-typewriter
```
```bash
npm i socket.io-client
```
```bash
npm i vite-plugin-pwa -D
```
```bash
npm i @vite-pwa/assets-generator -D
```
```bash
npm i lucide-react
```
```bash
npm i react-icons
```

<details>
<summary>Inline</summary>

```bash
npm i -D tailwindcss postcss autoprefixer react-router-dom react-hook-form react-loading-indicators -D daisyui@latest react-simple-typewriter socket.io-client vite-plugin-pwa -D @vite-pwa/assets-generator -D lucide-react react-icons
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
├── .env
├── .env.sample
├── eslint.config.js
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── public
│   ├── apple-touch-icon-180x180.png
│   ├── favicon.ico
│   ├── maskable-icon-512x512.png
│   ├── neuroAI-icon.svg
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   └── pwa-64x64.png
├── README.md
├── Reports_PPT
│   ├── Personalised mental health assistant app With AI-Powered chatbot-final.pptx
│   ├── Personalized Mental Health Assistant.docx
│   ├── Personalized Mental Health Assistant.pdf
│   ├── Questions.jsx
│   ├── questions.txt
│   └── Results.jsx
├── src
│   ├── api
│   │   ├── api.js
│   │   └── authApi.js
│   ├── App.jsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── auth
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── ForgottenPassword.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── PasswordResetConfirm.jsx
│   │   │   └── Register.jsx
│   │   ├── common
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   └── Logo.jsx
│   │   ├── container
│   │   │   └── Container.jsx
│   │   ├── Error.jsx
│   │   ├── Footer
│   │   │   └── Footer.jsx
│   │   ├── Header
│   │   │   ├── Header.jsx
│   │   │   ├── LogoutBtn.jsx
│   │   │   └── UserBadge.jsx
│   │   ├── index.js
│   │   └── routes
│   │       ├── About.jsx
│   │       ├── ChatBot.jsx
│   │       ├── Contact.jsx
│   │       ├── Home
│   │       │   ├── FeaturesSection.jsx
│   │       │   ├── HeroSection.jsx
│   │       │   ├── HowItWorksSection.jsx
│   │       │   └── TestimonialsSection.jsx
│   │       └── UserProfile.jsx
│   ├── conf
│   │   └── conf.js
│   ├── index.css
│   ├── main.jsx
│   ├── pages
│   │   ├── About.jsx
│   │   ├── ChatBot.jsx
│   │   ├── Contact.jsx
│   │   ├── Error.jsx
│   │   ├── ForgottenPassword.jsx
│   │   ├── Home.jsx
│   │   ├── index.js
│   │   ├── Login.jsx
│   │   ├── PasswordResetConfirm.jsx
│   │   ├── Register.jsx
│   │   └── UserProfile.jsx
│   └── store
│       ├── slices
│       │   └── authSlice.js
│       └── store.js
├── vercel.json
├── vite.config.js
└── .vscode
    ├── settings.json
    └── tasks.json

19 directories, 68 files
```


<!-- tree -a -I 'node_modules|.git' > README.mdx -->