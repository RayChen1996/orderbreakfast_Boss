import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import OrderPage from './Order';
import ShoppingCart from './ShoppingCart';
import Login from './Login';
import OrderManage from './MyOrderProgress';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Tab = createBottomTabNavigator();
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({})}
        activeColor="orange" // 在这里设置选中选项卡的颜色
        barStyle={{backgroundColor: 'white'}}>
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarLabel: '接單管理',
            tabBarIcon: ({color, size}) => (
              <Icon name="home" size={size} color={color} />
            ),
            unmountOnBlur: true,
          }}
          name="接單管理"
          component={OrderPage}
        />
        <Tab.Screen
          name="餐點管理"
          component={ShoppingCart}
          options={{
            headerShown: false,
            tabBarLabel: '餐點管理',
            tabBarIcon: ({color, size}) => (
              <Icon name="cutlery" size={size} color={color} />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="顧客Q&A"
          component={OrderManage}
          options={{
            tabBarLabel: '顧客Q&A',
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="question" size={size} color={color} />
            ),
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const style = StyleSheet.create({
  headers: {},
});

export default Home;
