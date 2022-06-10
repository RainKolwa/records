import '../css/style.css';

import Head from 'next/head';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-white dark:bg-slate-800 min-h-screen">
      <Head>
        <title>Record App</title>
      </Head>

      <div className="container mx-auto">
        <div className="text-3xl py-5 font-bold">
          <Link href="/">
            <a className="underline text-black dark:text-white">RECORDER</a>
          </Link>
        </div>
      </div>
      <div className="container mx-auto">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
