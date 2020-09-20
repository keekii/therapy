import React, { useContext, useState, memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import moment from "moment";
import { Context as CalendarContext } from "../context/CalendarContext";
import { NavigationEvents } from "react-navigation";

const CalendarScreen = ({ navigation }) => {
  const today = moment().format("YYYY-MM-DD");
  const { getItems, state } = useContext(CalendarContext);
  const [data, setData] = useState({});
  const { appointments } = state;

  // console.log(appointments);

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  const loadItems = (day) => {
    items = appointments;

    setTimeout(() => {
      if (state.appointments) {
        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);

          if (!state.appointments[strTime]) {
            state.appointments[strTime] = [];
          }
        }

        const newItems = {};
        Object.keys(state.appointments).forEach((key) => {
          newItems[key] = state.appointments[key];
        });
        setData(newItems);
      }
    }, 1000);
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
        <Text>{item.name}</Text>
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
    <View style={styles.container}>
      <NavigationEvents onWillFocus={getItems} />
      <Agenda
        style={{ marginTop: 60 }}
        items={data}
        loadItemsForMonth={loadItems}
        selected={today}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
      />
      <TouchableOpacity
        style={styles.submitContainer}
        onPress={() => navigation.navigate("CreateAppointment")}
      >
        <Text style={styles.submitText}>Create appointments</Text>
      </TouchableOpacity>
    </View>
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

    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default memo(CalendarScreen);
