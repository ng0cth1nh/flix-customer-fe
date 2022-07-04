import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width} = Dimensions.get('window');
import Carousel from 'react-native-snap-carousel';
import BannerSlider from '../../components/BannerSlider';
import ForwardButton from '../../components/ForwardButton';
import MajorComponent from '../../components/MajorComponent';
import SearchForm from '../../components/SearchForm';
const ENTRIES = [
  {
    title: 'Ưu đãi hôm nay',
    image:
      'https://i.postimg.cc/QN2jQkDW/emmanuel-ikwuegbu-0-kl1-Bjv-Fc-unsplash.jpg',
  },
  {
    title: 'Ưu đãi cho khách hàng mới',
    image: 'https://i.imgur.com/UPrs1EWl.jpg',
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
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(ENTRIES);
  const [majors, setMajors] = useState(MAJORS);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  const renderBanner = ({item, index}) => {
    return <BannerSlider data={item} />;
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <SearchForm
            search={search}
            setSearch={setSearch}
            placeholder="Tìm kiếm dịch vụ"
          />
          <View>
            <Carousel
              ref={carouselRef}
              data={entries}
              renderItem={renderBanner}
              sliderWidth={width}
              itemWidth={300}
              loop={true}
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
                fontFamily: 'Poppins',
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
            {majors.map((data, index) => {
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
                fontFamily: 'Poppins',
                fontWeight: '700',
              }}>
              Danh mục
            </Text>
            <ForwardButton color="black" onPressHandler={console.log('a')} />
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
              onPress={console.log('a')}>
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
              onPress={console.log('a')}>
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
              onPress={console.log('a')}>
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
              onPress={console.log('a')}>
              <Image
                source={require('../../../assets/images/type/discount.png')}
                style={{width: 30, height: 30, marginTop: 20}}
              />
              <Text style={{fontSize: 16, fontWeight: '700', color: 'black'}}>
                Sự kiện
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  searchForm: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    justifyContent: 'space-between',
    borderRadius: 18,
    paddingHorizontal: 15,
  },
  searchInput: {
    width: '80%',
  },
  container: {
    paddingHorizontal: '4%',
    paddingTop: 16,
    backgroundColor: 'white',
    height: '100%',
  },
});

export default HomeScreen;
