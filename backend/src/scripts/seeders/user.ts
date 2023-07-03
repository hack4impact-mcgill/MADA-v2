import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();
const TOKEN_KEY = process.env.TOKEN_KEY;
const avalabilities = [''];
export const generateUser = (first?: string, last?: string) => {
  const firstName = first || faker.name.firstName();
  const lastName = last || faker.name.lastName();

  // random avalability - everyone will have 2 avalabilities

  const availability =
    avalabilities[Math.floor(Math.random() * avalabilities.length)];
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

  user.password = await bcrypt.hash(faker.internet.password(), 10);
  const token = jwt.sign({ email: user.email }, TOKEN_KEY, {
    expiresIn: '2h'
  });
  user.token = token;

  return user;
};
