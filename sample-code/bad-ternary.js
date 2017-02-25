function foo() {
  const x = 1, y = 2;
  const result = x > 2
    ? 'foo'
    : y > 2
        ? 'bar'
        : 'baz';
  console.log('result =', result);
}

foo();
