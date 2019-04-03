import React from 'react'
import { 
  TouchableOpacity, View 
} from 'react-native'
import createStyles, { FontSize } from '../../styles' 

import LTText from '../LT/LTText'

const styles = createStyles({
  containerActive: {
    backgroundColor: '#777777',
    borderTopWidth: 1,
    borderTopColor: '#888888',
    borderBottomWidth: 1,
    borderBottomColor: '#666666',
  },
  container: {
    backgroundColor: '#505050',
    borderTopWidth: 1,
    borderTopColor: '#606060',
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  headerActive: {
    color: 'white',
    fontSize: FontSize.sectionHeader,
    marginLeft: 4,
    marginVertical: 2,
  },
  header: {
    color: '#bbbbbb',
    fontSize: FontSize.sectionHeader,
    marginLeft: 4,
    marginVertical: 2,
  },
})

class FocusHeader extends React.Component 
{
  _getContainerStyle = () => {
    return this.props.active ? styles.containerActive : styles.container
  }

  _getHeaderStyle = () => {
    return this.props.active ? styles.headerActive : styles.header
  }

  render() {
    return (
      <View style={this._getContainerStyle()}>
        <TouchableOpacity 
          activeOpacity={0.7} 
          onPress={() => this.props.onCategorySelect(this.props.title)}
        >
          <LTText style={this._getHeaderStyle()}>
            {this.props.title}
          </LTText>
        </TouchableOpacity>
      </View>
    )
  }
}

export default FocusHeader