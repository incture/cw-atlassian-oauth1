var validate = require("./validate");
var OAuth1Strategy = require("passport-oauth1").Strategy;
var passport = require("passport");

passport.serializeUser((tokens, done) => {
  _auth_token = {
    atlassian_auth: tokens
  };
  done(null, _auth_token);
});

passport.deserializeUser((atlassian_auth, done) => {
  done(null, atlassian_auth);
});

var atlassianOAuth = {
  /**
   * oauth wraps the the oauth1 customized for the
   * cw-atlassian-oauth use cases.
   * @param {Object} options
   * @api public
   */
  oauth: function oauth(options) {
    options = options || {};
    validate(options);
    var _userAuthorizationURL =
      options.applicationURL + "/plugins/servlet/oauth/authorize";
    var _accessTokenURL =
      options.applicationURL + "/plugins/servlet/oauth/access-token";
    var _requestTokenURL =
      options.applicationURL + "/plugins/servlet/oauth/request-token";

    var _cwAtlassianOauth1 = {
      requestTokenURL: _requestTokenURL,
      accessTokenURL: _accessTokenURL,
      userAuthorizationURL: _userAuthorizationURL,
      consumerKey: options.consumerKey,
      consumerSecret: options.consumerSecret,
      callbackURL: options.callbackURL,
      signatureMethod: options.signatureMethod
    };

    // initialize this instance of passport
    passport.use(
      new OAuth1Strategy(_cwAtlassianOauth1, function(
        token,
        tokenSecret,
        profile,
        done
      ) {
        const ob = {
          atlassian_token: token,
          atlassian_tokenSecret: tokenSecret
        };
        return done(null, ob);
      })
    );
  },
  /**
   * auth wraps the the passport authenticate customized for the
   * cw-atlassian-oauth use cases.
   * @api public
   */
  auth: function auth() {
    passport.authenticate("oauth");
  }
};

module.exports = {
  atlassianOAuth
};
