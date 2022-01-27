import Head from 'next/head';

import Header from '../components/Header';

const Index = () => (
  <div style={{ padding: '10px 45px' }}>
    <Head>
      <title>首頁</title>
      <meta name="說明" content="這是首頁的說明資訊" />
    </Head>
    <Header />
    <p>首頁資訊</p>
  </div>
);

export default Index;
