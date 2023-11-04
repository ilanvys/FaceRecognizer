# Smart-Brain

**Smart-Brain** is a web application developed using React, part of the Zero to Mastery course. It's a simple face recognition app that allows users to detect faces in images provided by a URL. It also uses the Clarifai API for general image recognition, which provides a list of words describing the uploaded image.

## Features

- Face detection in images.
- General image recognition for image description.
- User registration and sign-in.
- Keeps track of the number of images processed.

## Getting Started

To get the **Smart-Brain** app up and running, you'll need both the front-end and the back-end:

### Front-End (This Repository)

Follow these steps to set up the front-end:

1. Clone this repository to your local system.
2. Navigate to the project's root directory.
3. Run `npm install` to install the project dependencies.
4. Create an environment file (`.env`) with your API keys and database connection information.
5. Start the app with `npm start`.
6. Open your web browser and access the app at the chosen port.

### Back-End (Node.js Server)

You'll also need the back-end server for the app, which is available in a separate repository:

- [SmartBrainAPI - Node.js Server](https://github.com/ilanvys/SmartBrainAPI)

Follow the instructions in the back-end repository to set up the server and ensure both the front-end and back-end are running simultaneously.

## Technologies Used

- [React](https://reactjs.org/)
- [Clarifai Face Detection API](https://www.clarifai.com/)
- [Clarifai General Image Recognition API](https://www.clarifai.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Contributors

- Ilan Vysokovsky

## Acknowledgments

- [Zero to Mastery](https://zerotomastery.io/)

## License

This project is open-source and available under the [MIT License](LICENSE).
