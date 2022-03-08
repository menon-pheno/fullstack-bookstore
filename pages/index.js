import Head from "next/head";
import mongoose from "mongoose";

import dbConnect from "../lib/dbConnect";
import Header from "../components/Header";

// users 這個 props 會是來自 MongoDB 的 bookstore.
const Home = ({ users }) => {
  return (
    <>
      <Head>
        <title>首頁</title>
        <meta name="描述" content="這是關於首頁的描述" />
      </Head>
      <Header />
      <p>首頁的內容</p>
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

  // mongoose 是透過 mongoose.Schema() 來對應 MongoDB 內的某個 collection
  const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
  });

  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  const result = await User.find({});
  const users = result.map((doc) => {
    const user = doc.toObject();
    user._id = user._id.toString();
    return user;
  });

  return { props: { users: users } };
}

export default Home;
