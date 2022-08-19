import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import TopHeaderComponent from '../../components/TopHeaderComponent';
import {useSelector, useDispatch} from 'react-redux';
import SearchForm from '../../components/SearchForm';
import useAxios from '../../hooks/useAxios';
import ApiConstants from '../../constants/Api';
import {
  selectIsLoading,
  setIsLoading,
  fetchAccessories,
} from '../../features/user/userSlice';
import NotFound from '../../components/NotFound';
import Loading from '../../components/Loading';
import {NUMBER_RECORD_PER_PAGE} from '../../constants/Api';
import {numberWithCommas} from '../../utils/util';

export default function AccessoriesScreen({navigation}) {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const typingTimeoutRef = useRef(null);
  const customerAPI = useAxios();
  const [accessories, setAccessories] = useState([]);
  const [searchAccessories, setSearchAccessories] = useState([]);
  const [refreshControl, setRefreshControl] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPage, setTotalPage] = useState(null);
  const [stopFetchMore, setStopFetchMore] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

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
        ApiConstants.SEARCH_ACCESSORIES_API,
        {
          params: {keyword: text},
        },
      );
      console.log('search: ' + text);
      setSearchAccessories(response.data.accessories);
      setLoading(false);
    }, 200);
  };

  useEffect(() => {
    (async () => {
      if (refreshControl === null || refreshControl === true) {
        console.log('loadAccessories');
        await loadAccessories();
      }
    })();
  }, [refreshControl]);

  const loadAccessories = async () => {
    try {
      let temp = 0;
      await dispatch(setIsLoading());
      let res = await dispatch(
        fetchAccessories({
          customerAPI,
          pageNumber: temp,
          pageSize: NUMBER_RECORD_PER_PAGE,
        }),
      ).unwrap();
      setAccessories(res.accessoryList);
      console.log('acessories:', res.accessoryList);
      if (refreshControl) {
        setRefreshControl(false);
        setStopFetchMore(false);
        setPageNumber(0);
      }
      setTotalPage(Math.ceil(res.totalRecord / NUMBER_RECORD_PER_PAGE));
    } catch (err) {
    } finally {
      setIsFirstLoad(false);
    }
  };

  const handleOnEndReached = async () => {
    try {
      if (!stopFetchMore) {
        if (totalPage <= pageNumber + 1) {
          setStopFetchMore(false);
          return;
        }
        let temp = pageNumber + 1;
        await dispatch(setIsLoading());
        let res = await dispatch(
          fetchAccessories({
            customerAPI,
            pageNumber: temp,
            pageSize: NUMBER_RECORD_PER_PAGE,
          }),
        ).unwrap();
        setAccessories([...accessories, ...res.accessoryList]);
        setPageNumber(pageNumber + 1);
      }
    } catch (err) {}
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.serviceRow}
        key={index.toString()}
        onPress={() => {
          navigation.push('AccessoriesDetailScreen', {
            item,
          });
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            marginRight: 10,
            flex: 5,
          }}>
          {item.name}
        </Text>
        <Text style={[styles.textBold, {flex: 2, textAlign: 'right'}]}>
          {`${numberWithCommas(item.price)} vnđ`}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <TopHeaderComponent
        navigation={navigation}
        title="Linh kiện"
        isBackButton={true}
        statusBarColor="white"
      />
      <SafeAreaView style={{flex: 1, paddingHorizontal: '4%', marginTop: 10}}>
        <SearchForm
          search={search}
          setSearch={setSearch}
          handleOnChangeSearch={handleOnChangeSearch}
          placeholder="Tìm kiếm linh kiện"
        />
        <View
          style={{
            flex: 1,
            paddingTop: 10,
          }}>
          {isFirstLoad ? (
            <Loading
              style={{
                marginTop: 20,
              }}
            />
          ) : (
            <>
              <Text style={[styles.textBold, {fontSize: 20, marginBottom: 10}]}>
                {search !== '' ? 'Kết quả tìm kiếm' : 'Tất cả linh kiện'}
              </Text>
              {loading ? (
                <Loading
                  style={{
                    marginTop: 20,
                  }}
                />
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={search !== '' ? searchAccessories : accessories}
                  renderItem={renderItem}
                  ListEmptyComponent={NotFound}
                  keyExtractor={(item, index) => index.toString()}
                  refreshControl={
                    search === '' ? (
                      <RefreshControl
                        refreshing={refreshControl}
                        onRefresh={() => setRefreshControl(true)}
                        colors={['#FEC54B']}
                      />
                    ) : null
                  }
                  ListFooterComponent={() =>
                    isLoading &&
                    search === '' && (
                      <Loading
                        style={{
                          marginTop: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          padding: 10,
                        }}
                      />
                    )
                  }
                  onEndReached={search === '' ? handleOnEndReached : null}
                  onScrollBeginDrag={() => {
                    setStopFetchMore(false);
                  }}
                  onEndReachedThreshold={0.5}
                />
              )}
            </>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'black',
    marginTop: getStatusBarHeight(),
    paddingBottom: 15,
    alignSelf: 'center',
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingRight: 20,
    marginBottom: 10,
  },
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
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#D3D3D3',
    marginVertical: 6,
    width: '100%',
  },
  selectedService: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 16,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#CACACA',
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
