import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

import MenuWithAvatar from './MenuWithAvatar';
import { styleToolbar } from './SharedStyles';

const optionsMenu = [
  {
    text: '有問題嗎？',
    href: 'https://github.com/menon-pheno/fullstack-bookstore/issues',
  },
  {
    text: '登出',
    href: '/logout',
    anchor: true,
  },
];

const Header = ({ user }) => (
  <div>
    <Toolbar style={styleToolbar}>
      <Grid container direction="row" justify="space-around" align="center">
        <Grid item xs={12} style={{ textAlign: 'right' }}>
          {user ? (
            <div style={{ whiteSpace: ' nowrap' }}>
              {user.avatarUrl ? (
                <MenuWithAvatar options={optionsMenu} src={user.avatarUrl} alt={user.displayName} />
              ) : null}
            </div>
          ) : (
            <Link href="/login">
              <a style={{ margin: '0px 20px 0px auto' }}>登入</a>
            </Link>
          )}
        </Grid>
      </Grid>
    </Toolbar>
  </div>
);

export default Header;
