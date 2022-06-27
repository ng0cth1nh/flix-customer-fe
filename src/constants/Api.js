const ApiConstants = {
  LOGIN_API: 'https://flix-lj7prqscta-as.a.run.app/api/v1/login',
  SEND_OTP_API: 'https://flix-lj7prqscta-as.a.run.app/api/v1/register/sendOTP',
  CONFIRM_OTP_API:
    'https://flix-lj7prqscta-as.a.run.app/api/v1/register/confirm',
  REFRESH_TOKEN_API:
    'https://flix-lj7prqscta-as.a.run.app/api/v1/token/refresh',
  GET_ALL_CITY_API: 'https://flix-lj7prqscta-as.a.run.app/api/v1/address/city',
  GET_DISTRICT_BY_CITY_API:
    'https://flix-lj7prqscta-as.a.run.app/api/v1/address/district',
  GET_COMMUNE_BY_DISTRICT_API:
    'https://flix-lj7prqscta-as.a.run.app/api/v1/address/commune',
  GET_SERVICES_BY_CATEGORY_API: '/category/services',
  GET_SERVICE_DETAIL_API: '/service/detail',
  PROFILE_INFO_API: '/customer/profile',
  UPDATE_PROFILE_AVATAR_API: '/user/avatar',
  CHANGE_PASSWORD_API: '/user/changePassword',
  GET_ADDRESS_LIST_API: '/customer/address/list',
};

//http://localhost:8000
export default ApiConstants;
