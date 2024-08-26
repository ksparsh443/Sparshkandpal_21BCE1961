# Sparshkandpal_21BCE1961
Turn-based Chess-like Game with Websocket Communication


This is my submission for the Advanced chess like game on HTML, CSS and JAVA Script

THe following code uses Socketio to establis a connection between server and client and then based on the logic for hero1, hero2, hero3, and pawns move the same.

Game Setup
The game is played between two players on a 5x5 grid.
Each player controls a team of 5 characters, which can include Pawns, Hero1, and Hero2.
Players arrange their characters on their respective starting rows at the beginning of the game



Running the game:

1. Open the Terminal
2. enter node i
3. Enter the command : node index.js
4. This is will run the programm on local host 3000 server 
5. Open two different Google chrome tabs and enter localhost:3000 in both
6. Enter your name and your friend name in the tabs respectively and start enjoying the game

or 

Using a Local HTTP Server: You can use a local server to serve your HTML and JavaScript files. Here are a few options:

Using http-server (Node.js Package):

bash
Copy code
npx http-server
This command will serve files in the current directory. Install http-server globally with npm install -g http-server if you want to use it without npx.

Using live-server (Node.js Package):

bash
Copy code
npx live-server
Similar to http-server, but with automatic browser refresh on file changes. Install it globally with npm install -g live-server.

Running a Development Server with Frameworks: If you’re using a framework like React, Vue, or Angular, you can use their respective CLI commands:

React (Create React App):

bash
Copy code
npm start
Vue (Vue CLI):

bash
Copy code
npm run serve
Angular (Angular CLI):

bash
Copy code
ng serve
Using a Browser-based Environment for Testing: If you need to test client-side JavaScript without a full server setup, you can use a browser-based tool or online service like:

CodePen, JSFiddle, or JSBin: These platforms allow you to write and test HTML, CSS, and JavaScript code in the browser.
Automated Testing: If you’re running automated tests that involve the DOM, you might use tools like:

Jest with jsdom: Jest runs tests in a simulated browser environment provided by jsdom.

bash
Copy code
npm test
Puppeteer: For end-to-end testing in a headless browser.

bash
Copy code
npx puppeteer
