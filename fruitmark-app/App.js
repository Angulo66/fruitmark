import { NativeWindStyleSheet } from 'nativewind';
import AppNavigator from './src/AppNavigator';

export default function App() {
  return (
    <>
      <AppNavigator />
    </>
  );
}

NativeWindStyleSheet.setOutput({
  default: 'native',
});
