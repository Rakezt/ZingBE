const {
  getProfile,
  editProfile,
  updatePassword,
} = require('../services/profileServices');

const viewProfile = async (req, res) => {
  try {
    const user = await getProfile(req.user);
    res.status(200).json({
      success: true,
      message: 'Profile fetch successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).send('ERROR : ' + error.message);
  }
};
const updateProfile = async (req, res) => {
  try {
    const updateUser = await editProfile(req.user, req.body);
    res.status(200).json({
      success: true,
      message: `${updateUser.firstName}, you profile has been updated successfully`,
      data: updateUser,
    });
  } catch (error) {
    res.status(400).send('ERROR : ' + error.message);
  }
};

const changePassword = async (req, res) => {
  try {
    await updatePassword(req.user, req.body);
    res.status(200).json({
      success: true,
      message: `Password updated successfully`,
    });
  } catch (error) {
    res.status(400).send('ERROR : ' + error.message);
  }
};

module.exports = {
  viewProfile,
  updateProfile,
  changePassword,
};
