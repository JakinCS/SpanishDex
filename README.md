<!-- Title of the Project -->
# SpanishDex Flashcards Web Application

<br>

<figure>
 <p>
  <img src="ProductScreenshot.jpg" alt="Logo">
  <i>SpanishDex Dashboard</i>
 </p>
</figure>

<br>
 
⚠️ **Notice**: This application is still currently in the development phase. See the [Figma Prototype](https://www.figma.com/proto/3fpV6gGIeCu5xWYL131f1m/SpanishDex?node-id=526-6854&node-type=canvas&viewport=255%2C203%2C0.3&t=Zm7Bkl52VzJ6oVi6-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=526%3A6854) to get a glimpse at what's to come.

<br>




<!-- ABOUT THE PROJECT -->
## About The Project

SpanishDex is a flashcards web application. This application is built specifically for Spanish learners as a place to store and practice new vocabulary words. It uses a spaced learning algorithm to remind users to practice their vocabulary, allowing learners to retain Spanish words longer.

### Built With

- **Next.js**
- **Bootstrap**
- **MongoDB**

### Interactive Prototype!

This application is still in the development phase. If you want to see what the application will look like, please take a look at the prototype.
I created the prototype in Figma. It is high-quality, and I put a lot of effort into making it *interactive*. Check it out!

[Figma Prototype](https://www.figma.com/proto/3fpV6gGIeCu5xWYL131f1m/SpanishDex?node-id=526-5542&node-type=canvas&viewport=255%2C203%2C0.3&t=Zm7Bkl52VzJ6oVi6-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=526%3A6854)

### Project Vision (features)
 - Have a homepage describing the purpose of the application and pointing the user to sign up or log in.
 - Give the users and option to contact the website owner with a form right on the homepage.
 - Provide two sign up or log in options:
   - Authenticate with a username and password.
   - Authenticate with Google OAuth.
 - Allow the users to reset their password if they forgot. 
 - Have a dashboard with a list of the user's flashcard decks along with some statistics
 - Ability to create flashcards and make decks to store the flashcards
 - Have a page for each flashcard deck. This pages lists the flashcards in the deck and gives the user the option to listen to the Spanish word's pronunciation
 - Be able to edit and delete flashcards and decks
 - Allow the user to practice flashcards:
   - They could practice all their weak words contained in all their decks. (Weak words are determined by a spaced repetition algorithm. More details below)
   - They could practice all the weak words of an individual deck.
   - They could aslo practice all the words of an individual deck.
 - Have an account page where the user can edit their username, email, password and profile picture.

### Project Status (completed features)
 - The homepage is fully completed except for the functionality of the contact form.
 - Authentication is implemented
   - I used Auth.js for authentication, implementing the Credentials and OAuth providers
   - User accounts are stored in MongoDB
   - Users can log out and log in seamlessly.
 - Users can now reset their password.
   - First they enter their email into a form.
   - An email is sent to their inbox with a link that is used to reset their password.
   - I used Sendgrid to send emails.

### Spaced Learning Algorithm
This application will use a spaced learning algorithm to determine when a word is considered "weak" or, in other words, needs to be practiced.
When a user is practicing flashcards, SpanishDex asks the user, on a scale from 1 to 5, how well they did in guessing the definition of the word. SpanishDex uses this information to determine when the word should be practiced again.
</br></br>
Other factors used to determine this include:
- The score history for the card
- The last time the card was practiced
- Whether the word was practiced on time or not


<br>

<!-- GETTING STARTED -->
## Install Locally

If you want to get a local copy of this project up and running, follow these example steps.

### Prerequisites

To run this locally, you will first need npm.
Run this command to verify its installation:
  ```sh
  npm -v
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/JakinCS/SpanishDex.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the application
   ```sh
   npm run dev
   ```

<br>

<!-- USAGE EXAMPLES -->
## Usage

Content yet to come for this section



<br>

<!-- CONTRIBUTING -->
## Contributing

This project is open source. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. Otherwise, you can simply open an issue and tag it with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git switch -c feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Added an improvement'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request


<br>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.


<br>

<!-- CONTACT -->
## Contact

Jakin Stahl - [LinkedIn](https://www.linkedin.com/in/jakinstahl/) - jakinstahl@gmail.com

Project Link: [github.com/JakinCS/SpanishDex](https://github.com/JakinCS/SpanishDex)


<br>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Article - Spaced Repetition Algorithm](https://freshcardsapp.com/srs/write-your-own-algorithm.html)
* [README Template by Othneil Drew](https://github.com/othneildrew/Best-README-Template)



