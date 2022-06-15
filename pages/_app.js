import 'react-toastify/dist/ReactToastify.css';
import '../css/globals.css';
import '../css/toast.css';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Ming</title>
      </Head>
      <div className="bg-white dark:bg-slate-800">
        <div className="container mx-auto">
          <div className="flex flex-col justify-between min-h-screen">
            <NavBar />
            <div className="page-content mb-auto">
              <Component {...pageProps} />
            </div>
            <Footer />
          </div>
        </div>
        <ToastContainer className="my-toast" />
      </div>
    </SessionProvider>
  );
}

export default App;
