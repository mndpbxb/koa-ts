import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hash(password, salt);
};

const verifyPassword = (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const Hasher = {
  hashPassword,
  verifyPassword,
};
