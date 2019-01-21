const { expect } = require('chai');

const rentChecker = require('../../src/server/analysis/rent-checker.js');

describe('Rent Checker', ()=>{
  const isRent = rentChecker([
    'rent',
    'Blob',
  ]);

  it('returns true when given a rent transaction', ()=>{
    expect(isRent({ description: 'sdijf rent'})).to.eql(true);
    expect(isRent({ description: 'grent'})).to.eql(true);
    expect(isRent({ description: 'eBlob'})).to.eql(true);
  });

  it('returns false when given a non-rent transaction', ()=>{
    expect(isRent({ description: 'asdiofji P ijsdf0j'})).to.eql(false);
    expect(isRent({ description: 'asdiofji Rent ijsdf0j'})).to.eql(false);
  });

});
