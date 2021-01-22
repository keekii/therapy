import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Avatar } from 'react-native-elements';
import Theme, { fontFamily } from "../constants/Theme";
import { Context as CalendarContext } from "../context/CalendarContext";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const PatientAppointmentRequestScreen = ({ navigation }) => {
  const { state, getPatientAppointmentRequestList } = useContext(CalendarContext);
  const { appointmentRequestList } = state;

  useEffect(() => {
    getPatientAppointmentRequestList()
  }, []);

  const renderAppointmentRequestItems = (item, index) => {
    return <TouchableOpacity onPress={() => navigation.navigate('PatientAppointmentRequestDetail', { data: item })}>
      <View style={styles.box}>
        <Image style={styles.image} source={{ uri: item['therapist']['profile_pic'] }} />
        <View style={styles.box2}>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
            <Text style={styles.username}>{item['therapist']['name']}</Text>
            <Text style={styles.dateTime}>{item['start_time'] + " - " + item['end_time']}</Text>
            <Text style={styles.dateTime}>{item['date']}</Text>
          </View>
          <View style={styles.box3}>
            <Text style={styles.status}>{item['status']}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.patientTitle}>APPOINTMENT REQUESTS</Text>
      <FlatList
        data={appointmentRequestList}
        style={styles.container2}
        enableEmptySections={true}
        keyExtractor={(item, index) => {
          return item.key + index;
        }}
        renderItem={({ item, index }) => renderAppointmentRequestItems(item, index)}
      />
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
  box2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
  },
  box2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
  },
  box3: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#F47A8D',
    width: 80,
    height: 30,
    alignItems: 'center',
  },
  username: {
    color: "#20B2AA",
    fontSize: 22,
    marginLeft: 10
  },
  dateTime: {
    color: "#2F343A",
    fontSize: 12,
    marginLeft: 10,
    marginTop: 2
  },
  status: {
    color: "#fff",
    fontSize: 14,
    alignSelf: 'center',
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
  }
});

export default PatientAppointmentRequestScreen;
