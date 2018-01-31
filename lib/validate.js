function validate(options) {
  if (!options.applicationURL) {
    throw new Error("CW Atlassian Oauth requires a applicationURL option");
  }
  if (!options.consumerKey) {
    throw new Error("CW Atlassian Oauth requires a consumerKey Option");
  }
  if (options.consumerSecret === undefined) {
    throw new TypeError("CW Atlassian Oauth requires a consumerSecret option");
  }
  if (!options.callbackURL) {
    throw new Error("CW Atlassian Oauth requires a callbackURL option");
  }
}

module.exports = validate;
