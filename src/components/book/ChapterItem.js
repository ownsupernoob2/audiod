import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import {
  PRIMARY_COLOR
} from '../../constants/Colors';
import Card from "../UI/Card";

const ChapterItem = (props) => {
  let TouchableCmp = TouchableOpacity;
 
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  // useEffect(() => {
  //   if (props.isFound == false) {
  //     setIsFound({ uri: props.image })
  //     } else   {
  //       setIsFound(require('../../assets/default.png'))
  //     }
  // },  [props.image])

  let trimmedTitle = props.title.replace(/^(.{20}[^\s]*).*/, "$1")

  if (props.title.length > 20) {
    trimmedTitle = trimmedTitle + "..."
  }
  

  return (
 
  
    <View style={styles.chapters}>

      <Card style={styles.book}>
        <Text style={styles.title}>{trimmedTitle}</Text>
        <View style={styles.actions}>
        <TouchableCmp onPress={props.onSelect} useForeground>

          <MaterialIcons
            name="play-circle-outline"
            size={34}
            color={PRIMARY_COLOR}
            style={styles.icons}
          />
          </TouchableCmp>

          <MaterialIcons
            name="file-download"
            size={34}
            color={PRIMARY_COLOR}
            style={styles.icons}
          />
        </View>
      </Card>

    </View>
  );
};

const styles = StyleSheet.create({
  book: {
    height: 50,
    width: "100%",
    borderRadius: 0,
    backgroundColor: "#121B2A",
    marginBottom: 4,
    justifyContent: "space-between",
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingTop: 10,
  },

  title: {
    fontSize: 15,
    paddingTop: 5,
    color: "white",
  },

  actions: {
    height: 45,
    flexDirection: "row",
    
  },
  icons: {
    marginHorizontal: 5,

  },
  content: {
    flex: 1,
  },
  
});

export default ChapterItem;
