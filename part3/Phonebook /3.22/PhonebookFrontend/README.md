# Phonebook Frontend

1. Connect frontend with backend const baseUrl = 'http://localhost:3001/api/persons' in services/ persons.jsx
2. Blocked by CORS error;same-origin policy required; 3001 & 5173 don't have same origin 
3. Installation of Node's cors middleware.npm install cors in the backend
4. const cors = require('cors')
   app.use(cors()) -> in index.js /Backend
5.The react app running in the browser now fetches the data from node/express-server that runs in localhost:3001.


# 3.10 Phonebook backend step 10


Deploy the backend to the internet, for example to Fly.io or Render. If you are using Fly.io the commands should be run in the root directory of the backend (that is, in the same directory where the backend package.json is).

PRO TIP: When you deploy your application to Internet, it is worth it to at least in the beginning keep an eye on the logs of the application AT ALL TIMES.

Test the deployed backend with a browser and Postman or VS Code REST client to ensure it works.

Create a README.md at the root of your repository, and add a link to your online application to it.


1. const PORT = process.env.PORT || 3001 in index.js -> for both Saas
2. Upload backend to Render.
3. Upload to Git 
4. Upload to Render 