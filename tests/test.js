const assert = require('assert')
const app = require('../app')

const testResultA = [ { id: 'ffff', status: 'completed', amount: 22 },
{ id: 'gggg', status: 'completed', amount: 33 } ]

const testResultB = [ { id: 'eeee', status: 'refunded', amount: 154 },
{ id: 'ffff', status: 'completed', amount: 22 },
{ id: 'gggg', status: 'completed', amount: 33 },
{ id: 'hhhh', status: 'refunded', amount: 38 } ]

const testResultC = [ { id: 'aaaa', status: 'completed', amount: 10 },
{ id: 'cccc', status: 'completed', amount: 3 },
{ id: 'dddd', status: 'completed', amount: 12 } ]

describe('cointest', () => {
  it('only-complete', () => {
    let result = app.returnOnlyComplete()
    assert.equal(JSON.stringify(testResultA), JSON.stringify(result))
  })
  it('complete-and-refunded', () => {
    let result = app.returnCompleteAndRefunded()
    assert.equal(JSON.stringify(testResultB), JSON.stringify(result))
  })
  it('mutated-inprogress-completed', () => {
    let result = app.returnInprogressAsCompleted()
    assert.equal(JSON.stringify(testResultC), JSON.stringify(result))
  })
  it('delayed-callback-completed', (done) => {
    let start = new Date().getTime();
    app.returnDelayViaCallback( (err, result)=>
    {
      let end = new Date().getTime();
      let duration = end - start;
      let millisecondsAwayFromOneSecond = Math.abs( duration - 1000 );
      assert.equal( millisecondsAwayFromOneSecond < 100, true, "The callback was not called 1 second later" );
      assert.equal( err, null );
      assert.equal( result , 8 );
      done();
    })
  })
  it('delayed-async-completed', async () => {
    let start = new Date().getTime();

    // Do async call here
    let result = await app.returnDelayViaAsync()

    let end = new Date().getTime();
    let duration = end - start;
    let millisecondsAwayFromOneSecond = Math.abs( duration - 1000 );
    assert.equal( millisecondsAwayFromOneSecond < 100, true, "The promise did not complete 1 second later" );
    assert.equal(result, "8");
    return true;
  })
})
