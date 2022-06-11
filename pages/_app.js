import '../css/globals.css';
import Head from 'next/head';
import Link from 'next/link';
import DarkSwitcher from '../components/DarkSwitcher';
import LoginButton from '../components/LoginButton';
import { SessionProvider } from 'next-auth/react';

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <div className="bg-white dark:bg-slate-800 min-h-screen">
        <Head>
          <title>Record App</title>
        </Head>

        <div className="container mx-auto flex justify-between">
          <div className="text-3xl py-5 font-bold">
            <Link href="/">
              <a className="underline text-black dark:text-white">RECORDER</a>
            </Link>
          </div>
          <div className="flex items-center">
            <DarkSwitcher />
            <LoginButton />
          </div>
        </div>
        <div className="container mx-auto">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
}

export default App;
