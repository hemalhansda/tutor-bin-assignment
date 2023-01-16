const roles = ['user', 'admin', 'club-admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getSelf', 'manageSelf']); // For App Users
roleRights.set(roles[1], ['getUsers', 'manageUsers']); // For Admin Users
roleRights.set(roles[2], ['getSelf', 'manageSelf']); // For Club Admin Users

module.exports = {
  roles,
  roleRights,
};
