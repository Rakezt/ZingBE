const {
  findExistingConnection,
  createConnection,
  findPendingRequestById,
  saveConnection,
} = require('../repositories/connectionRepository');
const { findUserById } = require('../repositories/userRepository');

const sendRequest = async (loggedUser, params) => {
  const fromUserId = loggedUser._id;
  const toUserId = params.userId;
  const status = params.status;

  const allowedStatus = ['interested', 'ignored'];
  if (!allowedStatus.includes(status))
    throw new Error('Invalid status selected');
  const toUser = await findUserById(toUserId);
  if (!toUser) throw new Error('User selected is not found');
  const existingConnection = await findExistingConnection(fromUserId, toUserId);
  if (existingConnection) throw new Error('Connection already established');

  const data = await createConnection({ toUserId, fromUserId, status });
  return data;
};

const reviewRequest = async (loggedUser, params) => {
  const loggedUserId = loggedUser._id;
  const connectionId = params.connectionId;
  const status = params.status;

  const allowedStatus = ['accepted', 'rejected'];
  if (!allowedStatus.includes(status))
    throw new Error('Invalid status selected');
  const connection = await findPendingRequestById(connectionId, loggedUserId);
  if (!connection) throw new Error("Connection doesn't exist");
  connection.status = status;
  const data = await saveConnection(connection);
  return { data, status };
};

module.exports = { sendRequest, reviewRequest };
