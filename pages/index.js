import Head from "next/head";
import useSWR from "swr";

import dataFetcher from "../lib/dataFetcher";
import Header from "../components/Header";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
// users 這個 props 會是來自 MongoDB 的 bookstore.
const Home = () => {
  const { data, error } = useSWR("/api/books", dataFetcher);
  if (error) {
    return <>失敗</>;
  }
  if (!data) {
    return <>無資料</>;
  }

  console.log(`data is ${data}`);
  return (
    <>
      <Head>
        <title>首頁</title>
        <meta name="描述" content="這是關於首頁的描述" />
      </Head>
      <Header />
      <h1>總算跟書店真的有關係了: {data.data.name}</h1>
    </>
  );
};

export default Home;
