import React, { useState,useEffect } from 'react'
import {Text,View, TouchableOpacity , Modal ,  Switch,   StyleSheet ,Image  ,TextInput, ToastAndroid ,FlatList} from 'react-native'
import _Header from '../components/_header'
import ImagePicker from 'react-native-image-picker';
import renderItem  from '../components/ListView/OrderItem'
import Category from '../components/MenuItem'
import code from '../assets/code.jpg'
import { ScrollView } from 'react-native'
import axios from 'axios';

const ShoppingCart = () => {
  const [Id,setId] = useState("");
  const [mealName,setMealName] = useState("");
  const [price,setPrice] = useState(0);
  const [OriginPrice,setOriginPrice] = useState(0);
  const [stockCount,setStockCount] = useState(0)
  const [IsAvailable,setIsAvailable] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null);
  let [cartItems, setCartItems] = useState([]); // 用于存储购物车项的状态
  const [DescriptionText, setDescriptionText] = useState('');
  const [selectedCartItem, setSelectedCartItem] = useState(null); // 存储用户选中的购物车项
  const [isMealSold, setIsMealSold] = useState(false); // 初始状态为未销售
  const [menuItems, setMenuItems] = useState([

    // 其他菜单项
  ]);

  const toggleSwitch = () => {
    setIsMealSold(!isMealSold); // 切换状态
  };
  const [modalVisible, setModalVisible] = useState(false);
  const handleShowModal = (item) => {
    setId(item.Id)
    console.log(`view  ${ item.Id }`)
    setModalVisible(true);
    
  };
  const showToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG, // Toast duration (can also use SHORT)
      ToastAndroid.BOTTOM, // Toast position (can also use TOP or CENTER)
      25, // X offset
      50 // Y offset
    );
  };
  const handleClickPostMenu = () =>{
    let foodObj = {
        id:Math.random().toString(36).substr(2, 9),
        foodName:`${mealName}`,
        foodPrice:`${price}$`,
        description:`${DescriptionText}`,
        OriginPrice:`${OriginPrice}$`,
        foodImage:'../assets/burger1.jpg',
        status:'製作中'
    }
      axios.post("https://json-server-vercel-w33n.vercel.app/Menus",foodObj)
      .then((response) => {
        // console.log(response.data.length)
        setMealName("")
        showToast("成功")
        handleClickGetMenu()
      })
      .catch((error) => {
   
      });
  }


  const handleClickGetMenu = () =>{
      axios.get("https://json-server-vercel-w33n.vercel.app/Menus")
      .then((response) => {
        console.log(response.data)
        setMenuItems(response.data)


      })
      .catch((error) => {
   
      });
  }

  const handleClickDeleteMenu = () =>{
    console.log(`delete at ${Id}`)
      axios.delete(`https://json-server-vercel-w33n.vercel.app/Menus/${Id}`)
      .then((response) => {
        console.log(response.data)
        handleClickGetMenu()
      })
      .catch((error) => {
   
      });
  }


  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity >
      <View 
      style={styles.menuItem}  
      onPress={()=>handleShowModal(item)}
      
      >
        {item.image ? (
          <Image source={ {uri: item?.foodImage}} style={styles.itemImage} />
        ) : (
          <Image source={require("../assets/burger1.jpg")} style={styles.itemImage} />
        )}
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item?.foodName}</Text>
          <Text style={styles.itemDescription}>{item?.description}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.originalPrice}>${item?.OriginPrice}</Text>
            <Text style={styles.currentPrice}>${item?.foodPrice}</Text>
          </View>
        </View>
      </View>      
      
      </TouchableOpacity>

    );
  };

 
  cartItems = [
  ];
  useEffect(()=>{
    handleClickGetMenu()
  },[])

  return (
   <View style={{ flex: 1 ,flexDirection:'column'   }}>
    
        <View style={{flex:.1,  }}>
           <_Header hederText="餐點管理" />
        </View>
  
        <View style={{flex:.9,flexDirection:'column'  }} >
            <View style={{flex:.13, padding:5, justifyContent:'center',alignItems:'center'}}>
                <Category />
          
            </View>


        <View style={{flex:.88}}>
        <View style={{width:'95%', }}>

              <FlatList
                data={menuItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />

        
        </View>

        
        </View>
        <View style={{flex:.1 , flexDirection:'column',  }}>

            <TouchableOpacity 
              onPress={handleShowModal}
              style={{ flex:1,borderRadius:5, justifyContent:'center',alignItems:'center', backgroundColor:'orange'}}
            >
              <Text style={{color:'#fff', fontWeight:'900', fontSize:18}}>新增餐點</Text>
            </TouchableOpacity>

         

        </View>
   
        </View>         
      
      <Modal
        animationType="slide"
        transparent={true}
 
        visible={modalVisible}
        onRequestClose={() => {
 
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           <ScrollView style={{width:'90%',}}>
              <Text style={{color:'#000',fontWeight:"900"}}>餐點名稱</Text>
              <TextInput
             
              value={mealName}
              onChangeText={(text) => setMealName(text)}
              style={{color:'#000',borderWidth:1,borderRadius:5,width:'90%'}}
              />

              <Text  style={{color:'#000',fontWeight:"900"}} >原價</Text>
              <TextInput
              value={price}
              onChangeText={(text) => setPrice(text)}
              style={{borderWidth:1,borderRadius:5,width:'90%'}}
              />     
              
              <Text style={{color:'#000',fontWeight:"900"}} >特價</Text>
              <TextInput 
               value={OriginPrice}
               onChangeText={(text) => setOriginPrice(text)}
              style={{color:'#000',borderWidth:1,borderRadius:5,width:'90%'}}
              />
              <Text style={{color:'#000',fontWeight:"900"}} >庫存</Text>
              <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:.1,backgroundColor:'gray'}}>


                </View>
                <View style={{flex:.3,backgroundColor:'orange',justifyContent:'center',alignItems:'center',borderRadius:15}}>
                     <TouchableOpacity style={{backgroundColor:'orange',  }}>
                       <Text style={{color:'black',fontSize:18,color:'white',fontWeight:'900'}}>-</Text>
                     </TouchableOpacity>
                </View>                
                <View style={{flex:.5,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontWeight:'900',fontSize:20}}>1</Text>
                </View>
                <View style={{flex:.3,backgroundColor:'orange',justifyContent:'center',alignItems:'center',borderRadius:15}}>
                     <TouchableOpacity style={{backgroundColor:'orange',  }}>
                       <Text style={{color:'black',fontSize:18,color:'white',fontWeight:'900'}}>+</Text>
                     </TouchableOpacity>
                </View>                
                <View  style={{flex:.1,backgroundColor:'green'}}>
                </View>
              </View>
               

               <View>
                  <Text style={{color:'#000',fontWeight:"900"}} >描述</Text>
                     <TextInput
                      onChangeText={(text) => setDescriptionText(text)}
                  style={styles.textarea}
                  multiline={true}
                  numberOfLines={4} 
                  placeholder="請輸入餐點描述..."
                  value={DescriptionText}
                />
               
               </View>


               <View>
                <Text style={{color:'#000',fontWeight:"900"}}  >是否上架</Text>


                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isMealSold ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isMealSold}
                />
               
               </View>
                <Text style={{color:'#000',fontWeight:"900"}}>餐點圖片</Text>
                {selectedImage && <Image source={selectedImage} style={styles.image} />}

                <TouchableOpacity 
                style={{backgroundColor:'white',borderWidth:1, borderRadius:5, borderColor:'orange'}}
                
                >
                <Text style={{color:'#000',fontWeight:"900"}}>選擇圖片</Text>
                </TouchableOpacity>


            <View style={{flex:1,justifyContent:'center', flexDirection:'row', alignItems:'center',width:"100%"}}>
              <View style={{flex:.4}}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => 
                    {
                       
                      handleClickDeleteMenu()
                    }
                    
                  }>
                  <Text style={styles.textStyle}>刪除</Text>
                </TouchableOpacity>              
              </View>


              <View style={{flex:.1}}>
              
              </View>
              <View style={{flex:.4}}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    handleClickPostMenu();
                  }}>
                  <Text style={styles.textStyle}>新增</Text>
                </TouchableOpacity>                
              </View>
         
           </View>


           </ScrollView>





           {/**
          
            <View style={{flex:1,justifyContent:'center', flexDirection:'row', alignItems:'center',width:"90%",backgroundColor:'green'}}>
              <View style={{flex:.4}}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>新增</Text>
                </TouchableOpacity>              
              </View>


              <View style={{flex:.1}}>
              
              </View>
              <View style={{flex:.4}}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>新增</Text>
                </TouchableOpacity>                
              </View>
         
           </View>
          
          */}
         


  

          </View>
        </View>
      </Modal>
    
    </View>
  )
}


const styles = StyleSheet.create({
  emptyCartText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: 'orange',
    fontSize: 16,
  },  

  modalView: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'orange',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color:'black',
    fontSize:25,
    marginBottom: 15,
    textAlign: 'center',
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },  
  menuItem: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'black'
  },
  itemDescription: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    marginRight: 10,
    color:'black'
  },
  currentPrice: {
    fontSize: 16,
    color: 'green',
  },


});

export default ShoppingCart