import { useState } from "react";
import {
  TextField,
  Button,
  Alert,
  Select,
  Input,
  MenuItem,
  Box,
  CircularProgress,
} from "@mui/material";
import useSWR from "swr";
import Router from "next/router";

import dataFetcher from "../../lib/dataFetcher";

const AddBook = () => {
  const { data, error } = useSWR(`/api/git/repos`, dataFetcher);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [githubRepo, setGithubRepo] = useState("");
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!name) {
      setHasSubmitError(true);
      setErrorMessage("書名必填");
      return;
    }
    if (!price) {
      setHasSubmitError(true);
      setErrorMessage("書價必填");
      return;
    }
    if (!githubRepo) {
      setHasSubmitError(true);
      setErrorMessage("Github repository 必填");
      return;
    }

    // TODO: save it to mongo
    // POST to /api/books with `book`
    const postBookRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        githubRepo,
      }),
    };

    try {
      const postBookResponse = await fetch(
        `/api/books`,
        postBookRequestOptions
      );
      const bookBody = await postBookResponse.json();
      const book = bookBody.book;
      const bookId = book._id;
      const [owner, repo] = githubRepo.split("/");
      const getChaptersResponse = await fetch(
        `/api/git/repoContent?owner=${owner}&repo=${repo}`
      );
      const chaptersBody = await getChaptersResponse.json();
      const chapters = chaptersBody.chapters;
      console.log(chapters);
      const postChaptersRequestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId,
          chapters,
        }),
      };
      const postChaptersResponse = await fetch(
        `/api/chapters`,
        postChaptersRequestOptions
      );
      Router.push(`/books/${book.slug}}`);
    } catch (error) {
      console.log(error);
      console.log("error adding book/chapter");
    }
  };

  return (
    <>
      <h1>新增書本</h1>
      <form onSubmit={onSubmit}>
        <br />
        <TextField
          onChange={(event) => {
            setName(event.target.value);
          }}
          value={name}
          type="text"
          label="書名"
        />
        <br />
        <br />
        <TextField
          onChange={(event) => {
            setPrice(Number(event.target.value));
          }}
          value={price}
          type="number"
          label="書價"
        />
        <br />
        <span>Github repo:</span>
        <Select
          value={""}
          input={<Input />}
          onChange={(event) => {
            setGithubRepo(event.target.value);
          }}
        >
          <MenuItem value="">
            <em>-- 選擇 Github repo --</em>
          </MenuItem>
          {data.repos.map((repo) => (
            <MenuItem value={repo.fullName} key={repo.id}>
              {repo.fullName}
            </MenuItem>
          ))}
        </Select>
        <br />
        <br />
        <Button variant="contained" type="submit">
          送出
        </Button>
      </form>
      {hasSubmitError && <Alert severity="error">{errorMessage}</Alert>}
    </>
  );
};

export default AddBook;
