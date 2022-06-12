import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
const {height, width} = Dimensions.get('window');
import BackButton from '../../components/BackButton';
import MajorComponent from '../../components/MajorComponent';
import {getStatusBarHeight} from 'react-native-status-bar-height';

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
  {
    id: 5,
    title: 'Xe máy',
    image:
      'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 6,
    title: 'Laptop',
    image:
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
  },
  {
    id: 7,
    title: 'Điện thoại / Ipad',
    image:
      'https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
  },
];
const MajorListScreen = ({navigation}) => {
  const [search, setSearch] = useState('');

  return (
    <View
      style={{
        backgroundColor: '#FEC54B',
      }}>
      <View
        style={{
          backgroundColor: '#FEC54B',
          width: '100%',
          height: height * 0.18,
          position: 'absolute',
        }}>
        <StatusBar barStyle="dark-content" backgroundColor="#FEC54B" />
        <Text style={styles.headerText}>Dịch vụ sửa chữa</Text>
      </View>
      <BackButton onPressHandler={navigation.goBack} color="black" />
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 18,
          paddingHorizontal: '5%',
          top: height * 0.16,
          paddingBottom: 620,
        }}>
        <View style={styles.searchForm}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm dịch vụ"
            onChangeText={text => setSearch(text)}
            defaultValue={search}
          />
          <Icon
            name="search"
            size={24}
            style={{paddingTop: 12, alignItems: 'center'}}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}>
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
                      majorId: data.id,
                      majorName: data.title,
                    })
                  }
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
    marginTop: getStatusBarHeight(),
    width: '100%',
    marginBottom: 10,
  },
  scrollView: {
    paddingBottom: 400,
  },
  searchForm: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    justifyContent: 'space-between',
    borderRadius: 18,
    paddingHorizontal: 15,
    marginVertical: 26,
  },
});

export default MajorListScreen;
