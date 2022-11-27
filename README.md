# Web Calculator

A simple web application made with angular as a frontend and spring boot for backend.

## How to run

Open the angular CLI.
Navigate to the `Calculator_FrontEnd` directory.
Run `ng serve` for a dev server.
Navigate to `http://localhost:4200/`. (The application will automatically reload if you change any of the source files)

Open the `Calculator_BackEnd` project file in any ide.
Run the `main` function in `CalculatorBackEndApplication.java`.

## Features

All arithmetic operations are carried out on the backend server.

Performs basic arithmetic operations (+, -, * and /) and some basic functions (squaring, taking the square root, evaluating percentage and inversing) for both positive and negative numbers with double precision.

Different operations can be carried out without the need of pressing the equal button. (for example, pressing '2' '+' '3' and then pressing '-' will display 5 on the screen and initiate a new subtraction operation) (the exact same functionality of the windows calculator)

Has a second mini-display to show the on-going operation.

If an error occures, the main display will show a message that provides the user with the type of error. (ie. out of bounds, division by zero, square root of negative numbers, ...)