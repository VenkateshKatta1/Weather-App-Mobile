// App.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import cloudIcon from "./assets/Images/clouds.png";
import clearIcon from "./assets/Images/clear.png";
import rainIcon from "./assets/Images/rain.png";
import drizzleIcon from "./assets/Images/drizzle.png";
import snowIcon from "./assets/Images/snow.png";
import mistIcon from "./assets/Images/mist.png";
import defaultIcon from "./assets/Images/default.png";

// Constants
const API_KEY = "106ed7e15b90faa038e3974de41e5336";
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const ICON_MAP = {
  Clouds: cloudIcon,
  Clear: clearIcon,
  Rain: rainIcon,
  Drizzle: drizzleIcon,
  Snow: snowIcon,
  Mist: mistIcon,
};

// Convert timestamp and timezone to local time
const convertToLocalTime = (timestamp, timezone) => {
  const localDate = new Date((timestamp + timezone) * 1000);
  return localDate.toLocaleString("en-US", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`${API_URL}${city}&appid=${API_KEY}`);
      setWeatherData({
        ...response.data,
        localTime: convertToLocalTime(response.data.dt, response.data.timezone),
      });
      setError(null);
    } catch (err) {
      setWeatherData(null);
      setError("City not found or API request failed.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Search" onPress={fetchWeatherData} />
      {error && <Text style={styles.error}>{error}</Text>}
      {weatherData && !error && (
        <View style={styles.weatherInfo}>
          <Image
            source={ICON_MAP[weatherData.weather[0].main] || defaultIcon}
            style={styles.weatherIcon}
          />

          <Text style={styles.temp}>{Math.round(weatherData.main.temp)}°C</Text>
          <Text style={styles.feels}>
            Feels like {Math.round(weatherData.main.feels_like)}°C
          </Text>
          <Text style={styles.city}>{weatherData.name}</Text>
          <Text style={styles.country}>{weatherData.sys.country}</Text>
          <Text style={styles.localTime}>
            Local Time: {weatherData.localTime}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
  },
  weatherInfo: {
    alignItems: "center",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temp: {
    fontSize: 40,
  },
  feels: {
    fontSize: 20,
  },
  city: {
    fontSize: 30,
  },
  country: {
    fontSize: 20,
  },
  localTime: {
    fontSize: 20,
    marginTop: 10,
  },
});

export default App;
