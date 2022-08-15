import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
const CustomDatePicker = props => {
  return (
    <DateTimePickerModal
      isVisible={props.isVisible}
      mode={props.mode}
      onConfirm={props.handleConfirm}
      onCancel={props.hideDatePicker}
      minimumDate={props.minimumDate ? new Date() : null}
      maximumDate={
        !props.minimumDate
          ? new Date(moment())
          : new Date(moment().add(30, 'days'))
      }
    />
  );
};

export default CustomDatePicker;
