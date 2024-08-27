

# Turn-Based Chess-like Game with WebSocket Communication

## Overview

This project is a turn-based chess-like game developed using HTML, CSS, and JavaScript. It utilizes Socket.io for real-time communication between the server and the client. Players control teams of characters on a 5x5 grid, with each player managing 5 characters including Pawns, Hero1, and Hero2.

## Game Setup

- **Grid:** 5x5
- **Players:** 2
- **Characters per Player:** 5 (including Pawns, Hero1, Hero2)
- **Objective:** Players arrange their characters on their respective starting rows and play the game using the movement rules defined for each character.

## Running the Game

### Local Server Setup

1. **Open Terminal**

2. **Initialize Node.js Project**
   ```bash
   npm init -y
   ```

3. **Install Dependencies**
   ```bash
   npm install ws socket.io
   ```

4. **Start the Server**
   ```bash
   node index.js
   ```
   This command will run the server on `localhost:3000`.

5. **Open the Game**
   - Open two different Google Chrome tabs.
   - Enter `localhost:3000` in both tabs.
   - Enter your name and your friend's name in each tab respectively.

### Using a Local HTTP Server

Alternatively, you can use a local HTTP server to serve your HTML and JavaScript files:

- **Using http-server (Node.js Package)**
  ```bash
  npx http-server
  ```
  - Install globally with: `npm install -g http-server`

- **Using live-server (Node.js Package)**
  ```bash
  npx live-server
  ```
  - Install globally with: `npm install -g live-server`

### Running a Development Server with Frameworks

If you’re using a framework like React, Vue, or Angular, you can use their respective CLI commands:

- **React (Create React App)**
  ```bash
  npm start
  ```

- **Vue (Vue CLI)**
  ```bash
  npm run serve
  ```

- **Angular (Angular CLI)**
  ```bash
  ng serve
  ```

### Browser-Based Environments for Testing

For client-side JavaScript testing without a full server setup, you can use:

- **CodePen, JSFiddle, or JSBin**: Write and test HTML, CSS, and JavaScript code directly in the browser.

### Automated Testing Tools

For automated tests involving the DOM, you might use:

- **Jest with jsdom**
  ```bash
  npm test
  ```

- **Puppeteer**
  ```bash
  npx puppeteer
  ```

## Notes

- Ensure you have Node.js installed to run the server.
- For production environments, consider additional security and performance enhancements.

