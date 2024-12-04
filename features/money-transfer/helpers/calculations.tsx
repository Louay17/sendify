import { FEE_DISCOUNT_THRESHOLD, FEE_MAX_CAP } from '../constants';

export const calculateFees = (amount: number) => {
  if (!amount) return 0;
  if (amount < FEE_DISCOUNT_THRESHOLD) {
    return 5; // apply the discount (5 millimes)
  }
  const fee = amount * 0.01;
  return fee > FEE_MAX_CAP ? FEE_MAX_CAP : fee;
};
