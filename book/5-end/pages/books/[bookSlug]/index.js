import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";

import dataFetcher from "../../../lib/dataFetcher";

const Book = () => {
  const router = useRouter();
  const { bookSlug } = router.query;
  const { data, error } = useSWR(
    bookSlug ? `/api/books/${bookSlug}` : null,
    dataFetcher
  );

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
      <h1>書本 slug: {bookSlug}</h1>
      <ul>
        {data.chapters.map((chapter) => (
          <li key={chapter._id}>
            <Link href={`/books/${bookSlug}/${chapter.slug}`}>
              <a>{chapter.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Book;
