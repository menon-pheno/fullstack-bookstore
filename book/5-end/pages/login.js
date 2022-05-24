import { Grid, Button } from "@mui/material";
import { signIn, getProviders } from "next-auth/react";
import { useRouter } from "next/router";

function Login({ providers }) {
  const router = useRouter();
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          {Object.values(providers).map((provider) => {
            return (
              <div key={provider.name}>
                <Button
                  variant="contained"
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: router.query.callbackUrl,
                    })
                  }
                >
                  使用 {provider.name} 登入
                </Button>
              </div>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default Login;
