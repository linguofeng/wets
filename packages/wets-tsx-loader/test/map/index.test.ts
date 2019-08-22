import {transform} from '../../src/';
import source from './source';
import output from './output';

test('map', () => {
  expect(transform(source, true,  __filename)).toBe(output);
});
