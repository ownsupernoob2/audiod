import React, { useCallback, useState, Component, useEffect } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import {
  Container,
  Header,
  Body,
  Content,
  Left,
  Button,
  Icon,
} from 'native-base';
import {
  PRIMARY_COLOR,
  FADE_COLOR,
  PRIMARY_BACKGROUND_COLOR,
  PRIMARY_FONT_COLOR,
} from '../constants/Colors';
import * as mediasActions from '../store/actions/media';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import ChapterItem from '../components/book/ChapterItem';

const BookViewScreen  = (props, navigation) => {
    const { title, cover, audios, author, description, Runtime, Tapedby } =
    props.navigation.state.params;
    const [audio, isAudio] = useState(false);


    const mediaLists = useSelector((state) => state.media)
useEffect(() => {
  console.log(mediaLists)
}, [audio])
   return (
      <Container style={{ backgroundColor: PRIMARY_BACKGROUND_COLOR }}>
        <Header transparent iosBarStyle={'light-content'}>
          <Left>
            <Button transparent onPress={() => props.navigation.pop()}>
              <Icon
                name="arrow-back"
                style={{
                  marginLeft: 5,
                  fontSize: 26,
                  color: PRIMARY_FONT_COLOR,
                }}
              />
              <Text style={{ color: PRIMARY_FONT_COLOR }}> Browse</Text>
            </Button>
          </Left>
          <Body />
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
                isAudio(!audio)
                mediasActions.updateMedia({
                  info: {
                    author,
                    title,
                    cover,
                  },
                  currentlyPlaying: audios[0],
                  mediaList: audios,
                })
              }
              }
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
          <FlatList
            data={audios}
            renderItem={({ item }) => (
              <ChapterItem title={item.title} duration={item.duration} />
            )}
          />
        </Content>
      </Container>
    );
  }


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
