const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/user");

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const name = process.argv[2];       // node admin.js admin admin@gmail.com admin123
    const email = process.argv[3];
    const password = process.argv[4];

    if (!name || !email || !password) {
      console.log("Usage: node createAdmin.js <name> <email> <password>");
      process.exit();
    }

    const exists = await User.findOne({ email });
    if (exists) {
      console.log("User already exists. Updating role to admin...");
      exists.role = "admin";
      await exists.save();
      console.log(`${email} is now an admin`);
      process.exit();
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPass,
      role: "admin"
    });

    await user.save();
    console.log(`Admin user created: ${email}`);
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
