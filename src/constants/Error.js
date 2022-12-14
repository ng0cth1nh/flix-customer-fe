export default {
  LOGIN_FAILED: 'Tài khoản hoặc mật khẩu không đúng',
  ACCOUNT_NOT_FOUND: 'Tài khoản không tồn tại',
  ACCOUNT_EXISTED: 'Số điện thoại đã được sử dụng trong hệ thống',
  INVALID_OTP: 'Mã chưa đúng, vui lòng thử lại',
  INVALID_PHONE_NUMBER: 'Số điện thoại đăng kí không hợp lệ',
  INVALID_FULL_NAME: 'Họ và tên không hợp lệ',
  INVALID_PASSWORD: 'Mật khẩu đăng kí không hợp lệ',
  INVALID_CITY: 'Địa chỉ thành phố không tồn tại',
  INVALID_DISTRICT: 'Địa chỉ Quận/Huyện không tồn tại',
  INVALID_COMMUNE: 'Địa chỉ Phường/Xã không tồn tại',
  WRONG_PASSWORD: 'Mật khẩu hiện tại không đúng',
  USER_IS_INACTIVE: 'Số điện thoại này đã bị vô hiệu hóa',
  SERVICE_IS_INACTIVE: 'Dịch vụ không còn hoạt động',
  MAXIMUM_UPLOAD_SIZE_EXCEEDED: 'Vui lòng chọn ảnh không vượt quá 20MB',
  CAN_NOT_CREATE_NEW_REQUEST_WHEN_HAVE_OTHER_PAYMENT_WAITING_REQUEST:
    'Vui lòng thanh toán hóa đơn của đơn yêu cầu trước đó',
  EXPECT_FIXING_DAY_MUST_START_AFTER_1_HOURS_AND_BEFORE_14_DAYS:
    'Đơn yêu cầu phải sớm nhất sau 1 tiếng và muộn nhất là sau 14 ngày',
};

const temp = new Map();
temp.set('00', 'Thanh toán hóa đơn thành công');
temp.set(
  '07',
  'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).',
);
temp.set(
  '09',
  'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.',
);
temp.set(
  '10',
  'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
);
temp.set(
  '11',
  'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.',
);
temp.set(
  '12',
  'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.',
);
temp.set(
  '13',
  'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.',
);
temp.set('24', 'Giao dịch không thành công do: Khách hàng hủy giao dịch');
temp.set(
  '51',
  'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.',
);
temp.set(
  '65',
  'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.',
);
temp.set('75', 'Ngân hàng thanh toán đang bảo trì.');
temp.set(
  '79',
  'Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch',
);
temp.set(
  '99',
  '	Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)',
);
export const VnPayCode = temp;
