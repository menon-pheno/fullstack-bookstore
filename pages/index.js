import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";

import dbConnect from "../lib/dbConnect";
import User from "../models/User";
import Header from "../components/Header";

// users 這個 props 會是來自 MongoDB 的 bookstore.
const Home = ({ users }) => {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>首頁</title>
        <meta name="描述" content="這是關於首頁的描述" />
      </Head>
      <Header />
      <p>從 MongoDB Atlas 取得資料</p>
      {users.map((user) => (
        <div key={user._id}>
          <p>{user.name}</p>
        </div>
      ))}
    </>
  );
};

// 從 MongoDB 取得 user(s) 資訊

export async function getServerSideProps() {
  await dbConnect();

  const result = await User.find({});
  const users = result.map((doc) => {
    const user = doc.toObject();
    user._id = user._id.toString();
    return user;
  });

  return { props: { users: users } };
}

export default Home;
