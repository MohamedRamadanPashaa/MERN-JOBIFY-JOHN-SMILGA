import { Unauthenticated } from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new Unauthenticated(
    "You don't have a permission to perform this action"
  );
};

export default checkPermissions;
