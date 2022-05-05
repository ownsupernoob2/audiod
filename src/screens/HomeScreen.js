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
import * as booksActions from '../store/actions/books';
import { CATEGORIES } from '../api/categories';

const { width } = layout.window;

const HomeScreen = (props, navigation) => {
  //   list of useState and variables

  // const [audioBooks, setAudioBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [scroll, setScroll] = useState(1);
  // const listSize = 14;
  const [error, setError] = useState();
  const [message, setMessage] = useState(null);
  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    var hours = new Date().getHours(); //Current Hours
    setCurrentDate(hours);
    console.log(hours);
    if (currentDate >= 17) {
      setMessage('مساء الخير!');
    } else if (currentDate >= 12.5) {
      setMessage('طاب مسائك');
    } else if (currentDate >= 12) {
      setMessage('انه منتصف النهار 😎');
    } else if (currentDate >= 7) {
      setMessage('صباح الخير');
    } else if (currentDate >= 21) {
      setMessage('طاب مساؤك');
    } else if (currentDate >= 0) {
      setMessage('الوقت منتصف الليل 👻');
    } else if (currentDate >= 5) {
      setMessage('صباح جيد في الصباح الباكر');
    }
  }, [currentDate]);

  //   useEffect to load the books and also used to catch errors which is captured by the useState.
  const loadBooks = useCallback(async () => {
    setError(null);
    try {
      await dispatch(booksActions.fetchBook());
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setIsLoading, setError]);

  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener("focus", loadBooks);

  //   return () => {
  //     unsubscrirbe();
  //   };
  // }, [loadBooks]);

  // Just a basic useEffect hooks that runs the loadBooks useCallback function and also renders the loading useState.
  useEffect(() => {
    setIsLoading(true);
    loadBooks().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadBooks]);

  // Grabs the category ID from the navigation params
  // const catId = props.navigation.state.params.categoryId;

  // Fill the audioBooks array with the books that match the category ID
  // const displayedBooks = books.filter((bookItem) => {
  //   return bookItem.categoryIds.indexOf(catId) >= 0;
  // });

  const numColumns = Math.ceil(Dimensions.get('window').height / 500);

  // Grabs the category name from the navigation params for the header.
  // const categoryTitle = CATEGORIES.find(
  //   (category) => category.id === catId
  // ).title;

  if (error) {
    // Checks if theirs an error. If so, displays the error message.
    return (
      console.log(error),
      (
        <View style={styles.centered}>
          <Text style={{ color: 'red' }}>
            An error has occured please try again.
          </Text>
          <Text style={{ color: 'red' }}>
            If this keeps happening please contact{' '}
          </Text>
          <Text
            style={{
              color: 'red',
              paddingBottom: 10,
              textDecorationLine: 'underline',
            }}
          >
            audiod.service@gmail.com
          </Text>
          <Button title="Try Again!" onPress={loadBooks} color="red" />
        </View>
      )
    );
  }

  // Loading indicator, Shows when the books are loading.

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      </View>
    );
  }

  return (
    <Container style={{ backgroundColor: PRIMARY_BACKGROUND_COLOR }}>
      <Header
        transparent
        style={{ backgroundColor: '#191919', borderBottomWidth: 0 }}
        iosBarStyle={'light-content'}
        androidStatusBarColor={'green'}
      >
        <Body
          style={{
            marginLeft: '82.05%',
            alignItems: 'flex-end',
          }}
        >
          <H1 style={{ color: PRIMARY_FONT_COLOR, fontWeight: 'bold' }}>كتب</H1>
        </Body>

        <Left />
      </Header>
      <Content style={{ paddingTop: 30 }}>
        <Grid>
          <Row>
            <Col style={styles.listPanel}>
              <View>
                <View style={styles.panelHeader}>
                  <H1 style={styles.panelTitle}>{message}</H1>
                  <Text
                    style={{ color: PRIMARY_FONT_COLOR, fontWeight: 'bold' }}
                  >
                     الكتب في المجموع {books.length}
                  </Text>
                </View>

                {
                  // checks if there are books in the category
                  books.length == 0 ? (
                    <View style={styles.centered}>
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
                        لا توجد كتب هنا. إذا كنت تعتقد أن هذه مشكلة يرجى التحقق
                        من اتصال الإنترنت الخاص بك أو المحاولة مرة أخرى في وقت
                        لاحق.
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginBottom: 15,
                        flex: 1,
                        marginHorizontal: 14,
                      }}
                    >
                      <FlatList
                        onRefresh={loadBooks}
                        refreshing={isLoading}
                        numColumns={numColumns}
                        data={books}
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
                    </View>
                  )
                }
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
    alignItems: 'flex-end',
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
    marginRight: 15,
    borderRadius: 6,
    backgroundColor: '#191919',
  },
  panelImageRounded: {
    height: width / 2.7,
    width: width / 2.7,
    marginRight: 15,
    borderRadius: width / 2.7 / 2,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default HomeScreen;
