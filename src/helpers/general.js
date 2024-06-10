export const addEllipsis = (word, charsLimit) => {
  if (word?.length > (charsLimit || 15)) {
    return word.slice(0, charsLimit || 15) + '...';
  }
  return word || '';
};
