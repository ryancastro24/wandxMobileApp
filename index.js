
import 'react-native-gesture-handler';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './src/App';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Main() {
  return (
    <SafeAreaProvider>
        <PaperProvider>
            <App />
        </PaperProvider>
    </SafeAreaProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);