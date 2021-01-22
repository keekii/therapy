import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Avatar } from 'react-native-elements';
import Theme, { fontFamily } from "../constants/Theme";
import { Context as AuthContext } from "../context/AuthContext";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const UserAccountScreen = ({ navigation }) => {
  const { state, getUserAccountList } = useContext(AuthContext);
  const { userList } = state;

  useEffect(() => {
    getUserAccountList()
  }, []);

  const renderAppointmentRequestItems = (item, index) => {
    console.log(item)
    return <TouchableOpacity onPress={() => navigation.navigate('UserAccountDetail', { data: item })}>
      <View style={styles.box}>
        <Image style={styles.image} source={{ uri: item['profile_pic']}} />
        <Text style={styles.username}>{item['name']}</Text>
      </View>
    </TouchableOpacity>
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.patientTitle}>USER ACCOUNTS</Text>
      <FlatList
        data={userList}
        style={styles.container2}
        enableEmptySections={true}
        keyExtractor={(item, index) => {
          return item.uid + index;
        }}
        renderItem={({ item, index }) => renderAppointmentRequestItems(item, index)}
      />
      <TouchableOpacity
        style={styles.submitContainer}
        onPress={() => navigation.navigate("CreateUserAccount")}
      >
        <Text style={styles.submitText}>Create new user</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerContainer: { backgroundColor: "#F0EDED", fontFamily },

  itemContainer: {
    backgroundColor: "#F3F3F3",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#00CAD3",
  },
  itemTitleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    //paddingRight: 16,
  },

  patientTitle: {
    color: "#1D2029",
    fontSize: 16,
    fontWeight: "600",
    fontFamily,
    marginBottom: 10,
  },
  postureTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555555",
    fontFamily,
  },
  commentTitle: {
    fontSize: 12,
    color: "#555555",
    fontFamily,
  },
  commentContainer: {
    marginHorizontal: 18,
    marginVertical: 12,
    padding: 16,
    backgroundColor: "#FFF",
    height: 75,
  },
  commentText: {
    fontSize: 12,
    color: "#555555",
    fontFamily,
  },
  listContainer: {
    flex: 1,
  },

  postureContainer: {
    backgroundColor: "#F3F3F3",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#00CAD3",
  },
  _itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
  },
  inputIcon: {
    justifyContent: "center",
    marginLeft: 15,
  },
  thumbnail: {
    width: 99,
    height: 56,
  },
  image: {
    width: 60,
    height: 60,
  },
  body: {
    padding: 30,
    backgroundColor: "#E6E6FA",
  },
  box: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height: 1,
      width: -2
    },
    elevation: 2
  },
  username: {
    color: "#20B2AA",
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 10
  },
  iconContent: {
    width: 60,
    height: 60,
    backgroundColor: '#40E0D0',
    marginLeft: 'auto',
    alignItems: 'center'
  },
  icon: {
    width: 40,
    height: 40,
  },
  submitContainer: {
    backgroundColor: "#62D3D9",
    height: 56,
    paddingVertical: 12,
    marginVertical: 12,

    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default UserAccountScreen;
