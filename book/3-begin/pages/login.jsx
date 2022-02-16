import Head from 'next/head';
import Button from '@material-ui/core/Button';

import withAuth from '../lib/withAuth';
import { styleLoginButton } from '../components/SharedStyles';

const Login = () => (
  <div style={{ textAlign: 'center', margin: '0 20px' }}>
    <Head>
      <title>登入 pheno 書店</title>
      <meta name="description" content="書店登入頁面" />
    </Head>
    <br />
    <p style={{ margin: '45px auto', fontSize: '44px', fontWeight: '400' }}>登入</p>
    <p>若沒有手動登出，將會維持登入 14 天</p>
    <br />
    <Button variant="contained" style={styleLoginButton} href="/auth/google">
      <img
        src="https://storage.googleapis.com/builderbook/G.svg"
        alt="使用 Google 登入"
        style={{ marginRight: '10px' }}
      />
      使用 Google 登入
    </Button>
  </div>
);

export default withAuth(Login, { logoutRequired: true });
