# About this project - Automated testing using Playwright

- The purpouse of this project was to showcase Playwrights capabilities and to get familiar with the tool (not to automate every scenario there is on the page).
- The web page that was used for automated testing is https://www.demoblaze.com/.
  - This web page has some basic web shop capabilities, such as products, categories, adding to cart, checkout, log in, sign up etc.

The project was divided into **4 phases**, each containing the concepts used in Playwright to automate web page behavior:

#### The First Phase

- The first phase covered some of the Basic test concepts, UI tests, Page Object Model, POM to fixture, and Visual regression.

#### The Second Phase

- The second phase consisted of writing Integration tests, API tests, and tests with Mocked data.

#### The Third Phase

- The third phase covered Authentication - login, Project dependencies, and enabling CI/CD using GH Actions.

#### The Fourth Phase

- The fourth phase was reserved for documentation writing and preparing the presentation to showcase the project.

## Folder and file structure

- In the root of the project we have:
  - _playwright.config.ts_ - where we have Playwright specific data and our projects set up.
  - _package.json_ - with our scripts and project dependencies
  - _package-lock.json_ - automatically generated
  - _LoginAuthCQ.ts_ - used to save the local storage data needed for authentication
  - _global-setup.ts_ - we use it to log us in once, and then reuse that data throughout the testing
  - _.gitignore_- to keep some of the sensitive data out of the remote repo
  - **.github/workflows** - our CI/CD pipeline
  - **pages** - where we store our selectors (POM)
  - **tests** - where all of our tests are located, including the fixtures and screenshots

This project consists of **31 automated test cases** from which **4 have .fixme annotation** due to the web page having bugs.

**NOTE:** All visual regression checks have been commented out due to few pixels always causing problems.
