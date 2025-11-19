# What's this project

This project is the result of a QA engineer Cypress assessment by Nicholas Sauer.
Check https://github.com/heex-technologies/shop-talk-cypress-instructions for details about the subject.

## Content

- `1_navigation.cy` - Finished
- `2_login_form.cy` - Finished
- `3_api_products_page.cy` - Almost Finished (retryBtn to test)
- `4_api_users_page.cy` - Empty
- `5_protected_routes_and_errors.cy` - Empty - partially tested in 1_navigation.cy
- `6_test_organization.cy` - Empty - (not an actual test file)
- `b1_contact_form.cy` - Empty
- `b2_posts_page.cy` - Empty

- `fixture` - folder containing mocked api body response
- `support/pages` - folder containing Page Objet
- `support/`- folder containing POM classes folder and other data files related to test

## How to run the tests

1. Download project and go in the project terminal 
2. Run "npm install"
3. Run "npx cypress open" to run tests with Cypress GUI or "npx cypress run" to run all tests and get results in terminal