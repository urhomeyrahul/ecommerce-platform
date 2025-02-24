const bcrypt = require('bcryptjs');

const hashedPassword = "$2a$10$L8k9f/sT5yD3OaR5Q.PsE.5/2JAn5Jh7RgLO7TQl9Nfb2IzbENcBW"; // Your hashed password
const plainPassword = "123456"; // The password to verify

bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
  if (result) {
    console.log("✅ Password matches!");
  } else {
    console.log("❌ Incorrect password.");
  }
});