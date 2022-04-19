import {
  FlatList,
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import CategoryGridTile from "../../components/UI/CategoryGridTile";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ImageOverlay from "react-native-image-overlay";
import {LinearGradient} from "expo-linear-gradient";
import MaskedView from "@react-native-community/masked-view";

import HeaderButton from "../../components/UI/HeaderButton";
import { CATEGORIES } from "../../data/categories";
import Colors from "../../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import BookText from "../../components/UI/BookText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function CategoriesScreen({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("BookList", {
        categoryId: itemData.item.id,
      });
    }

    return (
      <CategoryGridTile title={itemData.item.title} onPress={pressHandler} />
    );
  }


  return (
    <>

    <View style={{ paddingTop: 85, backgroundColor: Colors.background }}>
   
      <ScrollView           nestedScrollEnabled>
        <View style={styles.imageContainer}>
          <ImageOverlay
            source={require("../../assets/cover/cover.jpg")}
            height={180}
            contentPosition="center"
          >
          <MaterialCommunityIcons
            name="book-open-page-variant"
            size={100}
            color={Colors.primary}

           />
            <BookText
              style={{
                color: Colors.primary,
                fontWeight: "bold",
                fontSize: 21,
                fontFamily: "ArialBold",
              }}
            >
                Favorites
            </BookText>
          </ImageOverlay>
        </View>
        <View>
    
        </View>
      </ScrollView>
    </View>

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
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              onScrollToEnd();
            }
          }}
        >
          <Grid>
            <Row>
              <Col style={styles.listPanel}>
                <View>
                  <View style={styles.panelHeader}>
                    <Text
                      style={{ color: PRIMARY_FONT_COLOR, fontWeight: 'bold' }}
                    >
                  
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

                     
      <FlatList
          data={CATEGORIES}
          keyExtractor={(item) => item.id}
          renderItem={ <TouchableOpacity
                        style={{ marginBottom: 25 }}
                        onPress={() =>
                          props.navigation.navigate('BookView', {
                            item: itemData.item.id,
                            title: itemData.item.title,
                            description: itemData.item.description,
                            cover: itemData.item.cover,
                            audios: itemData.item.audios,
                            Runtime: itemData.item.Runtime,
                          })
                        }
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
                          {itemData.item.author}
                        </Text>
                      </TouchableOpacity>}
          numColumns={2}
          nestedScrollEnabled
        />


                  </View>
                  {message && (
                    <Text
                      style={{
                        color: PRIMARY_FONT_COLOR,
                        padding: 15,
                        backgroundColor: '#191919',
                        textAlign: 'center',
                      }}
                    >
                      {message}
                    </Text>
                  )}
                </View>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    </>
  );
}
export const screenOptions = (navData) => {
  return {
    headerTitle: "Home",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
    width: 330,
  },
  image: {
    width: 250,
    height: 159,
    marginBottom: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});

export default CategoriesScreen;
