import 'react-native-gesture-handler';
import React, {useEffect, useState, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Image, View, Text, Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './src/RootNavigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  Provider as AuthProvider,
  Context as AuthContext,
} from './src/context/AuthContext';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import ConfirmOTPScreen from './src/screens/auth/ConfirmOTPScreen';
import TermsOfUseScreen from './src/screens/auth/TermsOfUseScreen';
import ForgotPassScreen from './src/screens/auth/ForgotPassScreen';
import RequestScreen from './src/screens/request/RequestScreen';
import RequestDetailScreen from './src/screens/request/RequestDetailScreen';
import ChoosePaymentMethodScreen from './src/screens/request/ChoosePaymentMethodScreen';
import RequestHistoryScreen from './src/screens/request/RequestHistoryScreen';
import AddAddressScreen from './src/screens/address/AddAddressScreen';
import AddressListScreen from './src/screens/address/AddressListScreen';
import EditAddressScreen from './src/screens/address/EditAddressScreen';

import HomeScreen from './src/screens/main/HomeScreen';
import NotificationScreen from './src/screens/main/NotificationScreen';
import ProfileScreen from './src/screens/main/ProfileScreen';
import MajorListScreen from './src/screens/main/MajorListScreen';
import ServiceListScreen from './src/screens/main/ServiceListScreen';
import ServicePriceScreen from './src/screens/main/ServicePriceScreen';
import Toast from 'react-native-toast-message';

import {
  requestUserPermission,
  notificationListener,
} from './src/notification/PushNotification';

const {width} = Dimensions.get('window');
const toastConfig = {
  customToast: ({text1}) => (
    <View
      style={{
        height: 60,
        backgroundColor: '#56CA76',
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 18,
          color: 'white',
        }}>
        {text1}
      </Text>
    </View>
  ),
};

function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const [isLoading, setIsLoading] = useState(true);
  let {state, TryLocalLogin, clearErrorMessage} = useContext(AuthContext);
  useEffect(() => {
    // TryLocalLogin();
    requestUserPermission();
    notificationListener();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [TryLocalLogin]);
  if (isLoading) {
    return <SplashScreen />;
  }

  function HomeStackScreen() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MajorListScreen" component={MajorListScreen} />
        <Stack.Screen name="ServiceListScreen" component={ServiceListScreen} />
        <Stack.Screen
          name="ServicePriceScreen"
          component={ServicePriceScreen}
        />
        <Stack.Screen name="OrderScreen" component={OrderScreen} />
      </Stack.Navigator>
    );
  }

  return !state.token ? (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {/* <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} /> */}
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            listeners={{
              focus: e => {
                if (state.errorMessage !== '') {
                  clearErrorMessage();
                }
              },
            }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            listeners={{
              focus: e => {
                if (state.errorMessage !== '') {
                  clearErrorMessage();
                }
              },
            }}
          />
          <Stack.Screen
            name="ForgotPassScreen"
            component={ForgotPassScreen}
            listeners={{
              focus: e => {
                if (state.errorMessage !== '') {
                  clearErrorMessage();
                }
              },
            })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen
              name="RequestHistory"
              component={RequestHistoryScreen}
            />
            <Tab.Screen name="Notification" component={NotificationScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              listeners={{
                focus: e => {
                  if (state.errorMessage !== '') {
                    clearErrorMessage();
                  }
                },
              }}
            />
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              listeners={{
                focus: e => {
                  if (state.errorMessage !== '') {
                    clearErrorMessage();
                  }
                },
              }}
            />
            <Stack.Screen
              name="ForgotPassScreen"
              component={ForgotPassScreen}
              listeners={{
                focus: e => {
                  if (state.errorMessage !== '') {
                    clearErrorMessage();
                  }
                },
              }}
            />
            <Stack.Screen
              name="TermsOfUseScreen"
              component={TermsOfUseScreen}
            />
            <Stack.Screen
              name="ConfirmOTPScreen"
              component={ConfirmOTPScreen}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <Toast
        config={toastConfig}
        position="bottom"
        visibilityTime={2500}
        bottomOffset={90}
      />
    </>
  );
}
export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
