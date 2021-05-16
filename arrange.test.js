const arrange = require('./index');

test('normal arrange', () => {
  let output = '';
  console['log'] = (log) => { output += log; };
  const instance = arrange('William').do('commit');
  expect(output).toBe('');
  return instance.then(() => {
    expect(output).toBe('William is notified\nStart to commit\n');
  });
});

test('arrange with wait', () => {
  let output = '';
  console['log'] = (log) => { output += log; };
  const instance = arrange('William').wait(1).do('push');
  expect(output).toBe('');
  return instance.then(() => {
    expect(output).toBe('William is notified\nStart to push\n');
  }, 10000);
});

test('arrange with waitFirst', () => {
  let output = '';
  console['log'] = (log) => { output += log; };
  const instance = arrange('Tom').wait(1).waitFirst(2).do('commit');
  expect(output).toBe('');
  return instance.then(() => {
    expect(output).toBe('Start to commit\nTom is notified\n');
  }, 10000);
});

test('arrange with nothing', (done) => {
  let output = '';
  console['log'] = (log) => { output += log; };
  arrange('Tom');
  setTimeout(() => {
    expect(output).toBe('');
    done();
  }, 1000);
});

test('arrange with error', () => {
  expect(arrange).toThrow('need a name to notify');
});
