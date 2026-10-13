function checkCategories(password) {
  return {
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    digit: /\d/.test(password),
    symbol: /[^\w\s]/.test(password)
  };
}

function strength(password) {
  const cats = checkCategories(password);
  const categories = Object.values(cats).filter(Boolean).length;
  if (password.length >= 12 && categories === 4) return 'forte';
  if (password.length >= 8 && categories >= 3) return 'média';
  return 'fraca';
}

if (require.main === module) {
  const pwd = process.argv[2] || '';
  console.log(`Força: ${strength(pwd)}`);
}

module.exports = { strength };