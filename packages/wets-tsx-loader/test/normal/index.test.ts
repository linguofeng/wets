import {transform} from '../../src/';
import source from './source';
import output from './output';

test('normal use', () => {
  expect(transform(source)).toBe(output);
});
