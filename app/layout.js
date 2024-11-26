import './scss/custom.scss';

export const metadata = {
  title: "SpanishDex",
  description: "Spanish flashcards application for spaced learning",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
