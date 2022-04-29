import { Pressable, View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

function CategoryGridTile({ title, color, onPress }) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
      <LinearGradient
          // Background Linear Gradient
            start={[0, 0]}
            locations={[0, 1]}
          colors={['#05c6a3', Colors.accent]}
          style={[styles.innerContainer, { backgroundColor: Colors.accent }]}
        >
          <Text style={styles.title}>{title}</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    zIndex: 2,
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
     borderColor: Colors.accent,
    borderWidth: 2,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  button: {
    flex: 1,
    zIndex: 2
  },
  buttonPressed: {
    opacity: 0.5,
    zIndex: 2
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    zIndex: 2,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'ArialBold',
    color: 'white'
  },
});
