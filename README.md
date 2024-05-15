## Table of Contents

- [Run/Build the application ](#run/build-the-application)
- [Coding standards ](#coding-standards)
- [Project Structure](#project-structure)

## Run/Build the application

- Create a .env.local file in project root directory and copy the contents of .env to .env.local file.
- Open terminal window and install npm dependencies by running `npm install`
- Start the application in dev mode by running `npm start` the application will start in a new browser window at
  `localhost:3000`
- To build the project run `npm run build`. The build files will generate inside `\build` directory at project root.

## Coding standards

Following are the coding standards that one must follow while working on this boilerplate.

- Mandatory to follow AirBnB [AirBnB coding standards](https://github.com/airbnb/javascript/blob/master/README.md)

- JS Linting before every commit `npm run lint`.

- Do not modify linter rules without consulting.

- ES6 use destructor pattern wherever possible and use ES6 as a standard everywhere possible

- All external url’s and configurations should be env based.

- All api responses should be wrapped and referenced in the frontend

- Have discussion before putting stuff to redux store keep a store document do not overuse REDUX.

- Do not mix and match local state and redux state keep a single source fo truth.

- Use containerized and clean architecture.

- Consult before installing any new npm packages.

- Use only camelCase variable names do not mix with underscore names, For constants name use uppercase and underscore.

- Avoid using and 3rd party css library and based on timelines avoid even using any component library. MUI is fine based
  on the use case.

- Strictly follow BEM css/scss standards for all styles.

- File naming conventions
  - Containers should be named as `.container.tsx`
  - Components should be named as `.component.tsx`
  - Services should be named as `.service.ts`

## Project Structure

The enitre applcation code and logic should be inside `/src` dir

- Directory structure of `/src`
  > /assets

> /components

> /environments

> /app

> /services

> /store

- All the images, icons, fonts and external assets should be kept inside `/assets` directory.

- Application level shared component should be written inside `/components` directory.

- Different enviornment configurations `['dev', 'qa', 'prod']` should be kept inside `/environments` directory in their
  respective files and env should be loaded from `.env` file. See the example in the boilerplate.

- All the API calls in your app should be added `/services` directory. **_Component should never directly make an API
  call instead it should load the respective service and handle HTTP requests_**.
- Redux reducers import and store configurations should be added in `/store` directory.
