 
 import {View,Text,Image,TouchableOpacity,Alert } from 'react-native'
 import burger1 from '../../assets/burger1.jpg'
 import cookie from '../../assets/egg1.jpg';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import * as Progress from 'react-native-progress';
import { color } from 'react-native-elements/dist/helpers';
  const handleViewItemPress = () => {
    // 弹出警告消息
    Alert.alert('餐點訊息', `您點選的是`);

  };
    const addMenuItem = (newItem) => {
    // 从JSON文件中读取数据
    const newMenuItem = {
        foodName: 'New',
        foodPrice: 150,
        description: 'New',
        OriginPrice: 50,
        foodImage: '',
    };
    const menuData = require('../../data/cart.json')

    // 生成一个新的唯一ID，你可以根据实际需求创建唯一ID
    const newId = menuData.length + 1;

    // 创建新的菜单项
    const newMenu = {
        id: newId,
        ...newItem,
    };

    // 将新菜单项添加到数据数组
    menuData.push(newMenu);

    // 将更新后的数据写回到JSON文件
    // fs.writeFileSync('../../data/cart.json', JSON.stringify(menuData, null, 2));
    }


   const handleCheckItemPress = () => {
      addMenuItem()
     Alert.alert('餐點訊息', `已經新增訂單`);

  };



const renderItem = ({ item }) => (
  <TouchableOpacity onPress={handleViewItemPress}>
  <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, }}>

    <View style={{ flex: .8, marginLeft: 10,padding:5 }}>
      <Text style={{color:'black',fontSize:18,fontWeight:"bold"}}>{item.foodName}</Text>

      <Text style={{color:'gray',fontSize:14}}>{item.description}</Text>
      <Text style={{color:'black',}}> 
      
         ${item.foodPrice} 
   
        <Text style={{ color: 'gray', paddingLeft:5, marginLeft:10, textDecorationLine: 'line-through' }}>
        {item.OriginPrice}
        </Text>
     
      </Text>

      <View style={{flex:1,flexDirection:'row'  }}>

            <View style={{flex:.333}}>
             
            
            </View>
            <View style={{flex:.333}}>
                
            </View>
            <View  style={{flex:.333}}>
                
            
            </View>
      </View>

    </View>







<View style={{ flex: 0.39, marginRight:15, paddingRight:15, justifyContent: 'center', alignItems: 'center' }}>
  {item.status === "製作中" ? (
    <View>
      <Progress.Bar progress={0.45} />
      <Text style={{color:'black'}}>製作中</Text>  
    </View>
  ) : (
    <Text style={{ transform: [{ rotate: '45deg' }],color:'#ccc',borderWidth:1,padding:10,borderColor:'#ccc' }}>已完成</Text>  
  )}
</View>

    
    
  </View>
  </TouchableOpacity>
);

  export default renderItem;