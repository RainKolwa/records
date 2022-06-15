import '../css/globals.css';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Ming</title>
      </Head>
      <div className="container mx-auto">
        <div className="flex flex-col justify-between bg-white dark:bg-slate-800 min-h-screen">
          <NavBar />
          <div className="page-content mb-auto">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </div>
    </SessionProvider>
  );
}

export default App;
