import users from '@/features/profile/mocks/users';

export const useReceiver = ({ id }: { id: string }) => {
  const receiver = users.find(user => user.id === id);

  return receiver;
};
