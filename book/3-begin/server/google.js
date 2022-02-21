const passport = require('passport');
const Strategy = require('passport-google-oauth').OAuth2Strategy;

function setupGoogle({ server, ROOT_URL }) {
  // 根據 passport 範例，我們先需要引入並且 use 這個套件
  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_CLIENTSECRET,
        callbackURL: `${ROOT_URL}/oauth2callback`,
      },
      verify, // 接著需要定義跟實作這個函式
    ),
  );
}

module.exports = setupGoogle;
