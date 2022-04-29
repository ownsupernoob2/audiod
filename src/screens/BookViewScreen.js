import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, Image, View, Alert } from 'react-native';
import {
  Container,
  Header,
  Body,
  Content,
  Left,
  Right,
  Button,
  Icon,
} from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { AdMobRewarded, setTestDeviceIDAsync } from 'expo-ads-admob';

import {
  PRIMARY_COLOR,
  FADE_COLOR,
  PRIMARY_BACKGROUND_COLOR,
  PRIMARY_FONT_COLOR,
} from '../constants/Colors';
import * as mediasActions from '../store/actions/media';
import { toggleFavorite } from '../store/actions/books';
import ChapterItem from '../components/book/ChapterItem';

const BookViewScreen = (props, navigation) => {
  // grabs the book information and puts them into a const.
  const {bookId, title, cover, audios, author, description, Runtime, Tapedby } =
    props.navigation.state.params;
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  // gets the information from the redux store
  const mediaLists = useSelector((state) => state.media);

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(bookId));
  }, [dispatch, bookId]);

  useEffect(async () => {
    await setTestDeviceIDAsync('EMULATOR');
    await AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917'); // Test ID, Replace with your-admob-unit-id

    await AdMobRewarded.requestAdAsync();
  }, [isLoading]);

  const handlePlay = async () => {
    // stores the ready alert message.

    // An alert to show the user that the ad is loading.
    // Alert.alert(
    //   'Wait! (Loading ad...)',
    //   "To keep this app free please watch this ad to listen to this book.      ",
    //   [
    //     {
    //       text: 'Cancel',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel',
    //     },
    //   ]
    // );

    
    Alert.alert(
      'Wait!',
      'To keep this app free please watch this ad to listen to this book. (Wait a few seconds before pressing "Okay" )',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Okay',
          onPress: async () => await AdMobRewarded.showAdAsync(),
          style: 'default',
        },
      ]
    );
    // Sets a requestAdAsync() before they pressing "Okay"

      setIsLoading(!isLoading);
    // Shows the ReadyAlert message after the await on the requestAdAsync()

  
    // Listen for ad events
    AdMobRewarded.addEventListener('rewardedVideoUserDidEarnReward', () => {
      console.log('User rewarded');
      dispatch(
        mediasActions.updateMedia({
          info: {
            author,
            title,
            cover,
          },
          currentlyPlaying: audios[0],
          mediaList: audios,
        })
      );
    });

    AdMobRewarded.addEventListener('rewardedVideoDidDismiss', () => {
      console.log('Dismissed reward ad. (Like who does that)');
    });
    AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad', () => {
      Alert.alert(
        'Error',
        'Ad failed to load, please try again in a few minutes.',
        {
          text: 'Okay',
        }
      );
      console.log('Ad error (failed to load.)');
    });
    AdMobRewarded.addEventListener('rewardedVideoDidFailToPresent', () => {
      Alert.alert(
        'Error',
        'Ad failed to show, please try again in a few minutes.',
        {
          text: 'Okay',
        }
      );
      console.log('Ad error (It failed to present.)');
    });
  };
  return (
    <Container style={{ backgroundColor: PRIMARY_BACKGROUND_COLOR }}>
      <Header transparent iosBarStyle={'light-content'}>
        <Left>
        <Button transparent onPress={() => props.navigation.pop()}>
            <Icon
              name="arrow-back"
              style={{
                
                fontSize: 30,
                color: PRIMARY_FONT_COLOR,
              }}
            />
            <Text style={{ color: PRIMARY_FONT_COLOR }}>Book Detail</Text>
          </Button>
        </Left>

        <Right>
          <Button transparent onPress={toggleFavoriteHandler}>
            <Icon
              name="ios-star-outline"
              style={{
                marginLeft: 5,
                fontSize: 22,
                color: PRIMARY_FONT_COLOR,
              }}
            />
          </Button>
        </Right>
      </Header>
      <Content
        style={{ marginHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            alignItems: 'center',
            paddingBottom: 15,
            marginBottom: 15,
          }}
        >
          <View
            style={{
              marginBottom: 20,
              height: 300,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Image
              resizeMode={'contain'}
              style={[{ height: '100%', width: '100%' }, styles.image]}
              source={{ uri: cover }}
            />
          </View>

          <Text style={{ color: FADE_COLOR }}>{author}</Text>
          <Text
            style={{
              fontSize: 26,
              marginVertical: 8,
              color: PRIMARY_FONT_COLOR,
            }}
          >
            {title}
          </Text>

          <Button
            onPress={() => {
              handlePlay();
            }}
            style={{
              overflow: 'hidden',
              backgroundColor: PRIMARY_COLOR,
              paddingHorizontal: 36,
              paddingVertical: 10,
              marginVertical: 10,
              borderRadius: 30,
              alignSelf: 'center',
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>PLAY</Text>
          </Button>
        </View>

        <View style={styles.infoRow}>
          <Text style={{ color: PRIMARY_FONT_COLOR }}>Listening length</Text>
          <Text style={{ color: PRIMARY_FONT_COLOR }}>
            {Runtime ? Runtime : '-'}
          </Text>
        </View>

        <View style={{ marginBottom: 30 }}>
          <Text style={{ color: PRIMARY_FONT_COLOR }}>About the book</Text>
          <Text style={{ color: FADE_COLOR, lineHeight: 20 }}>
            {description.slice(0, description.lastIndexOf('.') + 1)}
          </Text>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
  },
  starWrapper: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  starActiveIcon: {
    color: '#feb220',
    margin: 4,
  },
  starIcon: {
    color: '#d9d9d9',
    margin: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BookViewScreen;
