import React from 'react';
import { Image, View } from 'react-native';
import createStyles from '../../styles';

const styles = createStyles({
  container: {
  },
  backgroundWrapper: {
  },
  backgroundImage: {
  },
  progressWrapper: {
  },
  progressImage: {
  }, 
});

class LTProgress extends React.Component 
{
  render() {
    return (
      <View style={styles.container} >
        <View style={styles.backgroundWrapper} >
          <Image 
            style={styles.backgroundImage} 
            source={require('../../assets/textures/progress-back.png')}
          />
        </View>

        <View style={styles.progressWrapper} >
          <Image 
            style={styles.progressImage} 
            source={require('../../assets/textures/progress-bar.png')}
          />
        </View>
      </View>
    );
  };
};

export default LTProgress;