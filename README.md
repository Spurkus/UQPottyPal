# ✨ UQPottyPal 🚽

UQPottyPal is your go-to companion for finding and reviewing public restrooms on and around the University of Queensland campus. Whether you're a student, staff member, or visitor, UQPottyPal helps you locate the cleanest and most accessible restrooms nearby.

![Image of website](https://i.imgur.com/g1j34IW.png)

## 🔧 Advanced Feature

For the advanced feature, I chose to choose the map with markers.

> Add a map option for Homescreen display (i.e. add a map option in the project.homescreen dropdown). This will display the location markers on a map on the Homescreen in the Preview.

![Image of website](https://i.imgur.com/QLu3yqM.png)

## 📝 Instructions and Backend API

For the web app to work, clone this repository and utilise a `.env.local` file:

```
# ------------------------------ Firebase Config ----------------------------- #
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# ------------------------------- Mapbox Config ------------------------------ #
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=
NEXT_PUBLIC_MAPBOX_STYLE=
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤖 AI Referencing

ChatGPT 4o was used to create docstrings. After being created, if they were incorrect, the docstrings would be edited to fit the function/component it was referencing.

## 💪 Tech Stack

- [**NextJS**](https://nextjs.org/) as the React Framework
- [**TypeScript**](https://www.typescriptlang.org/) as the programming language
- [**Tailwind CSS**](https://tailwindcss.com/) with [**DaisyUI**](https://daisyui.com/) as the component library and styling
- [**Firebase**](https://firebase.google.com/) as the backend for a RESTful API for the data
- [**MaxBoxGL**](https://www.mapbox.com/) as the library for building web maps and location markers
- [**TipTap**](https://tiptap.dev/) as the WYSIWYG text editor
- [**React QR Code**](https://www.npmjs.com/package/react-qr-code) to create QR codes for each toilet id
- [**Canvas Confetti**](https://www.npmjs.com/package/canvas-confetti) to create a touch of love and happiness in this world of dispair... and to add confetti after successfully creating a review
