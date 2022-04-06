import useSWR from "swr";
import { Box, CircularProgress } from "@mui/material";
import Link from "next/link";

import dataFetcher from "../lib/dataFetcher";

const Home = () => {
  const { data, error } = useSWR("/api/books", dataFetcher);
  if (error) {
    return (
      <>
        <h1>有錯誤</h1>
      </>
    );
  }
  if (!data) {
    return (
      <>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
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
