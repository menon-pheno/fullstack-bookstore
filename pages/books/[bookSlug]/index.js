import { useRouter } from "next/router";

const Book = () => {
  const router = useRouter();
  const { bookSlug } = router.query;

  return (
    <>
      <h1>這是書本介紹頁</h1>
      <h2>書本 slug: {bookSlug}</h2>
    </>
  );
};

export default Book;
