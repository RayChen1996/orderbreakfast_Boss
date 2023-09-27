import React from 'react';
import {View,Text, StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

import OrderPage from './Order'
import ShoppingCart from './ShoppingCart';
import Login from './Login';
import OrderManage from './MyOrderProgress'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();


const Home = () => {
  return (
    <NavigationContainer>

        <Tab.Navigator 
            screenOptions={({ route }) => ({
       
            })}
            
            activeColor='orange' // 在这里设置选中选项卡的颜色
   

            barStyle={{ backgroundColor: 'white' }}
        >
        <Tab.Screen name="接單管理" component={OrderPage}  />
        <Tab.Screen name="餐點管理" component={ShoppingCart}  />
        <Tab.Screen name="顧客Q&A" component={OrderManage} />
 

        </Tab.Navigator>
    </NavigationContainer>
  )
}



const style = StyleSheet.create({
    headers:{

    },

})

export default Home