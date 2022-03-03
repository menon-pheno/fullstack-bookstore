import Head from 'next/head';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Index = () => {
  const { data, error } = useSWR('/api/user', fetcher);
  const user = data;

  if (error) return <p>載入失敗</p>;
  if (!data) return <p>載入中</p>;

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
