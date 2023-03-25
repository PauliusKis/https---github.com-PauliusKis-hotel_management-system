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

## Components

# Board.js
The Board component renders a board with the given children.

# RoomCards.js
The RoomCards component renders a list of room cards with information from the roomList JSON data file.

# GuestCards.js
The GuestCards component renders a list of guest cards with information passed in as a prop.

The GuestCards component requires the following parameters:
guests (array): A collection of guest objects to display in the guest cards. Each guest object must have the properties id, first name, last name, and job title.

# GuestSearch.js
The GuestSearch component  provides a search input for filtering guests.

'onFilter' (function, required): A callback function that is called with the search query string as a parameter whenever the value of the search input changes.

# index files
Separate files for component exports

## DATA

# guesList.js and roomList.js 
.json object arrays for room list and guest list

## App.js
This is a React app that uses drag and drop to move items between two columns: "Info" and "Guests." The "Guests" column displays a list of guests from a JSON file, and the "Info" column displays information about a particular room. The application also includes a search bar that allows the user to look for guests.

The 'useState' hook is used by the application to manage the state of the selected room and columns. The drag and drop functionality is also implemented using the react-beautiful-dnd library.

The 'onDragEnd' function is called when an item is dragged and dropped. If an item is moved to another column, the columns' states are updated, and if a room is selected, the state of the guests in the room is also updated in local storage.

The 'loadRoomGuests' function loads the guests in a room from local storage and updates the columns' states accordingly.

The 'handleRoomClick' function is called when a room is selected, this function is called, and it updates the state of the selected room as well as loads the guests in the room using the loadRoomGuests function.

The 'handleSearch' function is called when the user types in the search bar, and it filters the list of guests based on the search query and updates the state of the columns accordingly.

# TODO
Try to fix lagging  and uncaught error in web console.
App.js composition fix and style update

