import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import reduxThunk from 'redux-thunk';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';

import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import BookViewScreen from './src/screens/BookViewScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';

import { PRIMARY_COLOR } from './src/constants/Colors';

import MediaBottomSheet from './src/components/book/MediaBottomSheet';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { connect } from 'react-redux';
import reducers from './src/store/reducers';
import showBottomTabs from './src/store/reducers/showBottomTabs';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));


/*
 * Manually hiding the bottom navigation tab when media player bottom sheet is opened
 * Just to fix the android bottom tab not getting overlapped by media player bottom sheet smh
 */
const bottomTabNavigation = (props) => {
  return (
    <BottomTabBar
      {...props}
      style={[
        props.showBottomTabs ? {} : { opacity: 0 },
        { borderTopColor: '#000' },
      ]}
    />
  );
};
function mapStateToProps({ showBottomTabs }) {
  return { showBottomTabs };
}
const TabBarComponent = connect(mapStateToProps)(bottomTabNavigation);

const bottomMediaPanel = (props) => {
  return props.media.currentlyPlaying ? <MediaBottomSheet {...props} /> : null;
};

function mapStateToProps1({ media }) {
  return { media };
}
const MediaBottomPanel = connect(mapStateToProps1)(bottomMediaPanel);

const switchNavigator = createSwitchNavigator({
  mainFlow: createBottomTabNavigator(
    {
      Home: createStackNavigator(
        {
          Categories: CategoriesScreen,
          Home: HomeScreen,
          BookView: BookViewScreen,
        },
        {
          headerMode: 'none',
        }
      ),
      Search: createStackNavigator(
        {
          Search: SearchScreen,
          BookView: BookViewScreen,
        },
        {
          headerMode: 'none',
        }
      ),
      Favorites: createStackNavigator(
        {
          Favorites: FavoritesScreen,
          BookView: BookViewScreen,
        },
        {
          headerMode: 'none',
        }
      )
      // MyBooks: MyBooksScreen,
      // Profile: createStackNavigator({
      //   Profile: ProfileScreen,
      //   About: AboutScreen
      // },{
      //   headerMode: 'none'
      // }),
    },
    {
      tabBarComponent: (props) => (
        <View>
          <MediaBottomPanel {...props} />
          <TabBarComponent {...props} />
        </View>
      ),
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          const IconComponent = Ionicons;
          let iconName;

          switch (routeName) {
            case 'Home':
              iconName = 'ios-home';
              break;
            case 'Search':
              iconName = 'ios-search';
              break;
            case 'Favorites':
              iconName = 'ios-star';
              break;
            case 'MyBooks':
              iconName = 'ios-book';
              break;
            // focused ? 'ios-search' : 'ios-search';
            case 'Profile':
              iconName = 'ios-person';
              break;
            default:
              iconName = 'ios-information-circle';
          }

          if (routeName === 'Home') {

          } else if (routeName === 'Settings') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: PRIMARY_COLOR,
        inactiveTintColor: 'gray',
      },
    }
  ),
});

const Navigation = createAppContainer(switchNavigator);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <Navigation theme="dark" />
      </Provider>
    );
  }
}
