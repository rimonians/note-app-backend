// Import single uploader function
const uploader = require("../../utils/singleUploader");

// Profile image upload middleware
const profileImageUpload = async (req, res, next) => {
  const upload = uploader(
    "users",
    ["image/jpeg", "image/jpg", "image/png"],
    10000000,
    "Only .jpeg .jpg & .png file are allowed"
  );

  // Call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          profileImage: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};

// Export profile image upload middleware
module.exports = profileImageUpload;
