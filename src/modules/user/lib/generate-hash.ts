import { hash } from 'bcrypt';

export const generateHash = async (password: string) => {
  const saltRounds = Number(process.env.CRYPT_SALT);
  const passwordHash = await hash(password, saltRounds);

  return passwordHash;
};
