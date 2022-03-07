import Head from "next/head";

import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Head>
        <title>首頁</title>
        <meta name="描述" content="這是關於首頁的描述" />
      </Head>
      <Header />
      <p>首頁的內容</p>
    </>
  );
};

export default Home;
