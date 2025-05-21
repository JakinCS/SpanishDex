import './scss/custom.scss';
import { Montserrat } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import newrelic from 'newrelic'

const montserrat = Montserrat({
  subsets: ['latin']
})

export const metadata = {
  title: "SpanishDex",
  description: "Spanish flashcards application for spaced learning",
};

export default async function RootLayout({ children }) {
  if (newrelic.agent.collector.isConnected() === false) {
    await new Promise((resolve) => {
      newrelic.agent.on("connected", resolve)
    })
  }

  const browserTimingHeader = newrelic.getBrowserTimingHeader({
    hasToRemoveScriptWrapper: true,
    allowTransactionlessInjection: true,
  })

  return (
    <html className={montserrat.className} lang="en">
      <Script
        id="nr-browser-agent"
        dangerouslySetInnerHTML={{ __html: browserTimingHeader }}
      />
      <body>
        {children}
        <SpeedInsights />
        <Script src='/scripts/darkMode.js'/>
      </body>
    </html>
  );
}
