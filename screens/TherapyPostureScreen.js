import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Avatar } from 'react-native-elements';
import Theme, { fontFamily } from "../constants/Theme";
import { Context as TherapyPostureContext } from "../context/TherapyPostureContext";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const TherapyPostureScreen = ({ navigation }) => {
  const { state, getTherapyPostureList } = useContext(TherapyPostureContext);
  const { therapyPostureList } = state;

  useEffect(() => {
    getTherapyPostureList()
  }, []);

  // const mock = [
  //   {id: '1', therapy_posture_name: 'Posture 1', therapy_posture_description: 'Hello test', therapy_posture_thumbnail_image: 'https://bootdey.com/img/Content/avatar/avatar4.png', therapy_posture_video: 'https://www.youtube.com/embed/zndvqTc4P9I'},
  //   {id: '2', therapy_posture_name: 'Posture 2', therapy_posture_description: 'Hello test', therapy_posture_thumbnail_image: 'https://bootdey.com/img/Content/avatar/avatar4.png', therapy_posture_video: 'https://www.youtube.com/embed/zndvqTc4P9I'},
  //   {id: '3', therapy_posture_name: 'Posture 3', therapy_posture_description: 'Hello test', therapy_posture_thumbnail_image: 'https://bootdey.com/img/Content/avatar/avatar4.png', therapy_posture_video: 'https://www.youtube.com/embed/zndvqTc4P9I'},
  //   {id: '4', therapy_posture_name: 'Posture 4', therapy_posture_description: 'Hello test', therapy_posture_thumbnail_image: 'https://bootdey.com/img/Content/avatar/avatar4.png', therapy_posture_video: 'https://www.youtube.com/embed/zndvqTc4P9I'}
  // ]

  const renderAppointmentRequestItems = (item, index) => {
    return <TouchableOpacity onPress={() => navigation.navigate('TherapyPostureDetail', { data: item })}>
      <View style={styles.box}>
        <Image style={styles.image} source={{ uri: item['therapy_posture_thumbnail_image'] }} />
        <Text style={styles.username}>{item['therapy_posture_name']}</Text>
      </View>
    </TouchableOpacity>
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.patientTitle}>THERAPY POSTURES</Text>
      <FlatList
        data={therapyPostureList}
        style={styles.container2}
        enableEmptySections={true}
        keyExtractor={(item, index) => {
          return item.key + index;
        }}
        renderItem={({ item, index }) => renderAppointmentRequestItems(item, index)}
      />
       <View>
          <TouchableOpacity
            style={styles.submitContainer}
            onPress={() => navigation.navigate("CreateTherapyPosture")}
          >
            <Text style={styles.submitText}>Create new therapy posture</Text>
          </TouchableOpacity>
        </View>
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
    width: 80,
    height: 80,
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
    elevation: 2,
    height: 80
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

export default TherapyPostureScreen;
