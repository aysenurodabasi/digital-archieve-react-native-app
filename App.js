import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Search from './src/screens/Search';
import AddLink from './src/screens/AddLink';
import Calendar from './src/screens/Calendar';
import Profile from './src/screens/Profile';
import ListDetail from './src/screens/ListDetail';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import SplashPage from './src/screens/SplashPage';
import ForgotPassword from './src/screens/ForgotPassword';

import Icons from './src/components/icons';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from "redux-thunk";
import reducers from './src/redux/reducers/index';

import Images from './src/themes/images';

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SearchStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const AddLinkStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function mainNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? Images.HomeActive : Images.HomeInactive;
          } else if (route.name === 'Search') {
            iconName = focused ? Images.SearchActive : Images.SearchInactive;
          } else if (route.name === 'Profile') {
            iconName = focused ? Images.ProfileActive : Images.ProfileInactive;
          } else if (route.name === 'Calendar') {
            iconName = focused
              ? Images.CalendarActive
              : Images.CalendarInactive;
          } else if (route.name === 'AddLink') {
            iconName = focused ? Images.AddActive : Images.AddInactive;
          }
          return <Icons name={iconName} color={color} />;
        },
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: 'grey',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Calendar" component={CalendarStackScreen} />
      <Tab.Screen name="AddLink" component={AddLinkStackScreen} />
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Search" component={SearchStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={'Home'} component={Home} />
      <HomeStack.Screen name={'ListDetail'} component={ListDetail} />
    </HomeStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
}

function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={Search} />
    </SearchStack.Navigator>
  );
}

function CalendarStackScreen() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen name="Calendar" component={Calendar} />
    </CalendarStack.Navigator>
  );
}

function AddLinkStackScreen() {
  return (
    <AddLinkStack.Navigator>
      <AddLinkStack.Screen name="AddLink" component={AddLink} />
    </AddLinkStack.Navigator>
  );
}

export default function App() {
  const store = createStore(reducers, {} , applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="SplashPage">
          <MainStack.Screen
            name="SplashPage"
            component={SplashPage}
            options={{
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name="Register"
            component={Register}
            options={{
              title: null
            }}
          />
           <MainStack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              title: null
            }}
          />
          <MainStack.Screen
            name="MainNavigator"
            component={mainNavigator}
            options={{
              headerShown: false,
            }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
