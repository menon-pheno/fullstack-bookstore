import Head from 'next/head';
import { useState } from 'react';

const Index = () => {
  const [user] = useState({ email: 'default@bookstore.org' });

  return (
    <div style={{ padding: '10px 45px' }}>
      <Head>
        <title>首頁</title>
        <meta name="說明" content="這是首頁的說明資訊" />
      </Head>
      <p>首頁資訊</p>
      <p>使用者 email: {user.email}</p>
    </div>
  );
};

export default Index;
