import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  FlatList,
  Button,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  H1,
  Right,
  Body,
  Left,
  Icon,
} from 'native-base';
import { Button as ButtonBase } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

import layout from '../constants/Layout';
import Colors, {
  PRIMARY_BACKGROUND_COLOR,
  PRIMARY_FONT_COLOR,
  FADE_COLOR,
  PRIMARY_COLOR,
} from '../constants/Colors';


const { width } = layout.window;

const FavoritesScreen = (props, navigation) => {
  //   list of useState and variables

  const [isLoading, setIsLoading] = useState(false);

 
  const favBooks = useSelector((state) => state.books.favoriteBooks);

  const numColumns = Math.ceil(Dimensions.get('window').height / 500);

 
 


  return (
    <Container style={{ backgroundColor: PRIMARY_BACKGROUND_COLOR }}>
      <Header
        transparent
        style={{ backgroundColor: '#191919', borderBottomWidth: 0 }}
        iosBarStyle={'light-content'}
        androidStatusBarColor={'green'}
      >
       
        <View style={{
          paddingLeft: '76.5%',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <H1 style={{ color: PRIMARY_FONT_COLOR, fontWeight: 'bold' }}>
        المفضلة
            </H1>
            </View>

        <Right />
      </Header>
      <Content style={{ paddingTop: 30 }}>
        <Grid>
          <Row>
            <Col style={styles.listPanel}>
              <View>
                <View style={styles.panelHeader}>
                  <H1 style={styles.panelTitle}>كتبك المفضلة.</H1>
                  <Text
                    style={{ color: PRIMARY_FONT_COLOR, fontWeight: 'bold' }}
                  >
                  كتب في المفضلة لديك {favBooks.length} 
                  </Text>
                </View>

                
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginBottom: 15,
                        flex: 1,
                      }}
                    >

                    { !favBooks.length == 0 ? (
                    <FlatList
                        numColumns={numColumns}
                        data={favBooks}
                        keyExtractor={(item) => item.id}
                        renderItem={(itemData) => (
                          <TouchableOpacity
                            style={{ marginBottom: 25 }}
                            onPress={() =>
                              props.navigation.navigate('BookView', {
                                bookId: itemData.item.id,
                                title: itemData.item.title,
                                description: itemData.item.description,
                                cover: itemData.item.cover,
                                audios: itemData.item.audios,
                                Runtime: itemData.item.Runtime,
                              })
                            }
                          >
                          {console.log(itemData.item.id)}
                            <Image
                              source={{ uri: itemData.item.cover }}
                              style={styles.panelImage}
                            />
                            <View style={{}}>
                              <Text numberOfLines={1} style={styles.bookTitle}>
                                {itemData.item.title}
                              </Text>
                              <Text
                                numberOfLines={1}
                                style={{
                                  color: FADE_COLOR,
                                  marginLeft: 15,
                                  width: width / 2.7,
                                }}
                              >
                                {itemData.item.author}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        )}
                      />
                    ) : (                    <View style={styles.centered}>
                      <Text
                        style={{
                          color: '#aaa',
                          fontSize: 14,
                          textAlign: 'center',
                          fontWeight: 'bold',
                          padding: 20,
                          paddingTop: '40%',
                        }}
                      >
                      لا توجد كتب في المفضلة لديك ، ابدأ في إضافة بعض!</Text>
                    </View>)
                    }
                    </View>

                
              </View>
            </Col>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  headerIcon: {
    color: '#FFF',
  },
  listPanel: {
    marginBottom: 30,
  },
  panelHeader: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginRight: 15,
    // alignItems: 'center',
    marginLeft: 15,
    marginBottom: 15,
  },
  panelTitle: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  bookTitle: {
    marginLeft: 15,
    marginTop: 6,
    width: width / 2.7,
    color: '#FFF',
  },
  panelImage: {
    width: width / 2 - 23,
    height: width / 2 - 23,
    marginLeft: 15,
    borderRadius: 6,
    backgroundColor: '#191919',
  },
  panelImageRounded: {
    height: width / 2.7,
    width: width / 2.7,
    marginLeft: 15,
    borderRadius: width / 2.7 / 2,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default FavoritesScreen;
