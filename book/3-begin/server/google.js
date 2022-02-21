const passport = require('passport');
const Strategy = require('passport-google-oauth').OAuth2Strategy;

function setupGoogle({ server, ROOT_URL }) {
  // passport 所需要使用的 callback 函式
  const verify = async (accessToken, refreshToken, profile, verified) => {
    let email;
    let avatarUrl;

    if (profile.emails) {
      email = profile.emails[0].value;
    }

    if (profile.photos && profile.photos.length > 0) {
      avatarUrl = profile.photos[0].value.replace('sz=50', 'sz=128');
    }
  };

  // 根據 passport 範例，我們先需要引入並且 use 這個套件
  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_CLIENTSECRET,
        callbackURL: `${ROOT_URL}/oauth2callback`,
      },
      verify,
    ),
  );
}

module.exports = setupGoogle;
