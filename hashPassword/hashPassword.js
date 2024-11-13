const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10); // random string added $2b$10$wea2@2a
    const hashedPassword = await bcrypt.hash(password, salt); // Await the hash operation

    return hashedPassword; // Return the actual hashed password
  } catch (error) {
    console.log(error);
    // Optionally, you can throw an error here
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword); // Await the comparison
    return isMatch; // Return whether the passwords match
  } catch (error) {
    console.log(error);
    // Optionally, you can throw an error here
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
