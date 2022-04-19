import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Button, Image, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Container, Header, Content, H1, Icon, Item, Input } from 'native-base';
import { useSelector, useDispatch } from "react-redux";

import * as booksActions from "../store/actions/books";
import layout from '../constants/Layout';
import {
  PRIMARY_BACKGROUND_COLOR,
  PRIMARY_FONT_COLOR,
  FADE_COLOR,
  PRIMARY_COLOR
} from '../constants/Colors';
const { width } = layout.window;

const SearchScreen = ({ navigation }) => {
  
  const [audioBooks, setAudioBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scroll, setScroll] = useState(1);
  const listSize = 14
  const [error, setError] = useState();
  const [message, setMessage] = useState(null);
  const bookList = useSelector((state) => state.books.books);
  const mediaLists = useSelector((state) => state.books.mediaLists)
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');


const loadBooks = useCallback(async () => {
  setError(null);
  try {
    await dispatch(booksActions.fetchBook());
  } catch (err) {
    setError(err.message);
  }
}, [dispatch, setIsLoading, setError]);

  function onSearch(text) {
    setTerm(text);
  }

  useEffect(() => {
    if (term && term.length >= 3) {
      if (this.timeout) clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        

        const books = bookList.filter((book) =>
          book.title.toLowerCase().includes(term.toLowerCase().trim())
        );
        setAudioBooks(books);
      }, 300);
    }
  }, [term]);
  useEffect(() => {
    setIsLoading(true);
    loadBooks().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadBooks]);

  
  console.log(audioBooks)

  if (error) {
    return (
      console.log(error),
      (
        <View style={styles.centered}>
          <Text style={{  color: "red" }}>
            An error has occured please try again.
          </Text>
          <Text style={{ color: "red" }}>
            If this keeps happening please contact{" "}
          </Text>
          <Text
            style={{
              color: "red",
              paddingBottom: 10,
              textDecorationLine: "underline",
            }}
          >
            audiod.service@gmail.com
          </Text>
          <Button title="Try Again!" onPress={loadBooks} color="red" />
        </View>
      )
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      </View>
    );
  }


  return (
    <Container style={{ backgroundColor: PRIMARY_BACKGROUND_COLOR }}>
      <Header transparent iosBarStyle={'light-content'}></Header>
      <Content showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <H1 style={styles.searchText}>Search</H1>

          <Item
            regular
            style={{
              borderRadius: 8,
              backgroundColor: '#eee',
              marginBottom: 12,
              marginTop: 12,
              height: 38,
            }}
          >
            <Icon active name="search" />
            <Input placeholder="Search..." onChangeText={onSearch} />
          </Item>
        </View>

        {
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginBottom: 15,
              flex: 1,
            }}
          >
            {audioBooks.map((book) => (
              <TouchableOpacity
                style={{ marginBottom: 25 }}
                key={book.id}
                onPress={() => navigation.navigate('BookView', book)}
              >
                <Image source={{ uri: book.cover }} style={styles.panelImage} />
                <Text numberOfLines={1} style={styles.bookTitle}>
                  {book.title}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    color: FADE_COLOR,
                    marginLeft: 15,
                    width: width / 2.7,
                  }}
                >
                  {book.author}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        }
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  searchText: {
    fontWeight: 'bold',
    color: PRIMARY_FONT_COLOR,
  },
  content: {
    marginLeft: 15,
    marginRight: 15,
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  } 
});

export default SearchScreen;
