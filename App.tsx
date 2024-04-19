import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppRouter from "./src/navigators/AppRouter";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppRouter />
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}
