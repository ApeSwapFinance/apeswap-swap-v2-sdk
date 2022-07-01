import { expect } from 'chai';
import { overnight } from './overnight';
import fetchMock from 'fetch-mock';

describe('overnight apr', () => {
  before(() => {
    fetchMock.get('https://app.overnight.fi/api/balancer/week/apr', '0.01');
  });
  after(() => {
    fetchMock.reset();
  });

  it('is getting fetched', async () => {
    const apr = await overnight();
    expect(apr).to.eq(1);
  });
});
