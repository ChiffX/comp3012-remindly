const userModel = require("../models/userModel").userModel;
const database = require("../models/userModel").database;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

function getUserByGitHubIdOrCreate(profile) {
  let profileId = profile.id;
  let user = userModel.findById(profileId);

  if (user) {
    return user;
  } else {
    database.push(
      {
        id: profileId,
        name: profile.displayName,
        reminders: [],
      }
    )
    user = userModel.findById(profileId);
    return user;
  }
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGitHubIdOrCreate,
};
