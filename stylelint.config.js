module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines'],
  plugins: ['stylelint-scss', 'stylelint-no-unsupported-browser-features'],
  defaultSeverity: 'warning',
  rules: {
    'scss/at-extend-no-missing-placeholder': true,
    'plugin/no-unsupported-browser-features': [
      true,
      {
        'ignore': [],
        'severity': 'warning'
      }
    ]
  }
}
