# Keylogger

The keylogger is a program that records the keystrokes of the user. 
It is a very useful tool for security purposes. 
It is very easy to use and very powerful.

## Implementation

- In this project, the keylogger is implemented using a client-server architecture.
- In the client side, the Python program uses `pynput` module to record keystrokes of the user. These keystrokes are stored in a file.
- The client sends the keystrokes recorded in the file to the server using POST API request every 10 seconds. Every 10 seconds, the file is cleared.
- The server uses Node.js and Express.js to create the API endpoints and for hosting the local server on a port.
- The Keystrokes are stored in a NoSQL database called MongoDB.
- The frontend is written using HTML, CSS and Javascript and it queries data from the API(user data and recorded keystrokes of the user) and displys in the frontend.

## Libraries used

- **pynput** - To record the keystrokes
- **node** - To host the backend server
- **express** - Node.js framework
- **mongoose** - MongoDB data storage