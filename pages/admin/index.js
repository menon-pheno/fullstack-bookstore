import { Button, Box, CircularProgress } from "@mui/material";
import Link from "next/link";
import useSWR from "swr";

import dataFetcher from "../../lib/dataFetcher";

const Admin = () => {
  const { data, error } = useSWR(`/api/git/repos`, dataFetcher);

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
        {data.repos.map((repo) => (
          <li key={repo}>{repo}</li>
        ))}
      </ul>
      <Link href="/admin/add-book">
        <Button variant="contained">新增書本</Button>
      </Link>
    </>
  );
};

export default Admin;
