const {
  findExistingConnection,
  createConnection,
  findPendingRequestById,
  saveConnection,
} = require('../repositories/connectionRepository');
const { findUserById } = require('../repositories/userRepository');
const ApiError = require('../utils/ApiError');

const sendRequest = async (loggedUser, params) => {
  const fromUserId = loggedUser._id;
  const toUserId = params.userId;
  const status = params.status;

  const allowedStatus = ['interested', 'ignored'];
  if (!allowedStatus.includes(status))
    throw new ApiError(400, 'Invalid Status Selected');
  const toUser = await findUserById(toUserId);
  if (!toUser) throw new ApiError(404, 'User you have selected is not found');
  const existingConnection = await findExistingConnection(fromUserId, toUserId);
  if (existingConnection) throw new ApiError(400, 'Connection already exist');

  const data = await createConnection({ toUserId, fromUserId, status });
  return data;
};

const reviewRequest = async (loggedUser, params) => {
  const loggedUserId = loggedUser._id;
  const connectionId = params.connectionId;
  const status = params.status;

  const allowedStatus = ['accepted', 'rejected'];
  if (!allowedStatus.includes(status))
    throw new ApiError(400, 'Invalid Status Selected');
  const connection = await findPendingRequestById(connectionId, loggedUserId);
  if (!connection) throw new ApiError(404, 'Connection request is not found');
  connection.status = status;
  const data = await saveConnection(connection);
  return { data, status };
};

module.exports = { sendRequest, reviewRequest };
