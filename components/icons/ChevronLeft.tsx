import Svg, { Path, SvgProps } from 'react-native-svg';

import { makeStyles } from '@/theme';
import { scale } from '@/utils/responsive';

const ChevronLeftIcon = (props: SvgProps & { color?: string }) => {
  const styles = useStyles();

  return (
    <Svg width={scale(9)} height={scale(14)} viewBox="0 0 9 14" fill="none" {...props}>
      <Path
        d="M0.999951 7.8L6.69995 13.4C7.09995 13.8 7.69995 13.8 8.09995 13.4C8.49995 13 8.49995 12.4 8.09995 12L3.19995 7L8.09995 2C8.49995 1.6 8.49995 0.999999 8.09995 0.599999C7.89995 0.399999 7.69995 0.299999 7.39995 0.299999C7.09995 0.299999 6.89995 0.399999 6.69995 0.599999L0.999951 6.2C0.599951 6.7 0.599951 7.3 0.999951 7.8C0.999951 7.7 0.999951 7.7 0.999951 7.8Z"
        fill={props?.color || styles.fillColor}
      />
    </Svg>
  );
};

const useStyles = makeStyles(theme => ({
  fillColor: theme.colors.icon_default,
}));

export default ChevronLeftIcon;
