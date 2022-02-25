import PropTypes from 'prop-types';
import Head from 'next/head';

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
    <p>
      Email:
      {user.email}
    </p>
  </div>
);

Index.getInitialProps = async (ctx) => ({ user: ctx.query.user });

Index.propTypes = propTypes;
Index.defaultProps = defaultProps;

export default Index;
