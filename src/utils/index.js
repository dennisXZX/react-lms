export function truncate(s, maxLen) {
  if (s.length <= maxLen) {
    return s;
  }
  return `${s.substring(0, maxLen)}...`;
}