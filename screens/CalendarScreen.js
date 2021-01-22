import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import moment from "moment";
import { Context as CalendarContext } from "../context/CalendarContext";
import { SafeAreaView } from "react-native-safe-area-context";

const CalendarScreen = ({ navigation }) => {
  const today = moment().format("YYYY-MM-DD");
  const { getItems, state, unsubscribe } = useContext(CalendarContext);
  const { appointments } = state;

  useEffect(() => {
    getItems();
    return () => {
      unsubscribe();
    };
  }, []);

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const loadItems = (day) => {
    getItems(day);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={[styles.item]}
        onPress={() =>
          navigation.navigate("AppointmentDetail", {
            key: item.key,
          })
        }
      >
        <Text>{item.topic}</Text>
        <Text>{item.date}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <NavigationEvents onWillFocus={getPatientItems} /> */}
      <Agenda
        items={appointments}
        loadItemsForMonth={loadItems}
        selected={today}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity
          style={styles.submitContainer}
          onPress={() => navigation.navigate("CreateAppointment")}
        >
          <Text style={styles.submitText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.submitContainer2}
        onPress={() => navigation.navigate("AppointmentRequest")}
      >
        <Text style={styles.submitText}>Requests</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  submitContainer: {
    backgroundColor: "#62D3D9",
    height: 56,
    paddingVertical: 12,
    width: '50%',
    alignItems: "center",
    justifyContent: "center",
  },
  submitContainer2: {
    backgroundColor: "#F47A8D",
    height: 56,
    paddingVertical: 12,
    width: '50%',
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default CalendarScreen;
