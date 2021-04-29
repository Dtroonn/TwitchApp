import Head from 'next/head';

import Header from '../components/Header';

export default function Main({ children }) {
    return (
        <>
            <Head>
                <title>Twitch app</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <div className="wrapper">
                <Header />
                <main>{children}</main>
            </div>
        </>
    );
}
