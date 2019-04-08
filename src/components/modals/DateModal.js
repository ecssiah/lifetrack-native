import React from 'react'
import { Picker, View } from 'react-native'
import { daysInMonth } from '../../../lib/utils';
import createStyles, { FontSize, Font } from '../../styles'

import LTText from '../LT/LTText'
import LTModal from '../LT/LTModal'
import LTSpacer from '../LT/LTSpacer'
import LTConfirm from '../LT/LTConfirm'

const styles = createStyles({
  container: {
    height: 332,
  },
  title: {
    fontSize: FontSize.modalTitle,
  },
  datePickers: {
    flexDirection: 'row',
  },
  monthPicker: {
    width: 62,
  },
  dayPicker: {
    width: 48,
  },
  yearPicker: {
    width: 64,
  },
  pickerItem: {
    fontFamily: Font.primary,
  },
})

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

class DateModal extends React.Component 
{
  _getMonthItems = () => {
    const monthItems = []

    for (let i = 0; i < 12; i++) {
      monthItems.push(
        <Picker.Item 
          key={i} 
          label={MONTHS[i]} 
          value={i} 
        />
      )
    } 

    return monthItems
  }


  _getDateItems = () => {
    const dateItems = []

    const numDays = daysInMonth(
      this.props.date.getMonth() + 1, this.props.date.getDay()
    ) 

    for (let i = 1; i <= numDays; i++) {
      dateItems.push(
        <Picker.Item 
          key={i} 
          label={i.toString()} 
          value={i} 
        />
      )
    }

    return dateItems
  }


  _getYearItems = () => {
    const yearItems = []

    const start = 2017
    const end = new Date().getFullYear() 

    for (let i = start; i < end + 1; i++) {
      yearItems.push(
        <Picker.Item 
          key={i} 
          label={i.toString()} 
          value={i} 
        />
      )
    }

    return yearItems
  }


  _onMonthChange = month => {
    const d = new Date(this.props.date)
    d.setMonth(month)

    this.props.onChange(d)
  }

  
  _onDateChange = date => {
    const d = new Date(this.props.date)
    d.setDate(date)

    this.props.onChange(d)
  }


  _onYearChange = year => {
    const d = new Date(this.props.date)
    d.setFullYear(year)

    this.props.onChange(d)
  }


  render() {
    return (
      <LTModal
        style={styles.container}
        show={this.props.show}
        onPressBackdrop={this.props.onCancel}
      >
        <LTSpacer large />

        <LTText style={styles.title}>
          {this.props.title}
        </LTText>

        <View style={styles.datePickers} >
          <Picker
            style={styles.monthPicker}
            itemStyle={styles.pickerItem}
            selectedValue={this.props.date.getMonth()}
            onValueChange={this._onMonthChange}
          >
            {this._getMonthItems()}
          </Picker>

          <Picker
            style={styles.dayPicker}
            itemStyle={styles.pickerItem}
            selectedValue={this.props.date.getDate()}
            onValueChange={this._onDateChange}
          >
            {this._getDateItems()}
          </Picker>

          <Picker
            style={styles.yearPicker}
            itemStyle={styles.pickerItem}
            selectedValue={this.props.date.getFullYear()}
            onValueChange={this._onYearChange}
          >
            {this._getYearItems()}
          </Picker>
        </View>

        <LTConfirm
          onPressLeft={this.props.onCancel} 
          onPressRight={this.props.onConfirm}
        />
      </LTModal>
    )
  }
}

export default DateModal