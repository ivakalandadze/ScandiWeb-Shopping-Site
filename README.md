## Shopping-Site

A shopping site, which recieves all the data from the backend server at [https://github.com/scandiweb/junior-react-endpoint].

### Functionality :
- PLP - product listing page, a.k.a. category page
- PDP - product description page, a.k.a. product page
- Cart page + Cart overlay (minicart)

### Details:
- Ability to add/remove products and change their amounts in cart.
- For products that have various options (attributes) - the options can be selected.
- The selected options of added to cart products are visible in cart overlay and in cart page.
- If an attribute is a swatch attribute (type = swatch), a representation of the value is rendered on PDP and PLP.
- Filtering products by category name for all of the categories from BE
- The descriptions provided in HTML format are parsed and presented as HTML, not as plain text
- Ability to change the currency of the store to one of the available currencies

## Project Screen Shot(s)
![](images/Screenshot%201.png)


## Installation and Setup Instructions


Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Start Server:

`npm start`  

To Visit App:

`localhost:3000/`  

## Reflection 

This Project was writen from scratch in about 1 month (last 2 weeks very intensively). Products, currencies, prices, attributes etc. Everything you see from Categories to Product Colors is provided from backend and rendered accordingly, no backend change can damage the site.

Initially this Project was a test assignement, but I made some changes in deisgn. 

This is my first big Project and also first time using GrapQL(must say terrific tool)

At lastthe technologies implemented in this project are React, React-Router v6, JS, CSS. I chose to use the `create-react-app` boilerplate to minimize initial setup and invest more time in diving into weird technological rabbit holes. 
