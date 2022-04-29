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
import { Container, Header, Content, H1, Right, Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

import layout from '../constants/Layout';
import CategoryGridTile from '../components/UI/CategoryGridTile';
import {
  PRIMARY_COLOR,
  FADE_COLOR,
  PRIMARY_FONT_COLOR,
  PRIMARY_BACKGROUND_COLOR,
} from '../constants/Colors';
import { CATEGORIES } from '../api/categories';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const { width } = layout.window;
function CategoriesScreen({ navigation, }) {

  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate('BookList', {
        categoryId: itemData.item.id,
      });
    }

    return (
      <CategoryGridTile title={itemData.item.title} onPress={pressHandler} />
    );
  }

  return (
    <Container style={{ backgroundColor: PRIMARY_BACKGROUND_COLOR }}>
        <Header
          transparent
          style={{ backgroundColor: '#191919', borderBottomWidth: 0 }}
          iosBarStyle={'light-content'}
        >
          <Body
            style={{
              marginLeft: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <H1 style={{ color: PRIMARY_FONT_COLOR, fontWeight: 'bold' }}>
              Genre
            </H1>
            
          </Body>

          <Right />
        </Header>
        <Content
          style={{ paddingTop: 30 }}
         
        >
          <Grid>
            <Row>
              <Col style={styles.listPanel}>
                <View>
                  <View style={styles.panelHeader}>
                    <H1 style={styles.panelTitle}>Good Morning</H1>
                    <Text
                      style={{ color: PRIMARY_FONT_COLOR, fontWeight: 'bold' }}
                    >
                      {/* {books.length} books in total */}
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

                  {CATEGORIES.map((category) => (
                      <TouchableOpacity
                        style={{ marginBottom: 25, marginLeft: 5, marginRight: 8 }}
                        key={category.id}
                        onPress={() =>
                          navigation.navigate('Home', {
                            categoryId: category.id,
                          })
                        }
                      >
                      <View style={styles.imageContainer}>
                        <Image
                          source={category.cover}
                          style={styles.panelImage}

                        />
                        </View>
                        <Text numberOfLines={1} style={styles.bookTitle}>
                          {category.title}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: FADE_COLOR,
                            marginLeft: 15,
                            width: width / 2.7,
                          }}
                        >
                        </Text>
                      </TouchableOpacity>
                    ))}
{/*                     
                  <FlatList
        numColumns={2}
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) =>  <TouchableOpacity
                        style={{ marginBottom: 25 }}
                      
                      >
                        <Image
                          source={{ uri: itemData.item.cover }}
                          style={styles.panelImage}
                        />
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
                        </Text>
                      </TouchableOpacity>}
      /> */}

                  </View>
               
                </View>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    color: '#FFF',
  },
  imageContainer: {
      width: width / 1.9 - 23,
      height: width / 1.9 - 23,
      backgroundColor: '#292929',
      justifyContent: 'center',
      alignItems: 'center',

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
    fontSize:  17,
    fontWeight: 'bold',
  },
  panelImage: {
    width: width / 2.3 - 23,
    height: width / 2.3 - 23,
    borderRadius: 6,
    backgroundColor: '#292929',
  },
  panelImageRounded: {
    height: width / 2.7,
    width: width / 2.7,
    marginLeft: 15,
    borderRadius: width / 2.7 / 2,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  } 
});

export default CategoriesScreen;
