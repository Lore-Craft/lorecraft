# About

LoreCraft is an innovative app that leverages the power of GPT-3 and AI imaging to provide users with a seamless experience in creating unique characters and their backstories instantly. Crafted with React.js, it integrates various components to streamline the process of character creation, letting users delve deeper into the realm of creativity.

## Live Demo
Currently hosted on Netlify - <a href="https://lorecraft.netlify.app/">Link</a>

### Version
Current version: v1.0

## Screenshots
<img style="width:400px;" src="https://i.ibb.co/mNQtVGg/Screen-Shot-2023-09-14-at-10-19-46-AM.png"> <img style="width:400px;" src="https://i.ibb.co/3RFBBhc/Screen-Shot-2023-09-14-at-10-21-04-AM.png">
## Features

### Instant Character Creation
Harness the power of AI to instantly generate characters with rich backstories and visuals.

### Intuitive UI
Experience a user-friendly interface designed to facilitate creativity and imagination.

### Secure Authentication
Utilize the secure Auth0 authentication system to protect your data and creations.

## Installation

To get started with LoreCraft, follow these steps:

1. Clone the repository

> `git clone <repository_url>`

2. Navigate to the project directory

> `cd lorecraft`

3. Install the necessary packages

> `npm install`

4. Run the app

> `npm start`


## Technology Stack

- **React.js**: The frontend is developed using the robust and popular React.js library.
- **Auth0**: Integrated for secure user authentication and data protection.
- **ChatGPT**: Utilized for generating character backstories using natural language processing.
- **AI Imaging**: Employed to create visual representations of the generated characters.

## App Structure

Here is a brief overview of the main components of the app:

- **About**: A component displaying detailed information about LoreCraft.
- **CreateNew**: The core component where users can create new characters and backstories.
- **Creations**: A section where users can view and manage their created characters.
- **LoggedinComponent**: A component that handles functionalities available to logged-in users.
- **App.css**: The stylesheet containing styles for the app.
- **React Router**: Used to manage the routing of the app, facilitating smooth navigation between components.

## Usage

Navigate through the app using the following routes:

- `/about`: Learn more about LoreCraft.
- `/createnew`: Dive into the creation process and start crafting your characters.
- `/creations`: View and manage your repository of created characters.

## Data Required
- Character name: charName: { type: String, required: true }
- Character vlass: classType: { type: String, required: true },
- Character alignment: { type: String, required: true },
- Character race: {type: String, required: true},
- Character's gender: { type: String, required: true },
- URL of image (AI generated): imageURL: { type: String, required: true },
- Character backstory (AI generated): { type: String, required: true },
- Your email (same as your login details): userEmail: { type: String, required: true}


## Contributing

We welcome contributions to LoreCraft. Before contributing, please read through our contributing guidelines (link to the guidelines).

## License

Include details about the license here (e.g., MIT, GPL).

## Contact

- [Ekaterina]()
- [Nika]()
- [Paul]()



