# fantastic-july-fishdeploy
Deploying an express application
# Backend Connection Setup for Aazhi-fishes

This guide will walk you through setting up the backend connection for the Aazhi_fishes project.

## Prerequisites

- Node.js installed on your machine. You can download it from [here](https://nodejs.org/](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)).
- MySQL installed on your machine. You can download it from [here](https://www.mysql.com/](https://dev.mysql.com/doc/refman/8.3/en/windows-installation.html)).


## Installation

1. Install MySQL package:
    ```bash
    npm install mysql
    ```

2. Change directory to backend:
    ```bash
    cd /Users/jjaisankar/draft/aazhi-fishes/backend
    ```

3. Install Express package:
    ```bash
    npm install express
    ```

4. Install CORS package:
    ```bash
    npm install cors
    ```

5. Install MySQL latest version:
    ```bash
    npm install mysql@latest
    ```

## Setting up MySQL

1. Access MySQL command line:
    ```bash
    mysql -u root -p
    ```

2. Enter your MySQL password when prompted.

3. Alter user authentication method:
    ```sql
    ALTER USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
    ```

## Running the Backend

1. Start the backend server:
    ```bash
    node app.js
    ```

2. Your backend server should now be running and ready to accept connections.

## Additional Notes

- Make sure your MySQL server is running before starting the backend server.
- Update the MySQL user, password, and database configurations in `app.js` file if necessary.
