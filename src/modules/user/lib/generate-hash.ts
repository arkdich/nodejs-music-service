import { hash } from 'bcrypt';
import { config } from 'dotenv';

config({ path: ['.env.local'] });

export const generateHash = async (password: string) => {
  const saltRounds = Number(process.env.CRYPT_SALT);
  const passwordHash = await hash(password, saltRounds);

  return passwordHash;
};
