import { BadRequest } from "../errors/index.js";

const testUser = (req, res, next) => {
  const { testUser } = req.user;

  if (testUser) {
    throw new BadRequest(
      "You don't have a permission to perform this action, THIS IS FOR TEST ONLY."
    );
  }
  next();
};

export default testUser;
