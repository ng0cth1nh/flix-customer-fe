import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import BackButton from '../../components/BackButton';
import Button from '../../components/SubmitButton';
export default function TermsOfUseScreen({navigation}) {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="white" />
      <BackButton onPressHandler={navigation.goBack} color="#FEC54B" />
      <SafeAreaView style={styles.container}>
        <View style={styles.logoArea}>
          <View style={styles.logo}>
            <Image
              style={styles.imageLogo}
              source={require('../../../assets/images/logo/logo.png')}
            />
          </View>
        </View>
        <Text style={styles.headerText}>Điều khoản sử dụng dịch vụ</Text>
        <ScrollView>
          <View>
            <Text style={styles.titleText}>1. Giới thiệu</Text>
            <Text>{''}</Text>
            <Text>
              &nbsp; &nbsp;Chào mừng quý khách hàng đến với FLIX - Ứng dụng tìm
              thợ sửa chữa tiện ích, nhanh chóng.
            </Text>
            <Text>
              &nbsp; &nbsp;Khi quý khách hàng đăng ký tài khoản vào hệ thống của
              chúng tôi có nghĩa là quý khách đã đồng ý với các điều khoản này.
              Ứng dụng có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ
              phần nào trong Điều khoản này, vào bất cứ lúc nào. Và khi quý
              khách tiếp tục sử dụng ứng dụng, sau khi các thay đổi về Điều
              khoản được đăng tải, có nghĩa là quý khách hàng chấp nhận với
              những thay đổi đó.
            </Text>
            <Text>
              &nbsp; &nbsp;Quý khách hàng vui lòng kiểm tra thường xuyên để cập
              nhật những thay đổi của chúng tôi.
            </Text>
            <Text>{''}</Text>
            <Text style={styles.titleText}>2. Ý kiến của khách hàng</Text>
            <Text>{''}</Text>
            <Text>
              &nbsp; &nbsp;Tất cả ý kiến đóng góp về hệ thống và bình luận về
              dịch vụ sửa chữa của quý khách đều là tài sản của chúng tôi. Nếu
              chúng tôi phát hiện bất kỳ thông tin giả mạo hay sai lệch nào,
              chúng tôi sẽ khóa tài khoản của quý khách ngay lập tức hoặc áp
              dụng các biện pháp khác theo quy định của pháp luật Việt Nam.
            </Text>
            <Text>{''}</Text>
            <Text style={styles.titleText}>3. Tạo yêu cầu và giá cả</Text>
            <Text>{''}</Text>
            <Text>
              &nbsp; &nbsp;Để đảm bảo tính chính xác của yêu cầu, trong lúc lúc
              tạo yêu cầu, quý khách vui lòng kiểm tra thật kĩ thông tin yêu
              cầu, thời gian đặt yêu cầu sửa chữa giới hạn từ 1 tiếng cho đến 14
              ngày sau thời điểm hiện tại. Chúng tôi cũng sẽ từ chối và hủy
              những đơn yêu cầu nếu thời gian không đúng theo Điều khoản quy
              định.
            </Text>
            <Text>
              &nbsp; &nbsp;Chúng tôi cam kết sẽ cung cấp thông tin giá cả linh
              kiện và dịch vụ sửa chữa chính xác nhất theo giá thị trường cho
              người tiêu dùng. Tuy nhiên, đôi lúc vẫn có sai xót xảy ra, ví dụ
              như trường hợp thiếu xót những linh kiện hoặc dịch vụ chưa được hệ
              thống quy định giá cả, tùy theo trường hợp thợ sửa chữa sẽ quy
              định dịch vụ thêm ngoài hệ thống, quý khách cần kiểm tra thật kỹ
              mức giá ngoài khung hệ thống hoặc chúng tôi sẽ liên hệ hướng dẫn
              xử lý yêu cầu đó cho quý khách.
            </Text>
            <Text>{''}</Text>
            <Text style={styles.titleText}>
              4. Thay đổi hoặc hủy bỏ giao dịch
            </Text>
            <Text>{''}</Text>
            <Text>
              &nbsp; &nbsp;Quý khách không thể thay đổi thông tin đơn yêu cầu
              của mình nếu đã bấm xác nhận tạo yêu cầu. Nếu quý khách chắc chắn
              muốn thay đổi thông tin, vui lòng chấm dứt đơn hàng nếu trong
              trạng thái chờ xác nhận hoặc đã xác nhận và tạo mới yêu cầu.
            </Text>
            <Text>
              &nbsp; &nbsp;Trong trường hợp đơn hàng đang trong trạng thái chờ
              xác nhận hoặc đã xác nhận, quý khách có quyền chấm dứt yêu cầu sửa
              chữa, ngoài những trạng thái trên không thể tự ý chấm dứt nếu
              không liên hệ qua hotline hay gửi phản hồi lên hệ thống.
            </Text>
            <Text>
              &nbsp; &nbsp;Chúng tôi không chịu trách nghiệm nếu quý khách không
              thể không thể thay đổi thông tin yêu cầu khi yêu cầu đang được xử
              lý hay thanh toán.
            </Text>
            <Text>{''}</Text>
            <Text style={styles.titleText}>5. Đảm bảo chất lượng sửa chữa</Text>
            <Text>{''}</Text>
            <Text>
              &nbsp; &nbsp;Trong quá trình thợ sửa chữa làm việc, khách hàng nên
              quay lại quá trình sửa chữa, hoặc chụp lại trước và sau quá trình
              sửa chữa để đảm bảo chất lượng của thợ cũng như công việc. Nếu
              trong quá trình phát hiện có gian lận trong việc thay thế linh
              kiện, hay sửa chữa không đạt yêu cầu, khách hàng cần nhanh chóng
              gửi phản hồi lên hệ thống để được xử lý trong thời gian sớm nhất.
            </Text>
            <Text>{''}</Text>
            <Text style={styles.titleText}>
              6. Thanh toán an toàn và tiện lợi
            </Text>
            <Text>{''}</Text>
            <Text>
              &nbsp; &nbsp;Khách hàng có thể lựa chọn những phương thức thanh
              toán sau đây và lực chọn áp dụng phương thức phù hợp:
            </Text>
            <Text>{''}</Text>
            <Text style={styles.titleText}>
              &nbsp; &nbsp;Cách 1: Thanh toán qua VNPAY:
            </Text>
            <Text>{''}</Text>
            <Text>
              &nbsp; &nbsp; &nbsp;Bước 1: Trong lúc tạo yêu cầu, chọn phương
              thức thay toán thông qua VNPAY (Yêu cầu khách hàng cài đặt ứng
              dụng thanh toán VNPAY, nếu không có khách hàng sẽ được chuyển tiếp
              đến cửa hàng cài đặt).
            </Text>
            <Text>
              &nbsp; &nbsp; &nbsp;Bước 2: Sau khi thợ sửa chữa tạo hóa đơn,
              khách hàng vào Lịch sử giao dịch phần Đang chờ thanh toán, chọn
              đúng đơn yêu cầu cần thanh toán và bấm Xác nhận và thanh toán.
            </Text>
            <Text>
              &nbsp; &nbsp; &nbsp;Bước 3: Khách hàng sẽ được chuyển tiếp đến ứng
              dụng thanh toán VNPAY, vui lòng điền đúng thông tin cần thiết để
              thanh toán cho đơn yêu cầu
            </Text>
            <Text>
              &nbsp; &nbsp; &nbsp;Bước 4: Sau khi thanh toán thành công, đơn
              hàng sẽ được chuyển sang trạng thái hoàn thành. Khách hàng có thể
              tiếp tục đặt yêu cầu sửa chữa mới lên hệ thống.
            </Text>
            <Text>{''}</Text>
            <Text style={styles.titleText}>
              &nbsp; &nbsp;Cách 2: Thanh toán tiền mặt:
            </Text>
            <Text>{''}</Text>
            <Text>
              &nbsp; &nbsp; &nbsp;Bước 1:Trong lúc tạo yêu cầu, chọn phương thức
              thay toán thông qua tiền mặt.
            </Text>
            <Text>
              &nbsp; &nbsp; &nbsp;Bước 2: Sau khi thợ sửa chữa tạo hóa đơn,
              khách hàng vào Lịch sử giao dịch phần Đang chờ thanh toán, chọn
              đúng đơn yêu cầu cần thanh toán và thanh toán hóa đơn đầy đủ bằng
              tiền mặt cho thợ.
            </Text>
            <Text>
              &nbsp; &nbsp; &nbsp;Bước 3: Thợ sửa chữa sẽ bấm Xác nhận đã thanh
              toán, đơn hàng sẽ được chuyển sang trạng thái hoàn thành. Khách
              hàng có thể tiếp tục đặt yêu cầu sửa chữa mới lên hệ thống.
            </Text>
            <Text>{''}</Text>
            <Text style={styles.titleText}>
              7. Đảm bảo an toàn về giao dịch tại FLIX
            </Text>
            <Text>{''}</Text>
            <Text>
              &nbsp; &nbsp;Chúng tôi sử dụng các dịch vụ để bảo về thông tin
              giao dịch trong hệ thống, đồng thời lưu trữ thông tin giao dịch
              của người tiêu dùng. Để đảm bảo các giao dịch được tiến hành thành
              công, hạn chế rủi ro có thể phát sinh.
            </Text>
            <Text>
              &nbsp; &nbsp;Trong trường hợp liên quan đến lỗi giao dịch, vui
              lòng liên hệ qua hotline hoặc gửi phản hồi cho hệ thống. Chúng tôi
              sẽ liên hệ giải quyết sớm nhất cho quý khách và hoàn lại tiền nếu
              xác nhận lỗi thuộc trách nghiệm của chúng tôi.
            </Text>
            <Text>{''}</Text>
            <Text style={styles.titleText}>8. Phản hồi hệ thống</Text>
            <Text>{''}</Text>
            <Text>
              &nbsp; &nbsp;Nếu quý khách gặp vấn đề gì liên quan đến hệ thống,
              tài khoản, giao dịch, ...Vui lòng vào mục Yêu cầu hỗ trợ, điền đầy
              đủ thông tin cần thiết. Chúng tôi sẽ liên hệ quý khách trong thời
              gian sớm nhất để xử lý hoặc thông báo cho quý khách thông qua số
              điện thoại đăng ký trong hệ thống.
            </Text>
          </View>
        </ScrollView>
        <Button
          style={{
            marginVertical: 8,
            width: '100%',
            alignSelf: 'center',
          }}
          onPress={navigation.goBack}
          buttonText="ĐỒNG Ý"
        />
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: '4%', backgroundColor: 'white'},
  logoArea: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  logo: {
    width: '32%',
    aspectRatio: 1,
  },
  imageLogo: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  titleText: {
    fontWeight: 'bold',
    color: 'black',
  },
});
