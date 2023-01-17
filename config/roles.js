const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getSelf', 'manageSelf']); // For App Users
roleRights.set(roles[1], ['getUsers', 'manageUsers']); // For Admin Users

module.exports = {
  roles,
  roleRights,
};
