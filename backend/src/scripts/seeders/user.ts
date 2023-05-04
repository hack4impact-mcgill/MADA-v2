import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();
const TOKEN_KEY = process.env.TOKEN_KEY;

export const generateUser = (first?: string, last?: string) => {
  const firstName = first || faker.name.firstName();
  const lastName = last || faker.name.lastName();

  const user = {
    name: firstName + ' ' + lastName,
    email: faker.internet.email(firstName, lastName),
    phoneNumber: faker.phone.number()
  };

  return user;
};

export const generateStaffUser = async () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  const user = generateUser(firstName, lastName) as any;

  user.username = faker.internet.userName(firstName, lastName);
  user.password = await bcrypt.hash(faker.internet.password(), 10);
  const token = jwt.sign(
    { username: user.username, email: user.email },
    TOKEN_KEY,
    {
      expiresIn: '2h'
    }
  );
  user.token = token;

  return user;
};
