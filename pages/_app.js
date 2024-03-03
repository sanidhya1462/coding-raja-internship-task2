import Layout from "@/components/Layout";
import "@/styles/globals.css";
import Head from "next/head";


export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Elegant</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
