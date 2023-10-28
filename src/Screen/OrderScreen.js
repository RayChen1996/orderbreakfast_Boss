import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ActivityIndicator,
  ProgressBarAndroid,
} from 'react-native';
import _Header from '../components/_header';
import Category from '../components/Category';
import BreakfastCategory from '../components/BreakfastCategory';
import renderItem from '../components/ListView/foodItem';
import menuData from '../data/cart.json';
import ProgressCircle from '../components/ProgressCircle';
import * as Progress from 'react-native-progress';
import CustomLoader from '../components/CustomLoader';
import axios from 'axios';
import burger1 from '../assets/burger1.jpg';
import cookie from '../assets/egg1.jpg';

import {
  Camera,
  useCameraDevice,
  NoCameraErrorView,
} from 'react-native-vision-camera';
import {request, PERMISSIONS} from 'react-native-permissions';

const Order = () => {
  const device = useCameraDevice('back');

  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const handleScanButtonPress = async () => {
    const cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
    if (cameraPermission === 'granted') {
      // setIsCameraVisible(true);
    } else {
      // Handle permission denied
      console.log('NO permission');
    }
  };

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const orderProgress = 0.5; // 0表示刚开始，1表示完成
  const [allMenu, setAllMenu] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showCatrgory, setShowCatrgory] = useState(false);

  const readFileFromContentUri = async uri => {
    try {
      const data = await RNFS.readFile(uri, 'utf8');
      console.log('File contents:', data);

      const lines = data.split('\n'); // 以换行符分割文本，创建行数组

      // 遍历每行并分割成字段
      for (const line of lines) {
        const fields = line.split(','); // 以逗号分割每行
        if (fields.length > 0) {
          // 处理每个字段
          const type = fields[0];
        }
      }
      // 在這裡處理文件內容
    } catch (err) {
      console.error('Error reading file:', err);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    handleClickGetMenu();
  };

  const handleOrderPress = order => {
    setSelectedOrder(order);
    setModalVisible(true);
  };
  const handleConfirmOrder = () => {
    setModalVisible(false);
  };
  const handleClickGetMenu = () => {
    axios
      .get('https://json-server-vercel-w33n.vercel.app/Orders')
      .then(response => {
        console.log(response.data);
        setOrders(response.data);
        setRefreshing(false); // 停止刷新
        setIsLoading(false);
      })
      .catch(error => {
        setRefreshing(false); // 停止刷新
      });
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  let menu = [];

  const [orders, setOrders] = useState([]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => handleOrderPress(item)}>
        <View style={styles.orderItem}>
          <Image
            source={require('../assets/burger1.jpg')}
            style={styles.itemImage}
          />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.M_Name}</Text>
            <Text style={styles.orderTime}>{item.M_DT}</Text>
            <Text style={styles.orderType}>
              {' '}
              {item.OrderType ? '現場候位' : '網路訂餐'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestCameraPermission();
    console.log(newCameraPermission);
  };

  useEffect(() => {
    checkPermission();
    handleClickGetMenu();
  }, []);

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 0.1}}>
        <_Header hederText="接單管理" />
      </View>

      <View style={{flex: 0.9}}>
        <View
          style={{
            flex: 0.13,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Category />
        </View>

        <View style={{flex: 0.87}}>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="orange"
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            />
          ) : (
            <FlatList
              data={orders}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          )}
        </View>
        <View style={{flex: 0.1, flexDirection: 'column'}}>
          <TouchableOpacity
            onPress={handleScanButtonPress}
            style={{
              flex: 1,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'orange',
            }}>
            <Text style={{color: '#fff', fontWeight: '900', fontSize: 18}}>
              掃描餐點
            </Text>
          </TouchableOpacity>
          {/* Camera View */}

          {isCameraVisible && (
            <View style={{flex: 1}}>
              <Camera
                style={{flex: 1}}

                // You may not need audio capture for QR code scanning
              />
            </View>
          )}

          {/* Display the scanned data */}
          {scannedData && (
            <View>
              <Text>Scanned QR Code Data:</Text>
              <Text>{scannedData}</Text>
            </View>
          )}
        </View>
      </View>

      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>訂單詳情</Text>
          <View style={styles.orderDetails}>
            <Text style={styles.orderItemName}>{selectedOrder?.name}</Text>
            <Text style={styles.orderItemDescription}>
              {selectedOrder?.description}
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>總計金額:</Text>
            <Text style={styles.totalAmount}>
              $ {selectedOrder?.totalAmount}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmOrder}>
            <Text style={styles.confirmButtonText}>確認訂單</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>關閉</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyCartText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderDetails: {
    marginBottom: 10,
  },
  orderItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderItemDescription: {
    fontSize: 16,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
    color: 'black',
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
    color: 'black',
  },
  orderTime: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
  orderType: {
    marginTop: 10,
    fontSize: 16,
    backgroundColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    width: '40%',
    textAlign: 'center',
    color: 'white',
    fontWeight: '900',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Order;
