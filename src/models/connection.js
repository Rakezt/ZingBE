const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Types.ObjectId,
      ref: 'zingUsers',
      required: true,
    },
    toUserId: {
      type: mongoose.Types.ObjectId,
      ref: 'zingUsers',
      required: true,
    },
    status: {
      type: String,
      enum: ['interested', 'ignored', 'accepted', 'rejected'],
      required: true,
    },
  },
  { timestamps: true },
);
ConnectionSchema.index({ fromUserId: 1 });
ConnectionSchema.pre('save', function () {
  const connection = this;
  if (connection.fromUserId.equals(connection.toUserId)) {
    throw new Error('Cannot send connection to yourself');
  }
});
module.exports = mongoose.model('zingConnection', ConnectionSchema);
