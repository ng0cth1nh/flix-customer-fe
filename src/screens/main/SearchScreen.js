import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import NotFound from '../../components/NotFound';
import Icon from 'react-native-vector-icons/Ionicons';
const {height} = Dimensions.get('window');
import useAxios from '../../hooks/useAxios';
import SearchForm from '../../components/SearchForm';
import ApiConstants from '../../constants/Api';

export default function SearchScreen({navigation}) {
  const [search, setSearch] = useState('');
  const typingTimeoutRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const customerAPI = useAxios();
  const [searchedSubService, setSearchedSubService] = useState(null);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.serviceRow}
        key={index.toString()}
        onPress={() => {
          navigation.push('RequestScreen', {
            service: item,
          });
        }}>
        <Image
          source={{uri: item.icon}}
          style={{marginBottom: 3, marginRight: 15, height: 24, width: 24}}
        />
        <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
          {item.serviceName}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleOnChangeSearch = async text => {
    setSearch(text);
    if (text === '') {
      return;
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setLoading(true);
    typingTimeoutRef.current = setTimeout(async () => {
      let response = await customerAPI.get(
        ApiConstants.SEARCH_SUB_SERVICE_API,
        {
          params: {keyword: text},
        },
      );
      console.log('search: ' + text);
      setSearchedSubService(response.data.services);
      setLoading(false);
    }, 200);
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={{flex: 1, paddingHorizontal: '4%'}}>
        <View
          style={{
            height: height * 0.1,
            flexDirection: 'row',
            paddingVertical: 12,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Icon name="ios-arrow-back-outline" color="black" size={34} />
          </TouchableOpacity>
          <SearchForm
            search={search}
            setSearch={setSearch}
            handleOnChangeSearch={handleOnChangeSearch}
            placeholder="Tìm kiếm dịch vụ"
          />
        </View>
        <ScrollView>
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#FEC54B"
              style={{
                alignItems: 'center',
                marginTop: 40,
                justifyContent: 'center',
              }}
            />
          ) : (
            <>
              {searchedSubService ? (
                <View>
                  <View style={styles.titleBox}>
                    <Text style={[styles.textBold, {fontSize: 20}]}>
                      Kết quả tìm kiếm
                    </Text>
                  </View>
                  <FlatList
                    nestedScrollEnabled
                    data={searchedSubService}
                    renderItem={renderItem}
                    ListEmptyComponent={NotFound}
                    keyExtractor={item => item.id}
                  />
                </View>
              ) : null}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  textBold: {
    fontWeight: 'bold',
    color: 'black',
  },
  titleBox: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#D3D3D3',
    marginTop: 10,
    height: 'auto',
  },
  selectedService: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 10,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: '#CACACA',
    marginTop: 15,
    marginRight: 15,
  },
  closeIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#FEC54B',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -10,
    right: -10,
  },
});
