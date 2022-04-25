## Story of application:
- Users may sign in to play this mobile Flappy Bird inspired game in which a bird jumps through obstacles on the screen in order to avoid collisions with easy, medium, and hard difficulty levels.

#### Purpose of project:
To complete a Flatiron School Phase 5 project that met the following requirements:
- Backend must include:
    - Auth
    - At least one has_many_through relationship
    - Seeds from a data set
    - At least one custom route
    - Custom controller/model methods
    - Basic database query optimizations
    - One significant refactor
    - Validation
- Frontend must include:
    - Auth
    - Custom CSS
    - One significant refactor

#### User will be able to:
- view the login or signup page on initially opening the app
- login or signup in order to choose difficulty level
- choose difficulty level in order to enter gameplay
- play game by clicking anywhere on the mobile screen to enable the bird to jump and avoid obstacles
- view their play-through score and previous 3 highscores on gameover
- restart game on gameover
- choose a different level on gameover

#### Challenges faced:
- learning React Native
- viewing application performance on different types of devices
- game logic configuration

#### Future implementation:
- enable multiplayer functionality while learning websockets

## Technologies
- React Native, HTML, CSS, Expo, Ruby, ActiveRecord, BCrypt, Heroku

## Installation
Backend is deployed on Heroku

Run `bundle install` to install backend packages and dependancies

Run `npm install --prefix flappy-bird-rn` to install frontend packages and dependancies

Run `npm start --prefix flappy-bird-rn` to start client side server on Expo

Follow the Expo prompts (such as clicking `i` for ios or `a` for android) to open mobile simulators. Opening simulators requires XCode installation.

On mobile, scan Expo QR code to open the application with the Expo Go app. Opening Expo Go requires installation of Expo Go app on mobile.

## Usage
- login and signup should authenticate and validate user input before rendering difficulty level page
- if user input is invalid on login or signup, error messages should appear
- easy, medium, and hard difficulty levels should render the obstacle movement speed every 45ms, 30ms, and 15ms respectively
- clicking anywhere on mobile screen should trigger the bird item to jump
- score should be calculated based on how many obstacles bird has passed
- any bird collision with obstacles should render the gameover screen
- gameover screen should render user playthrough score, previous highscores, restart button, and choose level button
- restart button should restart another playthrough round of the previous level played without user needing to re-login/sign-up
- choose level button should render the difficulty levels page to enable a new playthrough of the chosen difficulty level without user needing to re-login/sign-up

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
All resources used were from open source libraries or free downloads. This application was created with inspiration from the Flappy Bird game developed for mobile by Dong Nguyen and .Gears. Inital game logic was built by following Ania Kubów's "Flappy Bird in React Native" [video](https://www.youtube.com/watch?v=dhpjjAxKbHE&t=343s&ab_channel=CodewithAniaKub%C3%B3w) on Youtube.

