import {transform} from '../../src/';
import source from './source';
import output from './output';

test('条件判断', () => {
  expect(transform(source, true, __filename)).toBe(output);
});
