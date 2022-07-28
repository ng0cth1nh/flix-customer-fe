import React, {useState} from 'react';
import CreateAddressForm from '../../components/CreateAddressForm';
import {removeAscent} from '../../utils/util';
import useAxios from '../../hooks/useAxios';
import Toast from 'react-native-toast-message';
import {useSelector, useDispatch} from 'react-redux';
import {
  addAddress,
  setIsLoading,
  selectIsLoading,
  fetchAddresses,
} from '../../features/user/userSlice';
import ProgressLoader from 'rn-progress-loader';

const AddAddressScreen = ({navigation}) => {
  const customerAPI = useAxios();
  const dispatch = useDispatch();
  const [cityId, setCityId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [communeId, setCommuneId] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [streetAddress, setStreetAddress] = useState(null);
  const [fullNameInputError, setFullNameInputError] = useState(null);
  const [phoneInputError, setPhoneInputError] = useState(null);
  const [addressInputError, setAddressInputError] = useState(null);
  const isLoading = useSelector(selectIsLoading);

  const checkPhoneNumberValid = async () => {
    if (!phone || phone.trim() === '') {
      setPhoneInputError('Vui lòng nhập số điện thoại');
      return false;
    } else if (!/(03|05|07|08|09|01[2|6|8|9])([0-9]{8})\b/.test(phone)) {
      setPhoneInputError('Số điện thoại không đúng');
      return false;
    }
    setPhoneInputError(null);
    return true;
  };

  const checkFullNameValid = async () => {
    if (!fullName || fullName.trim() === '') {
      setFullNameInputError('Vui lòng nhập tên của bạn');
      return false;
    } else if (!/^[a-zA-Z\s]{3,}$/.test(removeAscent(fullName.slice()))) {
      setFullNameInputError(
        'Họ và Tên từ 3 ký tự trở lên không bao gồm số và kí tự đặc biệt',
      );
      return false;
    }
    setFullNameInputError(null);
    return true;
  };

  const checkAddressValid = async () => {
    if (
      cityId &&
      districtId &&
      communeId &&
      streetAddress &&
      streetAddress.length !== 0
    ) {
      setAddressInputError(null);
      return true;
    }
    setAddressInputError(
      'Vui lòng chọn và điền đầy đủ thông tin địa chỉ của bạn',
    );
    return false;
  };

  const handleAddAddressButtonClick = async () => {
    try {
      let isFullNameValid = checkFullNameValid();
      let isAddressValid = checkAddressValid();
      let isPhoneValid = checkPhoneNumberValid();

      if (isFullNameValid && isAddressValid && isPhoneValid) {
        await dispatch(setIsLoading());
        await dispatch(
          addAddress({
            customerAPI,
            body: {communeId, streetAddress, fullName, phone},
          }),
        ).unwrap();
        await dispatch(fetchAddresses(customerAPI));
        Toast.show({
          type: 'customToast',
          text1: 'Thêm địa chỉ thành công',
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

  return (
    <>
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
        isAddAddress={true}
        saveButtonClicked={handleAddAddressButtonClick}
        fullNameInputError={fullNameInputError}
        phoneInputError={phoneInputError}
        addressInputError={addressInputError}
        setFullNameInputError={setFullNameInputError}
        setPhoneInputError={setPhoneInputError}
        setAddressInputError={setAddressInputError}
      />
      <ProgressLoader
        visible={isLoading}
        isModal={true}
        isHUD={true}
        hudColor={'#FEC54B'}
        color={'#000000'}
      />
    </>
  );
};

export default AddAddressScreen;
