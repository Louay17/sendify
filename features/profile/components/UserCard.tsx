import { Image } from 'expo-image';

import { scale } from '@/utils/responsive';
import { Box, makeStyles, Text } from '@/theme';
import { maskPhoneNumber } from '@/utils/formatter';

type Props = {
  avatar: string;
  fullname: string;
  phoneNumber: number;
};

const UserCard = ({ avatar, fullname, phoneNumber }: Props) => {
  const styles = useStyles();
  return (
    <Box flexDirection="row" alignItems="center" gap="xs_4">
      <Image source={avatar} contentFit="contain" style={styles.avatar} />
      <Box gap="xs_4">
        <Text variant="type_general_subtitle1" color="text_title" textTransform="capitalize">
          {fullname}
        </Text>
        <Text variant="type_general_body2" color="text_subtitle" textTransform="capitalize">
          {maskPhoneNumber(phoneNumber)}
        </Text>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  avatar: {
    width: scale(72),
    height: scale(72),
    borderWidth: scale(1),
    borderRadius: theme.borderRadii.xl_100,
    borderColor: theme.colors.border_neutral,
  },
}));

export default UserCard;
