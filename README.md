## CW-ATLASSIAN-OAUTH

This module wraps the oauth strategy for atlassian oauth inside the application.

Installation
`npm install --save git+https://github.com/ankurin/cw-atlassian-oauth.git passport`

> This module uses `express-session` if express-session is not used by the applictaion please install `express-session` and configure your application to use `express-session`

`npm insatll --save express-session`

```JavaScript
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);
```

> Configure passport to use express-session and initialize.

```JavaScript
app.use(passport.initialize());
app.use(passport.session());
```

Uses:

```JavaScript
const passport = require("passport");
const cwAtlassianOauth = require("cw-atlassian-oauth");

cwAtlassianOauth.oauth({
  applicationURL: "http://xyz.atlassian.net",
  consumerKey: "incture",
  consumerSecret: pemfile,
  callbackURL: "/auth/jira/callback",
  signatureMethod: "RSA-SHA1"
});

router.get("/auth/jira", passport.authenticate("oauth"));

router.get(
  "/auth/jira/callback",
  passport.authenticate("oauth"),
  (req, res) => {
    res.redirect("/");
  }
);
```

All the subsequent request will have `atlassian_auth` property on `req.user` which contains both the **token** and **tokenSecret**

```JavaScript
console.log(req.user)

{"atlassian_auth":{"atlassian_token":"your_token","atlassian_tokenSecret":"your_token_secret"}}
```
