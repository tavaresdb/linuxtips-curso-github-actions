const { strength } = require('../index');

describe('strength()', () => {
  it('classifica senha forte', () => {
    expect(strength('Str0ngP@ssw0rd!')).toBe('forte');
  });

  it('classifica senha média', () => {
    expect(strength('Medium123!')).toBe('média');
  });

  it('classifica senha fraca', () => {
    expect(strength('abc')).toBe('fraca');
  });

  it('distingue entre média e fraca pelo tamanho', () => {
    expect(strength('Abc1!')).toBe('fraca');
    expect(strength('Abcdef1!')).toBe('média');
  });
});