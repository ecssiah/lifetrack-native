import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, View } from 'react-native';
import { confirmAlert } from '../../actions/AlertActions';
import createStyles, { Font, FontSize, Color } from '../../styles';

import LTText from './LTText';
import LTModal from './LTModal';

const styles = createStyles({
  message: {
    fontFamily: Font.primary,
    fontSize: FontSize.subtitle,
  },
  confirmContainer: {
    flex: 1,
    bottom: 0,
    borderColor: '#dddddd', 
    borderTopWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  confirmText: {
    color: Color.working,
    fontSize: 18, 
    paddingVertical: '10%',
    textAlign: 'center',
  },
});

class LTAlert extends React.Component
{
  render() {
    console.warn(this.props.alert);

    return (
      <LTModal
        style={styles.container}
        show={this.props.alert.show}
        onPressBackdrop={this.props.confirmAlert} 
      >
        <LTText>
          {this.props.alert.message}
        </LTText>

        <TouchableOpacity 
          style={styles.confirmContainer} 
          activeOpacity={0.7}
          onPress={this.props.confirmAlert} 
        >
          <LTText style={styles.confirmText} >
            Confirm
          </LTText>
        </TouchableOpacity>
      </LTModal>
    );
  };
};

const mapStateToProps = state => ({
  alert: state.alert,
});

const mapDispatchToProps = dispatch => ({
  confirmAlert: () => dispatch(confirmAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LTAlert);