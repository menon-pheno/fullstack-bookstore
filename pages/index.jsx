import Head from 'next/head';
import { useEffect, useState } from 'react';

const Index = () => {
  const [user, setUser] = useState({ email: 'default@bookstore.org' });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`api/user`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>載入中</p>;
  if (!user) return <p>沒有只用者資訊</p>;

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
