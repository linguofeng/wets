const shallowEqual = require('../dist/shallowEqual').default;

test('shallowEqual', () => {
  let a = {};
  let b = {};
  expect(shallowEqual(a, b)).toBe(true);

  a.a = 'aaa';
  b = Object.assign({}, a);
  b.b = 'bbbb';
  expect(shallowEqual(a, b)).toBe(true);
});
