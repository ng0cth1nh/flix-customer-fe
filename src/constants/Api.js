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
  GET_MAIN_ADDRESS_API: '/customer/address/main',
  POST_REQUEST_API: '/customer/request/repair',
  GET_REQUEST_HISTORY_LIST_API: '/customer/request/histories',
  GET_REQUEST_DETAIL_API: '/customer/request/detail',
  CANCEL_REQUEST_API: '/customer/request/cancel',
  GET_FIXED_SERVICE_OF_REQUEST_API: '/confirmedUser/request/fixedService',
  GET_INVOICE_API: '/confirmedUser/request/invoice',
  CONFIRM_INVOICE_API: '/customer/vnpay/payment/url',
  CREATE_COMMENT_API: '/confirmedUser/comment',
};

//http://localhost:8000
export default ApiConstants;
