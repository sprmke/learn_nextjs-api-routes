import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
