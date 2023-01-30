import MainLayout from "@/src/components/layout/main-layout";
import "@/styles/globals.css";
import "@/styles/general.sass";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* any metadata which applies to whole site */}
      </Head>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}
