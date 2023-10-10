# Coldrun API tests

This repository contains API tests. These tests are written in Type Script with Cypress framework. API tests covers:

- in file CreateTrucks.cy.js
  - POST /trucks
- in file EditTrucks.cy.js
  - PUT /trucks/{id}
- in file GetTrucks.cy.js
  - GET /trucks /trucks/{id}

## To execute tests its required to have installed node: https://nodejs.org/en/download/

## How to run API tests

- open terminal
- make sure you are in folder \Coldrun
- execute command `npm i` to install all necessary dependencies **_(only when executing for the first time)_**
- run comamnds:
  - `npm run run:all` -> to run all tests
  - `npm run run:post` -> to run only POST validation
  - `npm run run:put` -> to run only PUT validation
  - `npm run run:get` -> to run only GET validation
