# Todo App

A simple todo app built with HTML, CSS and JavaScript that uses json-server as an API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your computer.

You will also need to have [json-server](https://github.com/typicode/json-server) installed globally. You can install it by running the following command:

```
npm install -g json-server
```

### Installing

1. Clone the repository and navigate to the project directory:
```
git clone https://github.com/your-username/todo-app.git
cd todo-app
```
2. Install the dependencies:
```
npm install
```
3. Start the json-server:
```
json-server --watch data/db.json
```
This will start the json-server on port 3000 and will use the `db.json` file as the database.
