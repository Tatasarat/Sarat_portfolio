# Sarat's Portfolio

React (Vite) frontend and Node.js (Express) backend.

## Run locally

Terminal 1:

    cd server
    npm install
    npm start

Terminal 2:

    cd client
    npm install
    npm run dev

Open http://localhost:5173. Contact messages from the form are saved to `server/messages.json`.

## Deploy

- Backend: deploy `server/` to Render as a Web Service (build `npm install`, start `npm start`). Set `ALLOWED_ORIGIN` to your frontend URL.
- Frontend: deploy `client/` to Vercel or Netlify. Set `VITE_API_URL` to the backend URL.

## Edit your content

Projects, certificates, skills and journey live at the top of `client/src/App.jsx`. Add live-site links in the `live` field of each project. Replace `client/public/certificate.jpg` to change the certificate image.
