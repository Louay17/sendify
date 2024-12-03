import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions from the design
const baseWidth = 393;
const baseHeight = 852;

const scale = (size: number): number => {
  const scale = SCREEN_WIDTH / baseWidth;
  return PixelRatio.roundToNearestPixel(size * scale);
};

const verticalScale = (size: number): number => {
  const scale = SCREEN_HEIGHT / baseHeight;
  return PixelRatio.roundToNearestPixel(size * scale);
};

const widthPercentageToDP = (widthPercent: number | string): number => {
  const elemWidth =
    typeof widthPercent === 'number'
      ? widthPercent
      : parseFloat((widthPercent as string).replace('%', ''));

  if (isNaN(elemWidth)) {
    throw new Error('Invalid width percentage. Use format "number%" or a number.');
  }

  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemWidth) / 100);
};

const heightPercentageToDP = (heightPercent: number | string): number => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat((heightPercent as string).replace('%', ''));

  if (isNaN(elemHeight)) {
    throw new Error('Invalid height percentage. Use format "number%" or a number.');
  }

  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / 100);
};

export { scale, verticalScale as vs, widthPercentageToDP as wp, heightPercentageToDP as hp };
