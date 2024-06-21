
# Shopify Next.js Headless Storefront - React

Storefront built using own stack, using next.js as a front end framework. Shopify as a backend. This code utilizes storefront API to make the calls to the shopify.


## Getting Started

Get Started by installing the necessary dependencies required to run this project.

```javascript
npm install 
```
Generate .env.local in root folder and include following credentials.

```javascript
PUBLIC_STORE_DOMAIN = 'YOUR_STORE_DOMAIN'
PUBLIC_STOREFRONT_API_TOKEN = 'PUBLIC_STOREFRONT_TOKEN'
PRIVATE_STOREFRONT_API_TOKEN = 'PRIVATE_STOREFRONT_TOKEN'
```
To generate tokens, you will need to install headless channel in shopify admin and create a new project and give the necessary permissions to your project and copy the credentials you need.




## Run Locally

Clone the project

```bash
  git clone https://github.com/EssDeeJay/shopify-next-headless.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Features

- Dynamic Product & Collection Route
- Cart Context and Cart Drawer Support that updates instantly
- Featured Collections on homepage

I will be updating more features regularly as i make the progress. Please feel free to share feedback. The project currently is barebones and UI and components are not yet styled.


## Tech Stack

React, Next.js, TailwindCSS, @headlessui/react, Shopify, @shopify/hydrogen-react

