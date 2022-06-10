import '../css/style.css';

import Head from 'next/head';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Record App</title>
      </Head>

      <div className="container mx-auto">
        <div className="text-3xl my-5 font-bold">
          <Link href="/">
            <a className="underline">RECORDER</a>
          </Link>
        </div>
      </div>
      <div className="container mx-auto">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
