export const isNumber = (text?: string | number | null) =>
  text !== undefined && text !== null ? RegExp(/^\d+$/).test(`${text}`) : false;
