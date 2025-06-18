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

<br>


<!-- ABOUT THE PROJECT -->
## About The Project

SpanishDex is a flashcards web application. This application is built specifically for Spanish learners as a place to store and practice new vocabulary words. It uses a spaced repetition algorithm to remind users to practice their vocabulary, allowing learners to retain Spanish words longer.

### Technologies

- **Next.js**
- **Bootstrap**
- **MongoDB**
- **Auth.js** for authentication
- **Sendgrid** for email sending functions
- **Sentry** for tracking errors

### Interactive Prototype!

I created a Figma prototype for SpanishDex. It is high-quality, and I put a lot of effort into making it interactive. Check it out!

[Figma Prototype](https://www.figma.com/proto/3fpV6gGIeCu5xWYL131f1m/SpanishDex?page-id=0%3A1&node-id=250-2232&viewport=-1967%2C-1489%2C0.67&t=bLKmcf5kulxvsmxj-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=250%3A2232&show-proto-sidebar=1&hide-ui=1)

### Project Features
 - Vocabulary Organization
   - Users create decks to store their vocabulary.
   - Then users add vocabulary to their decks.
   - Each deck has a title and a description and displays the cards it contains.
   - Users are able to edit their decks and vocabulary they contain.
 - Vocabulary Practicing
   - Users practice their vocabulary like flashcards.
   - You can start a practice session by clicking on buttons found on the dashboard and on each individual deck page.
   - After completing a practice, users are shown a summary of their results.
 - Authentication
   - Users create accounts so they can practice their vocubulary from any device.
   - The authentication method is flexible. You can either choose the username/password option or Google OAuth.
   - Users are able to reset their password, too, if they ever forget it.
   - This application includes an account page where users can change their username, email, password and profile picture, and delete their account.
 - Spaced Repetition Learning Algorithm
   - When users practice a vocabulary word, they provide feedback on how well they did at remembering that word.
   - These results are used to determine when a user should practice that word again.
   - When a vocabulary word is due for practice, it is marked as "weak".
   - Users are given the option to practice just the "weak" words from their decks.
   - (**See More Details in Section Below**)


### Spaced Repetition Algorithm
This application uses a spaced repetition algorithm to determine when a word is considered "weak" or, in other words, needs to be practiced.
When a user is practicing flashcards, SpanishDex asks the user, on a scale from 1 to 5, how well they did in guessing the definition of the word. SpanishDex uses this information to determine when the word should be practiced again.
</br></br>
Other factors used to determine this include:
- The score history for the card (how hard/easy the card has been to guess)
- The last time the card was practiced
- How late or early the card was practiced.


<br>

<!-- GETTING STARTED -->
## Install Locally

If you want to get a local copy of this project up and running, follow these example steps.

### Prerequisites

#### NPM
To run this locally, you will first need npm.
Run this command to verify its installation:
  ```sh
  npm -v
  ```

#### MongoDB
You will need MongoDB to run this app correctly.
You have two options:
 1. Install MongoDB locally. [Download MongoDB](https://www.mongodb.com/try/download/community). Follow [this guide](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/#run-mongodb-community-edition-as-a-windows-service) for more information.
 2. Use MongoDB Atlas. [Get Atlas](https://www.mongodb.com/products/platform/atlas-database?tck=docs_mongosh)

#### Sendgrid (optional)
If you want this app to be able to send emails (password reset emails), you will first need a Sendgrid account. [https://sendgrid.com/](https://sendgrid.com/) Then, you will need to create an API key (you will use this later).

#### Google OAuth (optional)
In order to sign in or sign up with Google OAuth, you will need to set up OAuth in your Google Developers Console. [http://console.developers.google.com/](http://console.developers.google.com/). You can follow [this article](https://blog.rebex.net/howto-register-gmail-oauth) to set it up or find a different one that works better for you. The important details are the **client ID** and **client secret** which you will get once you've set up OAuth. You will need these two pieces of information later.

#### Vercel Blob Store (optional)
This application uses Vercel's Blob Store to store users' profile pictures. If you do not choose to set this up, it will simply prevent users from uploading their own profile pictures. <br />
To set up Vercel Blob Store, first sign up for a Vercel account. Then create a project and set up Blob Store for the project's storage option.<br /> Documentation: [https://vercel.com/docs/storage/vercel-blob](https://vercel.com/docs/storage/vercel-blob)

#### Sentry
This application uses Sentry for error monitoring. The Sentry npm package will be installed, and there are several Sentry files included in this repository. If you don't want to use Sentry, you'll have to remove Sentry-specific code from next.config.mjs, and you can remove the other Sentry files. If you want to use Sentry, you will need an account. It is very simple to set up, though, as it only requires you to run a command and follow the prompts. Visit their website for more information: [https://sentry.io/](https://sentry.io/)



### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/JakinCS/SpanishDex.git
   ```
2. Switch to the correct directory by running:
   ```
   cd .\SpanishDex\
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Add environment variables
   - Create a ```.env.local``` file in the root directory of the application.
   - Add the **MONGODB_URI** environment variable. Set it equal to mongodb://localhost:27017 (using the default port) if you are running MongoDB locally.
     ```
     mongodb://localhost:27017
     ```
     If you are using MongoDB Altas, set it equal to the connection URI (this is found in the connection instructions for the database cluster). It will look like this:
     ```
     mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.<appId>.mongodb.net/<DBNAME>?retryWrites=true&w=majority
     ```
   - Add the **APP_URL** environment variable. Set it equal to the URL from which the application is run. For a local installation it is simply: ```http://localhost:3000```
   - Add the **AUTH_SECRET** environment variable. Set it equal to a random value.
     You can generate it with this command: ```openssl rand -base64 32```, or use this link: [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)
   - Add the **AUTH_TRUST_HOST** environment variable. Set it equal to 'true'. This variable will ensure that Auth.js works with builds on localhost
   - Add the **SENDGRID_API_KEY** environment variable (optional). If you created a Sendgrid account, set this equal to the API key you created earlier.
   - Add the **CONTACT_EMAIL** environment variable (optional). Again, this is only applicable if you set up Sendgrid. Set this variable equal to your email. This email will be the receiving email of any messages sent through the contact form on the homepage or contact modal.
   - Add the **AUTH_GOOGLE_ID** environment variable (optional). If you decided to set up Google OAuth, then you will need to put the client ID here.
   - Add the **AUTH_GOOGLE_SECRET** environment variable (optional). Set this equal to the Google OAuth client secret.
   - Add the **BLOB_READ_WRITE_TOKEN** environment variable (optional). This variable is necessary if you want to set up Vercel Blob Store to store profile pictures. You should be able to find the value for this environment variable during the setup process for Vercel Blob Store.
5. Run the application
   ```sh
   npm run dev
   ```

<br>

<!-- USAGE EXAMPLES -->
## Usage

Navigate to [spanishdex.vercel.app](https://spanishdex.vercel.app) to use the production version of the application on the web.
<br/>
If you are running this application locally, navigate to [localhost:3000](http://localhost:3000) (or similar).



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

* [Article - Learning about writing spaced repetition algorithms](https://freshcardsapp.com/srs/write-your-own-algorithm.html)
* [Spaced Repetition Algorithm - Based on FC-3](https://freshcardsapp.com/srs/simulator/#result-2)
* [Next.js Tutorial](https://www.youtube.com/watch?v=Zq5fmkH0T78)
* [MongoDB Indexing Best Practices](https://www.mongodb.com/blog/post/performance-best-practices-indexing)
* [README Template by Othneil Drew](https://github.com/othneildrew/Best-README-Template)



