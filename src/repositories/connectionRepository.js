const Connection = require('../models/connection');

const SAFE_PUBLIC_DATA =
  'firstName lastName photoUrl about gender age interest';

const createConnection = async (data) => {
  const connection = new Connection(data);
  if (Connection) {
    console.log('Hello');
  }
  return await connection.save();
};

const saveConnection = async (connectionDoc) => {
  return await connectionDoc.save();
};

const findExistingConnection = async (fromUserId, toUserId) => {
  return await Connection.findOne({
    $or: [
      { fromUserId, toUserId },
      { fromUserId: toUserId, toUserId: fromUserId },
    ],
  });
};

const findPendingRequestById = async (connectionId, loggedUserId) => {
  return await Connection.findOne({
    _id: connectionId,
    toUserId: loggedUserId,
    status: 'interested',
  });
};

const findReceivedRequests = async (userId) => {
  return await Connection.find({
    toUserId: userId,
    status: 'interested',
  }).populate('fromUserId', SAFE_PUBLIC_DATA);
};

const findAcceptedConnections = async (userId) => {
  return await Connection.find({
    $or: [
      { toUserId: userId, status: 'accepted' },
      { fromUserId: userId, status: 'accepted' },
    ],
  })
    .populate('fromUserId', SAFE_PUBLIC_DATA)
    .populate('toUserId', SAFE_PUBLIC_DATA);
};

const findAllUserConnection = async (userId) => {
  return await Connection.find({
    $or: [{ froomUserId: userId }, { toUserId: userId }],
  }).select('fromUserId toUserId');
};

module.exports = {
  createConnection,
  saveConnection,
  findExistingConnection,
  findPendingRequestById,
  findReceivedRequests,
  findAcceptedConnections,
  findAllUserConnection,
};
