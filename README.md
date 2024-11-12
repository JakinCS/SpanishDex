<!-- Title of the Project -->
# SpanishDex Flashcards Web Application

<br>
 
 **Notice**: This application is still currently in the development phase.

<br>

<!-- ABOUT THE PROJECT -->
## About The Project

SpanishDex is a flashcards web application. This application is built specifically for Spanish learners as a place to store and practice new vocabulary words. It uses a space learning algorithm to remind users to practice their vocabulary, allowing learners to retain Spanish words longer.

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- **React**
- **JavaScript**
- **Bootstrap**

### Features
- Creating flashcards and creating decks to store flashcards.
- Editing and deleting flashcards and decks.
- Practicing flashcards, which includes being able to:
  - Practice all weak words. (Weak words are determined by a spaced repetition algorithm. More details below)
  - Practice weak words in a deck.
  - Practice all words in a deck.
- Listening to pronunciation of Spanish words, available when practicing and viewing the cards in the deck.
- User login functionality for persistence of user activity.

### Spaced Learning Algorithm
This application uses a spaced learning algorithm to determine when a word is considered "weak" or, in other words, needs to be practiced.
When a user is practicing flashcards, SpanishDex asks the user, on a scale from 1 to 5, how well they did in guessing the definition of the word. SpanishDex uses this information to determine when the word should be practiced again.
</br></br>
Other factors used to determine this include:
- The score history for the card
- The last time the card was practiced
- Whether the word was practiced on time or not


<br>

<!-- GETTING STARTED -->
## Install Locally

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

To run this locally, you will first need npm.
Run this command to verify its installation:
  ```sh
  npm -v
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

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

Project Link: [https://github.com/JakinCS/SpanishDex](https://github.com/JakinCS/SpanishDex)


<br>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Article - Spaced Repetition Algorithm](https://freshcardsapp.com/srs/write-your-own-algorithm.html)
* [README Template by Othneil Drew](https://github.com/othneildrew/Best-README-Template)



