import {
  beforeEach,
  describe,
  expect,
  test
} from '@jest/globals';

import {
  VolunteerController
} from '../src/controller/volunteer/VolunteerController';
import { VolunteerEntity } from '../src/entities/VolunteerEntity';

beforeEach(() => {
    const volunteer = new VolunteerEntity();
  volunteer.availabilities = ['Monday', 'Tuesday', 'Wednesday'];
  });

describe('volunteer module', () => {
  test('get availability', () => {
    expect(VolunteerController.).toBe(['Monday', 'Tuesday', 'Wednesday']);
  });
});
