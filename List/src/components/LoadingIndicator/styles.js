import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  relativeLoader: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    flex: 1,
  },
  absoluteLoader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    flex: 1,
  },
});

export default styles;
