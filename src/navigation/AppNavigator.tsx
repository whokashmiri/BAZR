import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import IntroScreen from '../screens/IntroScreen;';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
       {/* <Stack.Screen name="Intro" component={IntroScreen} /> */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;