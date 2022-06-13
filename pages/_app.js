import '../css/globals.css';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import NavBar from '@/components/NavBar';

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <div className="bg-white dark:bg-slate-800 min-h-screen">
        <Head>
          <title>Recorder</title>
        </Head>
        <div className="container mx-auto">
          <NavBar />
        </div>
        <div className="container mx-auto">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
}

export default App;
