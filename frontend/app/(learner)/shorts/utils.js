export const formatNumber = n =>
  n >= 1_000_000 ? (n / 1_000_000).toFixed(1) + 'M'
: n >= 1_000     ? (n / 1_000).toFixed(1) + 'K'
: n.toString();