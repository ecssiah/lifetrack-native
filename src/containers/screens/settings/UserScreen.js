import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import createStyles, { FontSize } from '../../../styles';
import LTText from '../../../components/LT/LTText';

const styles = createStyles({
  container: {
    flex: 1,
    padding: 60, 
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  profileText: {
    fontSize: FontSize.modalTitle,
  },
  profileInput: {
    fontSize: FontSize.modalTitle,
  },
});

class UserScreen extends React.Component 
{
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return (
      <View style={styles.container}>
        <LTText style={styles.profileText} >
          email: {this.props.user.email} 
        </LTText>

        <LTText style={styles.profileText} >
          age: 26
        </LTText>
      </View>
    );
  };
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);