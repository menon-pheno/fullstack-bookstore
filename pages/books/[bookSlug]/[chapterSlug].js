import useSWR from "swr";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { Box, CircularProgress } from "@mui/material";

import dataFetcher from "../../../lib/dataFetcher";

const Chapter = () => {
  const router = useRouter();
  const { bookSlug, chapterSlug } = router.query;
  const { data, error } = useSWR(
    bookSlug && chapterSlug ? `/api/books/${bookSlug}/${chapterSlug}` : null,
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
      {data.chapter.title}:{bookSlug} {chapterSlug}
      <br />
      <>{data.chapter.content}</>
      {/*<ReactMarkdown children={data.chapter.content} />*/}
    </>
  );
};

export default Chapter;
