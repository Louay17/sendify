import { isNumber } from "./validators";

export function maskPhoneNumber(value: number): string {
  if (typeof value !== 'number' || isNaN(value)) {
    console.error('Input must be a valid number.');
    return `${value}`;
  }

  const phoneStr = value.toString();

  if (phoneStr.length < 7) {
    console.error('Phone number must be at least 8 digits long.');
    return `${value}`;
  }

  const part1 = phoneStr.slice(0, 2);
  const part2 = phoneStr.slice(2, -2).replace(/./g, '*');
  const part3 = phoneStr.slice(5, -1).replace(/./g, '*') + phoneStr.slice(-2);

  return `${part1} ${part2} ${part3}`;
}

export function formatAmount(amount?: number | string): string {
  if (!amount || !isNumber(amount)) {
    return '0.000';
  }

  // Format the number
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(Number(amount) / 1000); // Divide by 1000 to format as per the requirement

  return formatted;
}

export function unformatAmount(formattedAmount: string): number {
  if (typeof formattedAmount !== 'string') {
    console.error('Invalid formatted amount.');
    return NaN;
  }
  // Remove commas and parse the string back to a number
  const normalizedAmount = formattedAmount.replace(/,/g, '');
  const result = parseFloat(normalizedAmount) * 1000;

  if (isNaN(result)) {
    console.error('Failed to parse the formatted amount.');
    return NaN;
  }

  return result;
}
