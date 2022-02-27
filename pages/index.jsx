import Head from 'next/head';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  user: null,
};

const Index = ({ user }) => (
  <div style={{ padding: '10px 45px' }}>
    <Head>
      <title>首頁</title>
      <meta name="說明" content="這是首頁的說明資訊" />
    </Head>
    <p>首頁資訊</p>
    <Button variant="contained">MUI 按鈕(Demo 用而已)</Button>
    <div>user prop(demo 用而已): {user || '沒資料'}</div>
  </div>
);

Index.propTypes = propTypes;
Index.defaultProps = defaultProps;

Index.getInitialProps = async (ctx) => ({ user: ctx.query.user });

export default Index;
