const email_template = (url) => {

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset SpanishDex Password</title>
        <style>
          * {
            margin: 0;
          }
          body {
            background-color: #F2F5F7;
            font-family: 'Montserrat', sans-serif;
            line-height: 1.75;
            text-align: center;
          }
          main {
            max-width: 40rem;
            margin: 5rem auto 0;
          }
          header {
            background-color: white;
            padding: 1rem 2rem;
            border-bottom: 2px solid #d9d9d9;
          }
          header img {
            display: block;
            width: 12rem;
          }
          section {
            background-color: white;
            padding: 4rem 2rem;
          }
          h1 {
            line-height: 1;
            margin-bottom: 1.875rem;
            font-weight: 600;
          }
          .body-paragraph {
            margin-bottom: 1.875rem;
          }
          .button {
            text-decoration: none;
            color: white;
            pointer-events: auto;
            box-sizing: border-box;
            margin: 0;
            text-transform: none;
            display: inline-block;
            padding: 0.25rem 1.4375rem;
            font-family: 'Montserrat', sans-serif;
            font-size: 1rem;
            font-weight: 600;
            line-height: 1.75;
            text-align: center;
            vertical-align: middle;
            user-select: none;
            border: 2px solid #0069a7;
            border-radius: .4375rem;
            transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
            cursor: pointer;
            color: #FFF;
            background-color: #0069a7;
            border-color: #0069a7;
            &:hover {
              color: #FFFFFF;
              background-color: #005486;
              border-color: #004f7d;
            }
          }
          footer {
            background-color: white;
            padding: 1rem 3rem;
            border-top: 2px solid #d9d9d9;
          }
          p.small-text {
            font-size: .875rem;
          }
        </style>
      </head>
      <body>
        <main>
          <header>
            <!-- <img src="https://spanishdex.vercel.app/logo.svg" alt="SpanishDex logo"> -->
            <img src="${process.env.NEXTAUTH_URL}/logo.svg" alt="SpanishDex logo">
          </header>
          <section>
            <h1>Reset Password</h1>
            <p class="body-paragraph">
              A request was made to reset your password.
              To reset your password, please click the following button:
            </p>
            <a class="button" href="${url}">Reset Password</a>
          </section>
          <footer>
            <p class="small-text">If you didn't make this request to reset your password, please ignore this message.</p>
          </footer>
        </main>
      </body>
    </html>
  `
}

export default email_template;