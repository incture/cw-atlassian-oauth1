## CW-ATLASSIAN-OAUTH1

This module wraps the oauth strategy for atlassian oauth.

Installation
`npm install --save git+https://github.com/incture/cw-atlassian-oauth1.git passport`

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
const cwAtlassianOauth = require("cw-atlassian-oauth1");

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
      //app logic
    // res.send(req.user);
  }
);
```

All the subsequent request will have `atlassian_auth` property on `req.user` which contains both the **token** and **tokenSecret**

```JavaScript
console.log(req.user)

{"atlassian_auth":{"atlassian_token":"your_token","atlassian_tokenSecret":"your_token_secret"}}
```
