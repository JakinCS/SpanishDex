import './scss/custom.scss';
import { Montserrat } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

const montserrat = Montserrat({
  subsets: ['latin']
})

export const metadata = {
  title: "Spanish Vocabulary App | Efficient Spaced Repetition",
  description: "Don't want to forget the Spanish words you've worked hard to learn? SpanishDex simplifies spaced repetition to help you retain vocabulary easily and efficiently.",
  openGraph: {
    title: 'SpanishDex: Simple & Easy Spanish Vocabulary Learning',
    description: 'SpanishDex makes memorizing and retaining Spanish vocabulary easy and time-efficient. Stop wasting time practicing words you already know and start learning what you need to, for free!',
    url: 'https://spanishdex.vercel.app/',
    siteName: 'SpanishDex',
    type: 'website',
  }
};

export default async function RootLayout({ children }) {
  return (
    <html className={montserrat.className} lang="en">
      <body>
        {children}
        <SpeedInsights />
        <Script src='/scripts/darkMode.js'/>
      </body>
    </html>
  );
}
