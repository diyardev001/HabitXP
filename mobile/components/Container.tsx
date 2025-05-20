import { ReactNode } from 'react';
import {
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import useTheme from '@/hooks/useTheme';

type Props = {
  children: ReactNode;
  style?: ViewStyle;
};

export default function Container({ children, style }: Readonly<Props>) {
  const colors = useTheme();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: colors.background }]}
      >
        <View style={[styles.inner, style]}>{children}</View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  inner: {
    flex: 1,
    marginHorizontal: 10,
  },
});
