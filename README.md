# EscrevaMe (WriteMe)
EscrevaMe(WriteMe) é a platform where users can register themselves, interacting with people from all over the world and promoting the dissemination of knowledge.

<img src="https://github.com/alessandroCidney/EscrevaMe/blob/master/src/assets/images/designs/design.jpg" />

## :computer: How does it work?

### Platform
With EscrevaMe(WriteMe), the user can register and share their essays/compositions, interacting with other users.

### Register (Sign Up)
Users can register themselves with the JoinUsPage component, choosing one of the Sign Up methods.

After registration, users are redirected to their user pages (UserPage component).

#### Details
- The system identifies valid and invalid e-mails, allowing the registration only with valid e-mails.
- The system identifies if the data entered is already being used. If the data entered is already being used by other users, registration will not be allowed.

### Sign In
Users can sign in and access the platform with the LoginPage component, choosing one of the Sign Up methods. 

After sign up, users are redirected to their user pages (UserPage component).

## :raising_hand: For developers

### Activate the project locally
To activate the project locally, download it and use `yarn start` command with the CMD.

The project will be inicialized. Access it at `http://localhost:5000`

## :wrench: planned features

### LoginPage
- :white_check_mark: Authentication with e-mail and password
- :white_circle: Authentication with Google
- :white_circle: Authentication with Twitter

### JoinUsPage
- :white_check_mark: Sign Up with e-mail and password
- :white_circle: Sign Up with Google
- :white_circle: Sign Up with Twitter
- :white_check_mark: Upload profile photo
- :white_circle: Upload description

### UserPage
- :white_check_mark: User data
- :white_check_mark: Profile photo
- :white_check_mark: Uploaded essays/compositions
- :white_check_mark: Highlight essays/compositions

### MainPage
- :white_check_mark: View essays/compositions
- :white_check_mark: View the latest registered users

### EssayPage
- :white_check_mark: Essay/composition title
- :white_check_mark: Essay/composition content
- :white_check_mark: Essay/composition author
- :white_check_mark: Evaluate the essay/composition
- :white_check_mark: Comments
- :white_check_mark: View comments

## :book: Pages

### LoginPage

<div align="center">
	<img src="https://github.com/alessandroCidney/EscrevaMe/blob/master/src/assets/images/pages/LoginPage.png" />
	<br />
</div>

### JoinUsPage

<div align="center">
	<img src="https://github.com/alessandroCidney/EscrevaMe/blob/master/src/assets/images/pages/JoinUsPage.png" />
	<br />
</div>

### UserPage

<div align="center">
	<img src="https://github.com/alessandroCidney/EscrevaMe/blob/master/src/assets/images/pages/UserPage.png" />
	<br />
</div>

### NewEssayPage

<div align="center">
	<img src="https://github.com/alessandroCidney/EscrevaMe/blob/master/src/assets/images/pages/NewEssayPage.png" />
	<br />
</div>

## :space_invader: Main dependencies
- React
- React Router DOM
- SASS
- React Hot Toast
- Firebase
- Firebase tools