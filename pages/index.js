import Head from "next/head";
import useSWR from "swr";
import { Box, CircularProgress } from "@mui/material";
import Link from "next/link";

import dataFetcher from "../lib/dataFetcher";
import Header from "../components/Header";

const Home = () => {
  const { data, error } = useSWR("/api/books", dataFetcher);
  if (error) {
    return (
      <>
        <Head>
          <title>首頁</title>
          <meta name="描述" content="有錯誤" />
        </Head>
        <Header />
        <h1>有錯誤</h1>
      </>
    );
  }
  if (!data) {
    return (
      <>
        <Head>
          <title>首頁</title>
          <meta name="描述" content="載入中" />
        </Head>
        <Header />
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>首頁</title>
        <meta name="描述" content="這是關於首頁的描述" />
      </Head>
      <Header />
      <ul>
        {data.books.map((book) => (
          <li key={book._id}>
            <Link
              as={`/book-detail/${book.slug}`}
              href={`/book-detail?slug=${book.slug}`}
            >
              <a>{book.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
