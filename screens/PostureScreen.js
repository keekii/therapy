import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { fontFamily } from "../constants/Theme";
import { Context as CalendarContext } from "../context/CalendarContext";

const PostureScreen = ({ navigation }) => {
  const { state, getPosture, setSelected } = useContext(CalendarContext);
  const [switchVal, setSwitchVal] = useState(false);

  useEffect(() => {
    getPosture();
  }, []);

  const buttPress = (item) => {
    switchVal === false
      ? setSelected(item)
      : navigation.navigate("PostureDetail", { id: item });
  };

  return (
    <>
      {state.isLoading === false ? (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Postures List</Text>

            {switchVal === true ? (
              <TouchableOpacity onPress={() => setSwitchVal(!switchVal)}>
                <Text style={styles.selectText}>Mode : View</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setSwitchVal(!switchVal)}>
                <Text style={styles.selectText}>Mode : Select</Text>
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={state.postures}
            horizontal={false}
            numColumns={2}
            keyExtractor={(item) => {
              return item.key;
            }}
            renderItem={({ item }) => {
              let style_card;
              item.isSelected === false
                ? (style_card = styles.card)
                : (style_card = styles.card2);
              return (
                <TouchableOpacity
                  style={style_card}
                  onPress={() => buttPress(item.key)}
                >
                  <View style={styles.cardFooter}></View>
                  <Image
                    style={styles.cardImage}
                    source={{ uri: item.thumbnail }}
                  />
                  <View style={styles.cardHeader}>
                    <View
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Text style={styles.title}>{item.name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          <View style={styles.btnBox}>
            <TouchableOpacity
              style={styles.submitContainer}
              onPress={() => navigation.pop()}
            >
              <Text style={styles.submitText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  headerContainer: {
    marginTop: 60,
    marginHorizontal: 24,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    color: "#555555",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily,
  },
  selectText: {
    color: "#555555",
    fontSize: 14,
    fontFamily,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#FFF",
  },
  listContainer: {
    alignItems: "center",
  },
  /******** card **************/
  cardSelected: {
    shadowColor: "#00000021",
    borderColor: "red",
    borderWidth: 5,

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 10,
    backgroundColor: "white",
    flexBasis: "42%",
    marginHorizontal: 10,
  },
  card: {
    shadowColor: "#00000021",
    borderColor: "#DADADA",
    borderWidth: 1,

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 10,
    backgroundColor: "white",
    flexBasis: "42%",
    marginHorizontal: 10,
  },
  card2: {
    shadowColor: "#00000021",
    borderColor: "red",
    borderWidth: 1,

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 10,
    backgroundColor: "white",
    flexBasis: "42%",
    marginHorizontal: 10,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 70,
    width: 70,
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "#696969",
  },
  submitContainer: {
    backgroundColor: "#62D3D9",
    height: 56,
    paddingVertical: 12,
    //marginTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  btnBox: {
    flex: 1,
    marginHorizontal: 24,
  },
});

PostureScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default PostureScreen;
