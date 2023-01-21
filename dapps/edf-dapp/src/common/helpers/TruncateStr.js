export function truncateStr(source, start = 4, end = 4) {
  if (!source) {
    return source;
  }
  const len = source.length;
  if (len <= start + end) {
    return source;
  }
  return `${source.substring(0, start)}...${source.substring(len - end)}`;
}
