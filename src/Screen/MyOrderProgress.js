import React, { useState , useEffect} from 'react'
import {View,Text, FlatList,Modal,StyleSheet,Image,TouchableOpacity, Alert} from 'react-native'
import _Header from '../components/_header'
import Category from '../components/OrderStatusBar'
import BreakfastCategory  from '../components/BreakfastCategory'
import renderItem  from '../components/ListView/OrderListItem'
import menuData from '../../src/data/cart.json';
import burger1 from '../assets/burger1.jpg'
import cookie from '../assets/egg1.jpg';
import axios from 'axios';






const MyOrderProgress = () => {
    const [allMenu,setAllMenu] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [showCatrgory,setShowCatrgory] = useState(false);
 
    const [feedbackData, setFeedbackData] = useState([
 


    ]);

      const handleClickGetMenu = () =>{
          axios.get("https://json-server-vercel-w33n-git-main-raychen1996.vercel.app/CustomerQA")
          .then((response) => {
            console.log(response.data)
            setFeedbackData(response.data)
             

          })
          .catch((error) => {
      
          });
      }


  useEffect(() => {
    handleClickGetMenu()
  }, []);



    const renderItem = ({ item }) => {
  return (
    <TouchableOpacity
      style={[styles.feedbackItem, { borderRadius: 5, borderWidth: 1, borderColor: '#ccc', margin: 2 }]}
    >
      <View style={styles.feedbackInfo}>
        <Text>{item.Name}</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Text key={star} style={[styles.star, star <= item.Star ? styles.filledStar : null]}>★</Text>
          ))}
        </View>
        <Text>{item.Message}</Text>
      </View>
       {/**
      
          {item.image && <Image source={item.image} style={styles.feedbackImage} />}
      
      */}
        
   
    </TouchableOpacity>
  );
};



    let menu  = [
  
    ]
    menu = menuData
    console.log(menuData); 

  return (
    <View style={{ flex: 1 ,flexDirection:'column'   }}>
    
        <View style={{flex:.1, }}>
           <_Header hederText="顧客反饋" />
        </View>
  
        <View style={{flex:.9,  }} >
      

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
              data={feedbackData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
            />
          </View>
             
     
        </View>         
    
 


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
  feedbackItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    padding: 5,
   
  },
  feedbackInfo: {
   
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 24,
  },
  filledStar: {
    color: 'gold',
  },
  feedbackImage: {
    width: 100,
    height: 100,
    marginLeft: 16,
    borderRadius:15,

  },
});

export default MyOrderProgress