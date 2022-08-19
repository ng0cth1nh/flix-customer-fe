import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
const {width, height} = Dimensions.get('window');
import Carousel from 'react-native-snap-carousel';
import BannerSlider from '../../components/BannerSlider';
import ForwardButton from '../../components/ForwardButton';
import MajorComponent from '../../components/MajorComponent';
import {RequestStatus} from '../../utils/util';
import {fetchRequests, setIsLoading} from '../../features/request/requestSlice';
import useAxios from '../../hooks/useAxios';
import {fetchAddresses} from '../../features/user/userSlice';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomModal from '../../components/CustomModal';
import SubmitButton from '../../components/SubmitButton';

const ENTRIES = [
  {
    title: 'Ưu đãi hôm nay',
    image:
      'https://i.postimg.cc/QN2jQkDW/emmanuel-ikwuegbu-0-kl1-Bjv-Fc-unsplash.jpg',
  },
  {
    title: 'Ưu đãi cho khách hàng mới',
    image: 'https://i.ibb.co/X2D7Hr4/theme-photos-Klby0nxse-Y8-unsplash.jpg',
  },
];

const MAJORS = [
  {
    id: 2,
    title: 'Điện lạnh',
    image:
      'https://i.postimg.cc/L85TSmzM/engin-akyurt-y-CYVV8-k-QNM-unsplash.jpg',
  },
  {
    id: 1,
    title: 'Điện tử',
    image:
      'https://i.postimg.cc/NjjN06vS/fabio-silva-nm-Tm7kn-Unqs-unsplash.jpg',
  },
  {
    id: 4,
    title: 'Điện dân dụng',
    image:
      'https://images.unsplash.com/photo-1580894524720-add657e0ec07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
  },
  {
    id: 3,
    title: 'Điện nước',
    image:
      'https://drivinvibin.com/wp-content/uploads/2021/01/on-demand-water-heater.jpg',
  },
];

const HomeScreen = ({navigation}) => {
  const carouselRef = useRef(null);
  const dispatch = useDispatch();
  const customerAPI = useAxios();
  const [modalVisible, setModalVisible] = useState(false);

  const renderBanner = ({item, index}) => {
    return (
      <BannerSlider data={item} handleOnPress={() => setModalVisible(true)} />
    );
  };

  useEffect(() => {
    dispatch(setIsLoading());
    dispatch(fetchRequests({customerAPI, status: RequestStatus.APPROVED}));
    dispatch(fetchRequests({customerAPI, status: RequestStatus.PENDING}));
    dispatch(fetchRequests({customerAPI, status: RequestStatus.FIXING}));
    dispatch(
      fetchRequests({customerAPI, status: RequestStatus.PAYMENT_WAITING}),
    );
    dispatch(fetchRequests({customerAPI, status: RequestStatus.DONE}));
    dispatch(fetchRequests({customerAPI, status: RequestStatus.CANCELLED}));
    dispatch(fetchAddresses(customerAPI));
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.searchForm}
          onPress={() => navigation.push('SearchScreen')}>
          <Text>Tìm kiếm dịch vụ</Text>
          <Icon name="search" size={24} />
        </TouchableOpacity>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View>
            <Carousel
              ref={carouselRef}
              data={ENTRIES}
              renderItem={renderBanner}
              sliderWidth={width}
              itemWidth={300}
              loop={true}
              autoplay={true}
              enableMomentum={false}
              lockScrollWhileSnapping={true}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: '700',
              }}>
              Dịch vụ sửa chữa nổi bật
            </Text>
            <ForwardButton
              color="black"
              onPressHandler={() => navigation.push('CategoryListScreen')}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            {MAJORS.map((data, index) => {
              return (
                <MajorComponent
                  key={index}
                  data={data}
                  onPressHandler={() =>
                    navigation.push('ServiceListScreen', {
                      categoryId: data.id,
                      categoryName: data.title,
                    })
                  }
                />
              );
            })}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: '700',
              }}>
              Danh mục
            </Text>
            <ForwardButton
              color="black"
              onPressHandler={() => setModalVisible(true)}
            />
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginBottom: 50, marginTop: 10}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#FEC54B',
                height: width * 0.22,
                width: width * 0.25,
                borderRadius: 18,
                alignItems: 'center',
                marginRight: 10,
              }}
              onPress={() => navigation.push('CategoryListScreen')}>
              <Image
                source={require('../../../assets/images/type/wrench.png')}
                style={{width: 30, height: 30, marginTop: 20}}
              />
              <Text style={{fontSize: 16, fontWeight: '700', color: 'black'}}>
                Dịch vụ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#FEC54B',
                height: width * 0.22,
                width: width * 0.25,
                borderRadius: 18,
                alignItems: 'center',
                marginHorizontal: 10,
              }}
              onPress={() => navigation.push('AccessoriesScreen')}>
              <Image
                source={require('../../../assets/images/type/cpu.png')}
                style={{width: 30, height: 30, marginTop: 20}}
              />
              <Text style={{fontSize: 16, fontWeight: '700', color: 'black'}}>
                Linh kiện
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#FEC54B',
                height: width * 0.22,
                width: width * 0.25,
                borderRadius: 18,
                alignItems: 'center',
                marginHorizontal: 10,
              }}
              onPress={() => setModalVisible(true)}>
              <Image
                source={require('../../../assets/images/type/discount.png')}
                style={{width: 30, height: 30, marginTop: 20}}
              />
              <Text style={{fontSize: 16, fontWeight: '700', color: 'black'}}>
                Ưu đãi
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#FEC54B',
                height: width * 0.22,
                width: width * 0.25,
                borderRadius: 18,
                alignItems: 'center',
                marginLeft: 10,
              }}
              onPress={() => setModalVisible(true)}>
              <Image
                source={require('../../../assets/images/type/event.png')}
                style={{width: 30, height: 30, marginTop: 20}}
              />
              <Text style={{fontSize: 16, fontWeight: '700', color: 'black'}}>
                Sự kiện
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </ScrollView>
        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalRatio={0.28}>
          <Text style={styles.modalText}>Thông báo</Text>
          <View style={{marginVertical: 10}}>
            <Text>Tính năng sẽ sớm ra mắt trong thời gian tới</Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <SubmitButton
              style={{
                marginVertical: 8,
                width: '100%',
                alignSelf: 'center',
              }}
              onPress={() => setModalVisible(false)}
              buttonText="ĐỒNG Ý"
            />
          </View>
        </CustomModal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 5,
  },
  searchForm: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 18,
    height: height * 0.072,
    paddingHorizontal: 15,
    marginBottom: 10,
    paddingVertical: 12,
  },
  searchInput: {
    width: '80%',
    marginLeft: 10,
  },
  container: {
    paddingHorizontal: '4%',
    paddingTop: 16,
    backgroundColor: 'white',
    height: '100%',
  },
});

export default HomeScreen;
