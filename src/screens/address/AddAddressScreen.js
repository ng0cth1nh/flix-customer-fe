import React, {useState, useRef} from 'react';
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
  const [cityIdError, setCityIdError] = useState(null);
  const [communeIdError, setCommuneIdError] = useState(null);
  const [districtIdError, setDistrictIdError] = useState(null);
  const scrollRef = useRef();

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

  const handleAddAddressButtonClick = async () => {
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
        cityIdError={cityIdError}
        communeIdError={communeIdError}
        districtIdError={districtIdError}
        addressInputError={addressInputError}
        setCityIdError={setCityIdError}
        setCommuneIdError={setCommuneIdError}
        setDistrictIdError={setDistrictIdError}
        setFullNameInputError={setFullNameInputError}
        setPhoneInputError={setPhoneInputError}
        setAddressInputError={setAddressInputError}
        scrollRef={scrollRef}
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
