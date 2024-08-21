import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import styles from "./styles";
import Constants from "expo-constants";

const API_KEY = Constants.manifest.extra.apiKey;

const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const ICON_MAP = {
  Clouds: require("./assets/Images/clouds.png"),
  Clear: require("./assets/Images/clear.png"),
  Rain: require("./assets/Images/rain.png"),
  Drizzle: require("./assets/Images/drizzle.png"),
  Snow: require("./assets/Images/snow.png"),
  Mist: require("./assets/Images/mist.png"),
  Wind: require("./assets/Images/wind.png"),
  Humidity: require("./assets/Images/humidity.png"),
};

const DEFAULT_ICON = require("./assets/Images/clear.png");

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
    <ScrollView style={styles.weatherCard}>
      <View style={styles.weatherSearch}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={fetchWeatherData} // Call fetchWeatherData on Enter
          enterKeyHint="search" // Shows a search key on the keyboard
        />
        <Pressable style={styles.button} onPress={fetchWeatherData}>
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      {weatherData && !error && (
        <View style={styles.weatherInfo}>
          <Image
            source={ICON_MAP[weatherData.weather[0].main] || DEFAULT_ICON}
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
          <Animatable.View
            animation="fadeInUp"
            delay={300}
            style={styles.weatherDetails}
          >
            <Animatable.View
              animation="fadeIn"
              delay={600}
              style={styles.weatherDetail}
            >
              <Image
                source={require("./assets/Images/humidity.png")}
                style={styles.humidityIcon}
              />
              <Text style={styles.weatherDetailText}>Humidity:</Text>
              <Text style={styles.weatherDetailValue}>
                {weatherData.main.humidity}%
              </Text>
            </Animatable.View>
            <Animatable.View
              animation="fadeIn"
              delay={800}
              style={styles.weatherDetail}
            >
              <Image
                source={require("./assets/Images/wind.png")}
                style={styles.windIcon}
              />
              <Text style={styles.weatherDetailText}>Wind Speed:</Text>
              <Text style={styles.weatherDetailValue}>
                {Math.round(weatherData.wind.speed)} m/s
              </Text>
            </Animatable.View>
          </Animatable.View>
        </View>
      )}
    </ScrollView>
  );
};

export default App;
