import {transform} from '../../src/';
import source from './source';
import output from './output';

test('no transform', () => {
  expect(transform(source)).toBe(output);
})
