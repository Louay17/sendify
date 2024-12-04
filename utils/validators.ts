export const isNumber = (text?: string | number | null) => {
  if (text === undefined || text === null) return false;
  return /^[+-]?\d+(\.\d+)?$/.test(`${text}`);
};
