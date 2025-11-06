const request = require('supertest');
let expect;
const app = require('../app');

before(async function () {
  const mod = await import('chai');
  const chai = mod && mod.default ? mod.default : mod;
  expect = chai.expect;
});

describe('GET /', function () {
  it('should return Hello, GitHub Actions!', async function () {
    const res = await request(app).get('/');
    expect(res.status).to.equal(200);
    expect(res.text).to.equal('Hello, CI/CD!');
  });
});