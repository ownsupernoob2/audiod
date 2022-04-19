import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";

import {
  Platform,
  SafeAreaView,
  Button,
  ScrollView,
  View,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import BookListScreen, {
  screenOptions as bookListScreenOptions,
} from "../screens/public/BookListScreen";
import BookPlayerScreen, {
  screenOptions as bookPlayerScreenOptions,
} from "../screens/public/BookPlayerScreen";
import CategoriesScreen, {
  screenOptions as categoriesScreenOptions,
} from "../screens/public/CategoriesScreen";
import BookDetailScreen, {
  screenOptions as bookDetailScreenOptions,
} from "../screens/public/BookDetailScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    color: Colors.primary,
    // fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    // fontFamily: 'open-sans'
  },
  headerTintColor: Colors.primary,
  headerTransparent: true,
};

const AudioBooksStackNavigator = createStackNavigator();

export const AudioBooksNavigator = () => {
  return (
    <AudioBooksStackNavigator.Navigator
      screenOptions={{ ...defaultNavOptions }}
    >
      <AudioBooksStackNavigator.Screen
        name="Categories"
        component={CategoriesScreen}
        options={categoriesScreenOptions}
      />
      <AudioBooksStackNavigator.Screen
        name="BookList"
        component={BookListScreen}
      />
      <AudioBooksStackNavigator.Screen
        name="BookDetail"
        component={BookDetailScreen}
        options={bookDetailScreenOptions}
      />
      <AudioBooksStackNavigator.Screen
        name="BookPlayer"
        component={BookPlayerScreen}
        options={bookPlayerScreenOptions}
      />
      {/* <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      */}
    </AudioBooksStackNavigator.Navigator>
  );
};

const BookDrawerNavigator = createDrawerNavigator();

export const BookNavigator = () => {
  return (
    <BookDrawerNavigator.Navigator
      screenOptions={{
        ...{
          headerTransparent: true,
          headerShown: false,
          headerTintColor: Colors.primary,
          drawerStyle: {
            backgroundColor: Colors.background,
          },
        },
      }}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../assets/logo.png")}
                  style={{ height: 115, width: 125, marginRight: 25 }}
                />
              </View>
              <ScrollView>
                <DrawerItemList
                  {...props}
                  labelStyle={{ color: "#ffffff" }}
                  activeBackgroundColor={Colors.primary}
                  activeTintColor={Colors.primary}
                />
              </ScrollView>
              <View style={{ margin: 30 }}></View>
            </SafeAreaView>
          </View>
        );
      }}
    >
      <BookDrawerNavigator.Screen
        name="Home"
        component={AudioBooksNavigator}
      />
    </BookDrawerNavigator.Navigator>
  );
};
