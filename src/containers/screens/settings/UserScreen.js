import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import createStyles, { FontSize } from '../../../styles';
import LTText from '../../../components/LT/LTText';
import LTIcon from '../../../components/LT/LTIcon';

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
  static navigationOptions = ({navigation}) => ({
    title: 'Profile',
    headerLeft: (
      <LTIcon
        type='ios-arrow-back'
        size={32}
        onPress={() => navigation.goBack()}
      />
    ),
  });

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