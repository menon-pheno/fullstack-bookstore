import Link from "next/link";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";

const Header = () => {
  return (
    <>
      <Toolbar>
        <Grid container direction="row" justify="space-around" align="center">
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Link href="/login">
              <a>登入</a>
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </>
  );
};

export default Header;
