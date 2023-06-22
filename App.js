import MainDisplay from './main/MainDisplay';
import { Store } from './redux/store';
import { Provider } from 'react-redux';
import {useFonts} from 'expo-font'
import { useCallback } from 'react';

// import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [fontsLoaded] = useFonts({
    'NotoSansThaiMedium': require('./assets/Font_NotoSansThai/NotoSansThai-Medium.ttf'),
    'NotoSansThaiBlack': require('./assets/Font_NotoSansThai/NotoSansThai-Black.ttf'),
    'NotoSansThaiBold': require('./assets/Font_NotoSansThai/NotoSansThai-Bold.ttf'),
    'NotoSansThaiLight': require('./assets/Font_NotoSansThai/NotoSansThai-Light.ttf'),
    'NotoSansThaiRegular': require('./assets/Font_NotoSansThai/NotoSansThai-Regular.ttf'),
    'NotoSansThaiSemiBold': require('./assets/Font_NotoSansThai/NotoSansThai-SemiBold.ttf'),
    'NotoSansThaiThin': require('./assets/Font_NotoSansThai/NotoSansThai-Thin.ttf'),
    
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  
  if (!fontsLoaded) {
    return null;
  }
  return (
      <Provider store={Store}>
        <MainDisplay/>
      </Provider>
  );
}

