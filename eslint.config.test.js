// We recommend installing an extension to run mocha tests.

const path = require('path');
let expect;
let cfg;

before(async function () {
  const mod = await import('chai');
  const chai = mod && mod.default ? mod.default : mod;
  expect = chai.expect;
  cfg = require(path.join(__dirname, 'eslint.config.js').replace(/(^|\\)eslint.config.js$/, 'eslint.config.js'));
});

describe('eslint.config.js', function () {
  it('exports an array', function () {
    expect(Array.isArray(cfg)).to.equal(true);
  });

  it('contains a project-level rule turning off node/no-missing-import', function () {
    const elem = cfg.find(e => e && e.rules && Object.prototype.hasOwnProperty.call(e.rules, 'node/no-missing-import'));
    expect(elem, 'expected an element with node/no-missing-import rule').to.exist;
    expect(elem.rules['node/no-missing-import']).to.equal('off');
  });

  it('contains languageOptions with expected ecmaVersion, sourceType, and readonly globals', function () {
    const elem = cfg.find(e => e && e.languageOptions && e.languageOptions.globals);
    expect(elem, 'expected an element with languageOptions').to.exist;
    const lo = elem.languageOptions;
    expect(lo.ecmaVersion).to.equal(2022);
    expect(lo.sourceType).to.equal('script');

    const expectedGlobals = [
      'require','module','exports','process','console',
      '__dirname','__filename','Buffer','setTimeout','clearTimeout',
      'setInterval','clearInterval',
      'describe','it','test','before','after','beforeEach','afterEach'
    ];

    expect(lo.globals).to.be.an('object');
    expectedGlobals.forEach(g => {
      expect(lo.globals, `missing global ${g}`).to.have.property(g, 'readonly');
    });
  });

  it("contains rules: 'no-unused-vars' = 'warn' and 'no-console' = 'off'", function () {
    const elem = cfg.find(e => e && e.rules && (Object.prototype.hasOwnProperty.call(e.rules, 'no-unused-vars') || Object.prototype.hasOwnProperty.call(e.rules, 'no-console')));
    expect(elem, 'expected an element with no-unused-vars or no-console rules').to.exist;
    expect(elem.rules['no-unused-vars']).to.equal('warn');
    expect(elem.rules['no-console']).to.equal('off');
  });
});