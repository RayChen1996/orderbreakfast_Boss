import {View,Text,Image,TouchableOpacity} from 'react-native'
import burger1 from '../../assets/burger1.jpg'
import cookie from '../../assets/egg1.jpg';






const OrderItem = ({ item , onItemClick }) => (
    
  <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, }}>

    <View style={{ flex: .8, marginLeft: 10, }}>
      <Text style={{color:'black',fontSize:18,fontWeight:"bold"}}>{item.foodName}</Text>

      <Text style={{color:'gray',fontSize:14}}>{item.description}</Text>
      <Text style={{color:'black',}}> 
      
      ${item.foodPrice} 
        <Text style={{ color: 'gray', textDecorationLine: 'line-through' }}>
        {item.OriginPrice}
        </Text>
      </Text>

      <View style={{flex:1,flexDirection:'row'}}>

      <View style={{flex:.333}}>
      
      
      
      </View>
      <View style={{flex:.333}}>
        
      </View>
      <View  style={{flex:.333}}>
         
      
      </View>
      </View>

    </View>

    <View style={{ flex: .39 ,  }}>
      <Image
        style={{ width: 80,marginRight:5, paddingRight:15, height: 80, resizeMode: 'cover',borderRadius:15,margin:5 }}
        source={item.foodImage === 'burger' ? burger1 : cookie}
      />
        <TouchableOpacity  onPress={onItemClick}  
      
        
        
        style={{ position: 'absolute', right: 5, bottom: 5 }}>
    
            <View style={{ backgroundColor: 'red', width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 20 }}>-</Text>
            </View>
            </TouchableOpacity>      
    </View>
    
    
  </View>
  );

  export default OrderItem;