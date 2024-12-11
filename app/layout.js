import './scss/custom.scss';
import { Montserrat } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

const montserrat = Montserrat({
  subsets: ['latin']
})

export const metadata = {
  title: "SpanishDex",
  description: "Spanish flashcards application for spaced learning",
};

export default function RootLayout({ children }) {
  return (
    <html className={montserrat.className} lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
