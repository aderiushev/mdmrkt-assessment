# GitHub Explorer

GitHub Explorer is a web application that allows users to browse issues in the React repository with pagination and view details of a particular issue along with its comments.

## Requirements
- Node JS >= v18.20.4
- npm >= v10.7.0

## Installation

Follow these steps to set up and run the application:

1. **Clone the repository:**

```
git clone git@github.com:aderiushev/mdmrkt-assessment.git
cd mdmrkt-assessment
````

2. **Generate a GitHub Personal Access Token:**

- Go to GitHub Settings.
- Click on "Generate new token".
- Select the scopes you need (e.g., repo).
- Generate the token and copy it.
- Create a .env file:  Create a .env file in the root directory of the project and add your GitHub token:
```
GITHUB_TOKEN=your_personal_access_token
```
- Install the dependencies:
```
npm install
```
- Run the development server:  
```
npm run dev
```
- Open the application:  Open http://localhost:3000 in your browser to see the application.  

You can also run the application in production mode:
```
npm run build
npm start
```

3. **Usage**

- Search Form:  
   On the home page, you will see a search form.
   Enter a search term and select the issue status (Open or Closed).
   Click the "Search" button to browse issues in the React repository.

- Browse Issues:  
   
   The search results will display a list of issues with pagination.
   Click on an issue to navigate to the details page.

- View Issue Details:  
   On the issue details page, you can see the issue title, body, and comments.
   Use the "Back" button to return to the search results.
     
Enjoy exploring GitHub issues with GitHub Explorer!

4. **Testing**

- Run unit tests:  
```
npm test
```

- Run e2e tests:
```
npm run e2e
```
