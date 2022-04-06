import useSWR from "swr";
import ReactMarkdown from "react-markdown";
import { Box, CircularProgress } from "@mui/material";

import dataFetcher from "../../../lib/dataFetcher";

const Chapter = () => {
  const { data, error } = useSWR(
    "/api/books/dummy-3/introduction",
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
      {data.chapter.title}:
      <ReactMarkdown children={data.chapter.content} />
    </>
  );
};

export default Chapter;
