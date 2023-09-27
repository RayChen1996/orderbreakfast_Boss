import React, { useState,useEffect } from 'react'
import {View,Text, FlatList,Modal,StyleSheet,Image,TouchableOpacity, Alert,ProgressBarAndroid} from 'react-native'
import _Header from '../components/_header'
import Category from '../components/Category'
import BreakfastCategory  from '../components/BreakfastCategory'
import renderItem  from '../components/ListView/foodItem'
import menuData from '../../src/data/cart.json';
import ProgressCircle from '../components/ProgressCircle';
import * as Progress from 'react-native-progress';
import CustomLoader from '../components/CustomLoader';
import axios from 'axios';
 import burger1 from '../assets/burger1.jpg'
   import cookie from '../assets/egg1.jpg';
const Order = () => {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

 const [selectedOrder, setSelectedOrder] = useState(null);
    const orderProgress = 0.5; // 0表示刚开始，1表示完成
    const [allMenu,setAllMenu] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [showCatrgory,setShowCatrgory] = useState(false);
   

  const handleOrderPress = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };
  const handleConfirmOrder = () => {
    // 在这里执行确认制单中的逻辑
    // 可以向后端发送请求以更新订单状态等
    // 然后关闭模态框
    setModalVisible(false);
  };
  const handleClickGetMenu = () =>{
      axios.get("https://json-server-vercel-w33n.vercel.app/Orders")
      .then((response) => {
        console.log(response.data)
        setOrders(response.data)
        





      })
      .catch((error) => {
   
      });
  }




  const closeModal = () => {
    setModalVisible(false);
  };

    let menu  = [
  
    ]

    const [orders, setOrders] = useState([

    ]);


    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity onPress={() => handleOrderPress(item)} >
        
        <View style={styles.orderItem}>
          <Image source={require("../assets/burger1.jpg")} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.M_Name}</Text>
            <Text style={styles.orderTime}>{item.M_DT}</Text>
            <Text style={styles.orderType}> {item.OrderType?"現場候位":"網路訂餐"}</Text>
          </View>
        </View>        
        
        </TouchableOpacity>

      );
    };



    menu = menuData
    console.log(menuData); 
  useEffect(() => {
    handleClickGetMenu()
  }, [loading, progress]);
 


  return (
    <View style={{ flex: 1 ,flexDirection:'column'   }}>
    
        <View style={{flex:.1, }}>
           <_Header hederText="接單管理" />
        </View>
  
        <View style={{flex:.9,  }} >
            <View style={{flex:.13, padding:5, justifyContent:'center',alignItems:'center'}}>
                <Category />
          
            </View>

            <View style={{flex:.87, }}>
             
                <FlatList
                  data={orders}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                />
                      
            
            </View>

            
         
     
        </View>         
    
 
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
             <View style={styles.modalContainer}>
          <Image source={selectedOrder?.image} style={styles.modalImage} />
          <Text style={styles.modalItemName}>{selectedOrder?.name}</Text>
          <Text style={styles.modalItemDescription}>{selectedOrder?.description}</Text>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
            <Text style={styles.confirmButtonText}>確定製單中</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>關閉</Text>
          </TouchableOpacity>
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
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color:'black',
    marginBottom: 15,
    textAlign: 'center',
  },
  orderItem: {
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
  orderTime: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
  orderType: {
    marginTop: 10,
    fontSize: 16,
    backgroundColor:'red',
    borderWidth:1,
    borderRadius:5,
    width:'40%',
    textAlign:'center',
    color:'white',
    fontWeight:'900'



  },
  closeButton: {
    backgroundColor: 'red', // 设置按钮背景颜色
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white', // 设置文本颜色
    fontWeight: 'bold', // 设置文本粗细
    fontSize: 16, // 设置文本大小
  },
  confirmButton: {
    backgroundColor: 'green', // 设置按钮背景颜色
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white', // 设置文本颜色
    fontWeight: 'bold', // 设置文本粗细
    fontSize: 16, // 设置文本大小
  },
});

export default Order