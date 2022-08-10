import React, {useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import CreateAddressForm from '../../components/CreateAddressForm';
const {height, width} = Dimensions.get('window');
import Toast from 'react-native-toast-message';
import useAxios from '../../hooks/useAxios';
import CustomModal from '../../components/CustomModal';
import {useSelector, useDispatch} from 'react-redux';
import {
  updateAddress,
  setIsLoading,
  selectIsLoading,
  fetchAddresses,
  deleteAddress,
} from '../../features/user/userSlice';
import ProgressLoader from 'rn-progress-loader';
import {removeAscent} from '../../utils/util';

const EditAddressScreen = ({route, navigation}) => {
  const {data} = route.params;
  const [cityId, setCityId] = useState(data.cityId);
  const [districtId, setDistrictId] = useState(data.districtId);
  const [communeId, setCommuneId] = useState(data.communeId);
  const [fullName, setFullName] = useState(data.customerName);
  const [phone, setPhone] = useState(data.phone);
  const [streetAddress, setStreetAddress] = useState(
    data.addressName.split(',')[0],
  );
  const [fullNameInputError, setFullNameInputError] = useState(null);
  const [phoneInputError, setPhoneInputError] = useState(null);
  const [addressInputError, setAddressInputError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const customerAPI = useAxios();
  const dispatch = useDispatch();
  const [cityIdError, setCityIdError] = useState(null);
  const [communeIdError, setCommuneIdError] = useState(null);
  const [districtIdError, setDistrictIdError] = useState(null);
  const scrollRef = useRef();

  const showModal = () => {
    setModalVisible(true);
  };

  const checkPhoneNumberValid = async () => {
    if (!phone || phone.trim() === '') {
      setPhoneInputError('Không được bỏ trống');
      return false;
    } else if (!/(03|05|07|08|09|01[2|6|8|9])([0-9]{8})\b/.test(phone)) {
      setPhoneInputError('Số điện thoại không hợp lệ');
      return false;
    }
    setPhoneInputError(null);
    return true;
  };

  const checkFullNameValid = async () => {
    if (!fullName || fullName.trim() === '') {
      setFullNameInputError('Không được bỏ trống');
      return false;
    } else if (!/^[a-zA-Z\s]{3,150}$/.test(removeAscent(fullName.slice()))) {
      setFullNameInputError(
        'Họ và tên từ 3-150 ký tự, không bao gồm số hoặc kí tự đặc biệt',
      );
      return false;
    }
    setFullNameInputError(null);
    return true;
  };

  const checkAddressValid = () => {
    if (!streetAddress || streetAddress === '') {
      setAddressInputError('Địa chỉ chi tiết không được bỏ trống');
      return false;
    } else if (streetAddress.length > 150) {
      setAddressInputError('Không nhập quá dài');
      return false;
    }
    setAddressInputError(null);
    return true;
  };

  const handleEditAddressClickButton = async () => {
    try {
      let isFullNameValid = await checkFullNameValid();
      let isAddressValid = await checkAddressValid();
      let isPhoneValid = await checkPhoneNumberValid();

      if (!isFullNameValid || !isPhoneValid) {
        scrollRef.current?.scrollTo({x: 0, y: 0, animated: true});
      }

      if (!cityId) {
        setCityIdError('Thành phố không được bỏ trống');
      }
      if (!districtId) {
        setDistrictIdError('Quận huyện không được bỏ trống');
      }
      if (!communeId) {
        setCommuneIdError('Phường xã không được bỏ trống');
      }

      if (
        isFullNameValid &&
        isAddressValid &&
        isPhoneValid &&
        cityId &&
        communeId &&
        districtId
      ) {
        await dispatch(setIsLoading());
        await dispatch(
          updateAddress({
            customerAPI,
            body: {
              addressId: data.addressId,
              communeId,
              streetAddress,
              name: fullName,
              phone,
            },
          }),
        ).unwrap();
        await dispatch(fetchAddresses(customerAPI));
        Toast.show({
          type: 'customToast',
          text1: 'Cập nhật địa chỉ thành công',
        });
        navigation.goBack();
      }
    } catch (err) {
      Toast.show({
        type: 'customErrorToast',
        text1: err,
      });
    }
  };
  const handleDeleteAddressClickButton = async () => {
    try {
      console.log(data.addressId);
      setModalVisible(false);
      await dispatch(setIsLoading());
      await dispatch(
        deleteAddress({
          customerAPI,
          addressId: data.addressId,
        }),
      ).unwrap();
      await dispatch(fetchAddresses(customerAPI));
      Toast.show({
        type: 'customToast',
        text1: 'Xóa địa chỉ thành công',
      });
      navigation.goBack();
    } catch (err) {
      Toast.show({
        type: 'customErrorToast',
        text1: err,
      });
    }
  };
  return (
    <>
      <View style={[{flex: 1}, modalVisible ? {opacity: 0.9} : {}]}>
        <CreateAddressForm
          navigation={navigation}
          setCommuneId={setCommuneId}
          setDistrictId={setDistrictId}
          setCityId={setCityId}
          setFullName={setFullName}
          setPhone={setPhone}
          setStreetAddress={setStreetAddress}
          communeId={communeId}
          cityId={cityId}
          districtId={districtId}
          fullName={fullName}
          phone={phone}
          streetAddress={streetAddress}
          isAddAddress={false}
          saveButtonClicked={handleEditAddressClickButton}
          fullNameInputError={fullNameInputError}
          phoneInputError={phoneInputError}
          addressInputError={addressInputError}
          setFullNameInputError={setFullNameInputError}
          setPhoneInputError={setPhoneInputError}
          setAddressInputError={setAddressInputError}
          data={data}
          showModal={showModal}
          cityIdError={cityIdError}
          communeIdError={communeIdError}
          districtIdError={districtIdError}
          setCityIdError={setCityIdError}
          setCommuneIdError={setCommuneIdError}
          setDistrictIdError={setDistrictIdError}
          scrollRef={scrollRef}
        />
      </View>
      <ProgressLoader
        visible={isLoading}
        isModal={true}
        isHUD={true}
        hudColor={'#FEC54B'}
        color={'#000000'}
      />
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalRatio={0.3}>
        <Text style={styles.modalText}>
          Bạn có chắc chắn muốn xóa địa chỉ này không?
        </Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            style={[styles.button, styles.buttonOpen]}
            onPress={handleDeleteAddressClickButton}>
            <Text style={styles.textStyle}>XÓA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>ĐÓNG</Text>
          </TouchableOpacity>
        </View>
      </CustomModal>
    </>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    top: 0.65 * height,
    height: 0.35 * height,
    width: width,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 35,
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
    width: '40%',
    borderRadius: 20,
    paddingVertical: 10,
  },
  buttonOpen: {
    backgroundColor: '#FEC54B',
  },
  buttonClose: {
    backgroundColor: '#F0F0F0',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 40,
    textAlign: 'center',
  },
});
export default EditAddressScreen;
