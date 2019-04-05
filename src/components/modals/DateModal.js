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
    width: 36,
  },
  dayPicker: {
    width: 24,
  },
  yearPicker: {
    width: 48,
  },
})

const months = [
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
          label={months[i]} 
          value={i} 
        />
      )
    } 

    return monthItems
  }


  _getDayItems = () => {
    const dayItems = []

    const totalDays = daysInMonth(
      this.props.date.getMonth() + 1, this.props.date.getDay()
    ) 

    for (let i = 0; i < totalDays; i++) {
      dayItems.push(
        <Picker.Item 
          key={i} 
          label={(i + 1).toString()} 
          value={(i + 1).toString()} 
        />
      )
    }

    return dayItems
  }


  _getYearItems = () => {
    const yearItems = []

    const start = 2019
    const end = new Date().getFullYear() 

    for (let i = start; i < end + 1; i++) {
      yearItems.push(
        <Picker.Item 
          key={i} 
          label={i.toString()} 
          value={i.toString()} 
        />
      )
    }

    return yearItems
  }


  _onMonthChange = (date, index) => {
    let d = new Date(this.props.date)
    d.setMonth(date)

    this.props.onDateChange(d)
  }

  
  _onDayChange = (date, index) => {
    let d = new Date(this.props.date)
    d.setDate(date)

    this.props.onDateChange(d)
  }


  _onYearChange = (date, index) => {
    let d = new Date(this.props.date)
    d.setFullYear(date)

    this.props.onDateChange(d)
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
          {this.props.dateTitle}
        </LTText>

        <View style={styles.datePickers} >
          <Picker
            style={styles.monthPicker}
            itemStyle={{ fontFamily: Font.primary }}
            selectedValue={this.props.date.getMonth()}
            onValueChange={this._onMonthChange}
          >
            {this._getMonthItems()}
          </Picker>

          <Picker
            style={styles.dayPicker}
            itemStyle={{ fontFamily: Font.primary }}
            selectedValue={this.props.date.getDay()}
            onValueChange={this._onDayChange}
          >
            {this._getDayItems()}
          </Picker>

          <Picker
            style={styles.yearPicker}
            itemStyle={{ fontFamily: Font.primary }}
            selectedValue={this.props.date.getFullYear()}
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