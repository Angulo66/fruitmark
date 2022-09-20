import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAtom } from 'jotai';
import Dashboard, { dashboardAtom } from './components/Dashboard';
import TransferFruits from './components/TransferFruits';
import Login from './components/Login';
import { cityFruitsRenderAtom } from './hooks/useCityFruits';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  const [dash, setDash] = useAtom(dashboardAtom);
  const [update, setUpdate] = useAtom(cityFruitsRenderAtom);

  function updateDashStatus() {
    setDash(!dash);
    setUpdate(!update);
  }

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        listeners={{
          tabPress: (e) => {
            updateDashStatus();
          },
        }}
      />
      <Tab.Screen name="Transfer" component={TransferFruits} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="App"
          component={App}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
