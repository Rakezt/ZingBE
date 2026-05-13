const {
  getProfile,
  editProfile,
  updatePassword,
} = require('../services/profileServices');
const asyncHandler = require('../utils/asyncHandler');

const viewProfile = asyncHandler(async (req, res) => {
  const user = await getProfile(req.user);
  res.status(200).json({
    success: true,
    message: 'Profile fetch successfully',
    data: user,
  });
});
const updateProfile = asyncHandler(async (req, res) => {
  const updateUser = await editProfile(req.user, req.body);
  res.status(200).json({
    success: true,
    message: `${updateUser.firstName}, you profile has been updated successfully`,
    data: updateUser,
  });
});

const changePassword = asyncHandler(async (req, res) => {
  await updatePassword(req.user, req.body);
  res.status(200).json({
    success: true,
    message: `Password updated successfully`,
  });
});

module.exports = {
  viewProfile,
  updateProfile,
  changePassword,
};
