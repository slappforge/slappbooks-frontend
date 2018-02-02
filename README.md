# slappbooks-frontend

Slappbooks is an accounting application developed to demonstrate the capabilities of Sigma IDE of SLAppForge.
This repository includes the front-end react application required to demonstrate the functionalities of 
the application. The repository which includes the backend lambda functions can be found at https://github.com/slappforge/slappbooks

## Getting Started 
These instructions will get you a copy of the project up and running for development and testing purposes.

In order to get started you will have to deploy the lambda application using the Sigma IDE of SLAppForge. You will be able to achieve this by following the steps mentioned in this [repository](https://github.com/slappforge/slappbooks). After you've deployed the lambda functions, navigate to the [API gateway of AWS](https://aws.amazon.com/api-gateway/) and find the end point URL of `slappbooksapi`.


### Prerequisites
You will need npm in order to build the react application. To install npm follow [this](https://docs.npmjs.com/getting-started/installing-node) guide.
You will also need to obtain the end point URL of `slappbooksapi` by following the instructions provided at the [slappbooks repo](https://github.com/slappforge/slappbooks).

### Deployment 
1. Install node modules 

    `npm install`
    
2. Compile SCSS to CSS 

    `npm run build-css`
    
3. Include the API URL in the `.env` file

    In the `.env` file find the following property `REACT_APP_API_HOST` and provide your API URL as `REACT_APP_API_HOST=https://my_host.amazonaws.com/Prod`
    
3. Start the application 
    
    `npm start`

## Authors
* **Malith Jayaweera**

## License
This project is licensed under the Apache License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
* Awesome SLAppForge team