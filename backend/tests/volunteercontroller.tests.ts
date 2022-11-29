import {
  Request,
  Response
} from 'express';

import {
  beforeEach,
  describe,
  expect,
  test
} from '@jest/globals';

import { VolunteerController } from '../src/controller/VolunteerController';
import { VolunteerEntity } from '../src/entities/VolunteerEntity';

describe('volunteer module', () => {
  let volunteer: VolunteerEntity;
  let controller: VolunteerController;

  beforeEach(() => {
    volunteer = new VolunteerEntity();
    controller = new VolunteerController();

    volunteer.availabilities = ['Monday', 'Tuesday', 'Wednesday'];
  });

  test('get availability', async () => {
    const req: Request = { params: { user: `${volunteer.id}` } };
    const res: Response = {
      text: '',
      send: function (input) {
        this.text = input;
      }
    };
    const availability = await controller.getAvailability(req, res);
    expect(availability).toBe(['Monday', 'Tuesday', 'Wednesday']);
  });

  test('update availability', async () => {
    const newAvailabilities = ['Monday', 'Tuesday', 'Wednesday', 'Thursday'];

    const availability = await controller.updateAvailability(req, res);

    expect(availability).toBe(['Monday', 'Tuesday', 'Wednesday', 'Thursday']);
  });

  test('get personal information', async () => {});

  test('update personal information', async () => {});
});
