import {transform} from '../../src/';
import source from './source';
import output from './output';

test('component use', () => {
  expect(transform(source, true, __filename)).toBe(output);
});
