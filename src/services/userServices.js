const {
  findReceivedRequests,
  findAcceptedConnections,
  findAllUserConnection,
} = require('../repositories/connectionRepository');
const { findFeedUsers } = require('../repositories/userRepository');

const getReceivedRequest = async (loggedUser) => {
  return await findReceivedRequests(loggedUser._id);
};

const getConnections = async (loggedUser) => {
  const connections = await findAcceptedConnections(loggedUser._id);

  const data = connections.map((connection) => {
    if (connection.fromUserId._id.toString() === loggedUser._id.toString()) {
      return connection.toUserId;
    }
    return connection.fromUserId;
  });
  return data;
};

const getFeed = async (loggedUser, query) => {
  const page = parseInt(query.page) || 1;
  let limit = parseInt(query.limit) || 10;
  limit = limit > 10 ? 10 : limit;
  const skip = (page - 1) * limit;
  const connections = await findAllUserConnection(loggedUser._id);

  const hideUser = new Set();

  connections.forEach((item) => {
    hideUser.add(item.fromUserId.toString());
    hideUser.add(item.toUserId.toString());
  });

  const users = await findFeedUsers(
    Array.from(hideUser),
    loggedUser._id,
    skip,
    limit,
  );
  return users;
};
module.exports = { getReceivedRequest, getConnections, getFeed };
