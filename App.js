import './src/utils/ignoreWarnings';
import 'react-native-gesture-handler';
import React, {useEffect, useState, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Image, View, Text} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import axios from 'axios';
import {navigationRef} from './src/RootNavigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from './src/context/AuthContext';
import {fetchProfile, selectErrorMessage} from './src/features/user/userSlice';
import {useSelector, useDispatch} from 'react-redux';
import {firebase} from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import ConfirmOTPScreen from './src/screens/auth/ConfirmOTPScreen';
import TermsOfUseScreen from './src/screens/auth/TermsOfUseScreen';
import ForgotPassScreen from './src/screens/auth/ForgotPassScreen';
import RequestScreen from './src/screens/request/RequestScreen';
import RequestDetailScreen from './src/screens/request/RequestDetailScreen';
import RequestHistoryScreen from './src/screens/request/RequestHistoryScreen';
import ChoosePaymentMethodScreen from './src/screens/request/ChoosePaymentMethodScreen';
import AddAddressScreen from './src/screens/address/AddAddressScreen';
import AddressListScreen from './src/screens/address/AddressListScreen';
import EditAddressScreen from './src/screens/address/EditAddressScreen';
import ChangePasswordScreen from './src/screens/profile/ChangePasswordScreen';
import HomeScreen from './src/screens/main/HomeScreen';
import SearchScreen from './src/screens/main/SearchScreen';
import NotificationScreen from './src/screens/main/NotificationScreen';
import ProfileScreen from './src/screens/main/ProfileScreen';
import CategoryListScreen from './src/screens/main/CategoryListScreen';
import ServiceListScreen from './src/screens/main/ServiceListScreen';
import ServicePriceScreen from './src/screens/main/ServicePriceScreen';
import Toast from 'react-native-toast-message';
import ProfileInfoScreen from './src/screens/profile/ProfileInfoScreen';
import RepairerProfileScreen from './src/screens/profile/RepairerProfileScreen';
import EditProfileInfoScreen from './src/screens/profile/EditProfileInfoScreen';
import FeedbackScreen from './src/screens/feedback/FeedbackScreen';
import CommentScreen from './src/screens/feedback/CommentScreen';
import PickVoucherCodeScreen from './src/screens/voucher/PickVoucherCodeScreen';
import ChatListScreen from './src/screens/chat/ChatListScreen';
import ChatScreen from './src/screens/chat/ChatScreen';
import {Provider} from 'react-redux';
import InvoiceScreen from './src/screens/request/InvoiceScreen';
import {
  requestUserPermission,
  notificationListener,
} from './src/notification/PushNotification';
import {store} from './src/features/store';
import useAxios from './src/hooks/useAxios';
import linking from './global/Linking';

const toastConfig = {
  customToast: ({text1}) => (
    <View
      style={{
        height: 'auto',
        backgroundColor: '#56CA76',
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        width: '92%',
        paddingVertical: 20,
        paddingHorizontal: 10,
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 16,
          color: 'white',
          textAlign: 'center',
          flexWrap: 'wrap',
        }}>
        {text1}
      </Text>
    </View>
  ),
  customErrorToast: ({text1}) => (
    <View
      style={{
        height: 'auto',
        backgroundColor: 'red',
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        width: '92%',
        paddingVertical: 20,
        paddingHorizontal: 10,
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 16,
          color: 'white',
          textAlign: 'center',
          flexWrap: 'wrap',
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
  const errorMessage = useSelector(selectErrorMessage);
  const dispatch = useDispatch();
  const customerAPI = useAxios();

  let {state, TryLocalLogin, clearErrorMessage} = useContext(AuthContext);
  useEffect(() => {
    TryLocalLogin();
    requestUserPermission();
    notificationListener();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [TryLocalLogin]);
  useEffect(() => {
    if (state.token) {
      const getUserProfile = async () => {
        await dispatch(fetchProfile(customerAPI));
        if (errorMessage) {
          Toast.show({
            type: 'customErrorToast',
            text1: errorMessage,
          });
        }
      };
      const saveFCMToken = async () => {
        const fcmToken = await AsyncStorage.getItem('fcmtoken');
        const token = await AsyncStorage.getItem('token');
        console.log('fcmToken', fcmToken);
        console.log('accessToken', token);
        axios
          .post(
            'http://localhost:8080/api/v1/user/saveFCMToken',
            {
              token: fcmToken,
            },
            {
              headers: {
                Authorization: `Bearer ${state.token}`,
              },
            },
          )
          .then(function (response) {
            console.log('save token success');
            console.log(response);
          })
          .catch(err => {
            console.log('save token error: ', err);
          });
      };
      getUserProfile();
      saveFCMToken();
    }
  }, [state.token]);

  useEffect(() => {
    const userId = state.userId;
    if (userId) {
      console.log('userId: ', userId);
      const reference = firebase
        .app()
        .database(
          'https://flix-cb844-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref(`/online/${userId}`);

      // Set the /users/:userId value to true
      reference
        .set(true)
        .then(() => console.log('Online presence set'))
        .catch(err => console.log(err));

      // Remove the node whenever the client disconnects
      reference
        .onDisconnect()
        .remove()
        .then(() => console.log('On disconnect function configured.'));
    }
  }, [state.userId]);
  if (isLoading) {
    return <SplashScreen />;
  }

  function HomeStackScreen() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="CategoryListScreen"
          component={CategoryListScreen}
        />
        <Stack.Screen name="ServiceListScreen" component={ServiceListScreen} />
        <Stack.Screen
          name="ServicePriceScreen"
          component={ServicePriceScreen}
        />
        <Stack.Screen name="RequestScreen" component={RequestScreen} />
        <Stack.Screen name="AddressListScreen" component={AddressListScreen} />
        <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} />
        <Stack.Screen name="EditAddressScreen" component={EditAddressScreen} />
        <Stack.Screen
          name="PickVoucherCodeScreen"
          component={PickVoucherCodeScreen}
        />
        <Stack.Screen
          name="ChoosePaymentMethodScreen"
          component={ChoosePaymentMethodScreen}
        />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
      </Stack.Navigator>
    );
  }

  function ProfileStackScreen() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="ProfileInfoScreen" component={ProfileInfoScreen} />
        <Stack.Screen
          name="EditProfileInfoScreen"
          component={EditProfileInfoScreen}
        />
        <Stack.Screen name="AddressListScreen" component={AddressListScreen} />
        <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} />
        <Stack.Screen name="EditAddressScreen" component={EditAddressScreen} />
        <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
        />
      </Stack.Navigator>
    );
  }
  const ChatStackScreen = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    );
  };

  function RequestHistoryStackScreen() {
    return (
      <Stack.Navigator
        initialRouteName="RequestHistoryScreen"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen
          name="RequestHistoryScreen"
          component={RequestHistoryScreen}
        />
        <Stack.Screen
          name="ServicePriceScreen"
          component={ServicePriceScreen}
        />
        <Stack.Screen
          name="RequestDetailScreen"
          component={RequestDetailScreen}
        />
        <Stack.Screen name="InvoiceScreen" component={InvoiceScreen} />
        <Stack.Screen name="CommentScreen" component={CommentScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen
          name="RepairerProfileScreen"
          component={RepairerProfileScreen}
        />
      </Stack.Navigator>
    );
  }

  return !state.token ? (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
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
          <Stack.Screen name="TermsOfUseScreen" component={TermsOfUseScreen} />
          <Stack.Screen name="ConfirmOTPScreen" component={ConfirmOTPScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast
        config={toastConfig}
        position="bottom"
        visibilityTime={2000}
        bottomOffset={90}
      />
    </>
  ) : (
    <>
      <NavigationContainer ref={navigationRef} linking={linking}>
        <Tab.Navigator
          initialRouteName="HomeStackScreen"
          tabBarOptions={{
            showLabel: false,
            keyboardHidesTabBar: true,
            style: {
              backgroundColor: '#FEC54B',
            },
          }}
          screenOptions={({route}) => ({
            tabBarShowLabel: false,
            unmountOnBlur: true,
            headerShown: false,
            tabBarStyle: {
              height: 50,
            },
            tabBarIcon: ({focused, size, color}) => {
              let icon;
              if (route.name === 'HomeStackScreen') {
                icon = focused
                  ? require('./assets/images/type/home-active.png')
                  : require('./assets/images/type/home.png');
              } else if (route.name === 'RequestHistoryStackScreen') {
                icon = focused
                  ? require('./assets/images/type/archive-active.png')
                  : require('./assets/images/type/archive.png');
              } else if (route.name === 'Notification') {
                icon = focused
                  ? require('./assets/images/type/bell-ring-active.png')
                  : require('./assets/images/type/bell-ring.png');
              } else if (route.name === 'ProfileStackScreen') {
                icon = focused
                  ? require('./assets/images/type/user-profile-active.png')
                  : require('./assets/images/type/user-profile.png');
              } else if (route.name === 'ChatStackScreen') {
                icon = focused
                  ? require('./assets/images/type/messenger-active.png')
                  : require('./assets/images/type/messenger.png');
              }
              return <Image style={{height: 24, width: 24}} source={icon} />;
            },
          })}>
          <Tab.Screen name="HomeStackScreen" component={HomeStackScreen} />
          <Tab.Screen
            name="RequestHistoryStackScreen"
            component={RequestHistoryStackScreen}
          />
          <Tab.Screen name="Notification" component={NotificationScreen} />
          <Tab.Screen name="ChatStackScreen" component={ChatStackScreen} />
          <Tab.Screen
            name="ProfileStackScreen"
            component={ProfileStackScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
export default () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <App />
        <Toast
          config={toastConfig}
          position="bottom"
          visibilityTime={2000}
          bottomOffset={90}
        />
      </Provider>
    </AuthProvider>
  );
};
