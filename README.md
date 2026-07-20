## Project Overview

`react-app-create-with-claude` is the React/TypeScript frontend for a claims-management application. It is bootstrapped with Create React App and communicates with a separate backend API.

## functionalities

The application contains different screens :
- a dashboard divided in 4 columns (one for each status) to consult each claim and modify its status. Claims are stored in a column (depending on it's status) as a card component.
- a statistic page where you can consult the number of claims for each season

Each card can be clicked on to open a page wich summarize the claim's information.

## Technology

React application and Typescript to valid types (use tsx extension).
API call use Axios (latest safe version).
CSS should be write in scss extension.
Use react-router-dom for routing.
Use Toastify library to notification.

## Color rules

background-color: #f3f3f3;
main-color: #66a6ff;
secondary-color: #ff769b;
black: #333333;
white: #ffffff;
grey: #7b7b7b;
grey-light: #aaaaaa;
grey-very-light: #c8c8c8;
grey-extremely-light: rgba(220, 220, 220, 1);
success: #59deaf;
error: #ff8080;
warning: #ffce73;
error-background: rgb(246, 111, 102, 0.2);


mise-a-jour: rgba(102, 166, 255, 0.6);
referencement: rgba(235, 198, 23, 0.6);
correctif: rgba(255, 118, 155, 0.6);
refonte: rgba(36, 148, 114, 0.6);
edi: rgba(237, 113, 2, 0.6);
non-facture: rgba(51, 51, 51, 0.6);


background-manager: var(--secondary-color);
color-manager: var(--white);
background-expert: #3be8c1;
color-expert: var(--white);
background-estimateur: linear-gradient(135deg, #ffc617, #f8de5f);
color-estimateur: var(--white);
background-referenceur: linear-gradient(135deg, #66a6ff, #76ccff);
color-referenceur: var(--white);

## Font

"Roboto", sans-serif

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
