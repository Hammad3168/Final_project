import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// get All Users (/api/users )
export const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    if (!allUsers) {
      return res.json({
        success: false,
        message: "No Users Found",
      });
    }
    res.json({
      success: true,
      data: allUsers,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
// get Single user (/api/users/:id)
export const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
// post Create User (/api/users )
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(404).json({
        success: false,
        message: "Email already Exist",
      });
    }
    await User.create({ name, email, password, role });
    res.status(201).json({
      success: true,
      message: "Sign up successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
// post Login User (/api/users/login )
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill all the feilds",
      });
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not registerd",
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "Secret090",
      { expiresIn: "1d" },
    );

    res.status(200).json({
      success: true,
      message: "Login Successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
// put Update User (/api/users/:id)
export const updateUser = async (req, res) => {
  try {
    console.log(req.params.id, req.body.role);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true, runValidators: true },
    ).select("-password");

    res.status(201).json({
      success: true,
      message: "User Updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
// Delete User (/api/users/:id)
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: true,
        message: "User not found!",
      });
    }
    await User.findByIdAndDelete(userId);
    res
      .status(200)
      .json({ success: true, message: "User Deleted successfully!" });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
