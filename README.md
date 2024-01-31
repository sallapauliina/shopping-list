# Introduction

"Shared shopping List" is an application which allows users to create shopping lists, add items to these lists, mark items as collected, and maintain a record of active and inactive lists. The application has a three-tier architecture, dividing the functionality into views, controllers, and services, with a backend database.

## Application features

Main Page
Access: Available at http://localhost:7777.
Functionality: Displays the title "Shared Shopping Lists", application statistics, and a link to the shopping lists page.

Shopping Lists
Management: Users can add new shopping lists and view existing ones at /lists.
List Addition: Adding a new list is done via a POST request with list name.
List Deactivation: Each list can be deactivated through a corresponding button.

Spesific Shopping Lists
Viewing Lists: Access individual lists at /lists/{id}.
Item Management: Add items to lists and mark items as collected.
Ordering: Items are displayed in alphabetical order, separating uncollected and collected items.

Statistics
Display: The main page shows the number of shopping lists and items, including both active and inactive lists and collected and uncollected items.
No List Scenario: Displays "No shopping lists yet." if no lists are found.

## Running the application locally

1. Ensure Docker Compose is installed on your system.
2. Unzip the project file.
3. Navigate to the root folder "shared-shopping-list" where docker-compose.yml is located.
4. Run docker-compose up --build to start the application.
5. If you don't use a MacOS you need to do this change in the Dockerfile: change the FROM lukechannings/deno:v1.29.2 line to the FROM denoland/deno:alpine-1.29.2. Also, add in the docker-compose.yml this line: platform: linux/arm64/v8.
6. Access the application at http://localhost:7777.

## Automated Tests

The project includes five end-to-end tests for application functionality. The tests are under the e2e-playwright folder that has a folder tests and in there is a file called shopping-list.spec.js. Use the "command docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf to run" to run the tests.

## Online Deployment

The application is deployed online with the URL: https://wsd-course-project-i-0627.onrender.com/
