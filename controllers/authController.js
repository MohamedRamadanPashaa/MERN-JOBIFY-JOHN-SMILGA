import { StatusCodes } from "http-status-codes";
import User from "../models/userModels.js";

import { BadRequest, Unauthenticated } from "../errors/index.js";
import attachCookie from "../utils/attachCookie.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    // with express-async-error => no need to next, Please visit their docs.
    throw new BadRequest("Please provide all values");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser)
    throw new BadRequest(
      `This email is already exist, Please provide another email, or login instead.`
    );

  const user = await User.create({ name, email, password });

  const token = user.createJWT();

  attachCookie({ res, token });

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
    },
    location: user.location,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide all values");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Unauthenticated("There is no user with this email");
  }

  if (!(await user.comparePasswords(password))) {
    throw new Unauthenticated("email and password don't match");
  }

  const token = user.createJWT();

  attachCookie({ res, token });

  user.password = undefined;

  res.status(StatusCodes.OK).json({
    user,
    location: user.location,
  });
};

export const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;

  if (!email || !name || !lastName || !location) {
    throw new BadRequest("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createJWT();

  attachCookie({ res, token });

  res.status(StatusCodes.OK).json({
    user,
    location: user.location,
  });
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId);

  res.status(StatusCodes.OK).json({ user, location: user.location });
};

export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });

  res.status(StatusCodes.OK).json({ msg: "Logged out successfully" });
};
