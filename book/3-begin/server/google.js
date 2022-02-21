const passport = require('passport');
const Strategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('./models/User');

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

    try {
      const user = await User.signInOrSignUp({
        googleId: profile.id,
        email,
        googleToken: { accessToken, refreshToken },
        displayName: profile.displayName,
        avatarUrl,
      });
      verified(null, user);
    } catch (err) {
      verified(err);
      console.log(err);
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

  // 將 user.id 存入 session 內
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 將 user 去序列化，檢查 MongoDB 是否存有此 user
  passport.deserializeUser((id, done) => {
    User.findById(id, User.publicFields(), (err, user) => {
      done(err, user);
    });
  });

  server.use(passport.initialize());
  server.use(passport.session());

  server.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account',
    }),
  );

  server.get(
    '/oauth2callback',
    passport.authenticate(
      'google',
      {
        failureRedirect: '/login',
      },
      (req, res) => {
        // 執行到這邊的話代表認證成功，因此將使用者轉導回 Index 頁面('/')
        res.redirect('/');
      },
    ),
  );

  server.get('/logout', (req, res) => {
    // 將 req.user 以及 session 內的 user id 清空，轉導回 Login 頁面('/login')
    req.logout();
    res.redirect('/login');
  });
}

module.exports = setupGoogle;
