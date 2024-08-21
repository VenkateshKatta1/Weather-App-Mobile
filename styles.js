import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const isLargeScreen = width >= 768;

const styles = StyleSheet.create({
  // Base styles for the weather card
  weatherCard: {
    maxWidth: "100%",
    marginLeft: 60,
    marginRight: 60,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    backgroundColor: "#1f1f1f", // Darker background for a sleek look
    elevation: 10, // Enhanced shadow for Android
    alignSelf: "center",
    boxSizing: "border-box",
    display: "flex",
    borderWidth: 1,
    borderColor: "#333", // Subtle border for a futuristic feel
  },

  // Styles for the search area
  weatherSearch: {
    alignItems: "center",
    marginBottom: 20,
    flexDirection: isLargeScreen ? "row" : "column",
    justifyContent: isLargeScreen ? "center" : "flex-start",
  },

  input: {
    width: "100%",
    maxWidth: isLargeScreen ? 320 : 400,
    padding: 12,
    borderColor: "#555",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#333",
    color: "#fff", // White text for better contrast
  },

  button: {
    marginTop: isLargeScreen ? 0 : 8,
    marginLeft: isLargeScreen ? 8 : 0,
    backgroundColor: "#0d6efd", // Futuristic blue color
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0d6efd",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Styles for error messages
  error: {
    color: "#ff4c4c", // Bright red for errors
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
  },

  // Styles for weather information
  weatherInfo: {
    alignItems: "center",
  },

  weatherIcon: {
    width: isLargeScreen ? 120 : 100,
    height: isLargeScreen ? 120 : 100,
    marginBottom: 10,
    // tintColor: "#0dcaf0", // Cyan for a futuristic glow
  },

  temp: {
    fontSize: isLargeScreen ? 50 : 40,
    fontWeight: "bold",
    color: "#fff", // White text for high contrast
  },

  feels: {
    fontSize: isLargeScreen ? 28 : 24,
    color: "#cccccc", // Lighter gray for secondary info
  },

  city: {
    fontSize: isLargeScreen ? 36 : 30,
    fontWeight: "bold",
    color: "#fff",
  },

  country: {
    fontSize: isLargeScreen ? 22 : 20,
    color: "#999999", // Gray for less emphasis
    fontWeight: "bold",
  },

  localTime: {
    fontSize: 18,
    marginTop: 10,
    color: "#bbbbbb", // Gray for timestamp
  },

  // Styles for weather details
  weatherDetails: {
    alignItems: "center",
    marginTop: 20,
    flexDirection: isLargeScreen ? "row" : "column",
    justifyContent: isLargeScreen ? "space-between" : "center",
    backgroundColor: "#343a40", // Dark background for details
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  weatherDetail: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
    transform: [{ translateY: 0 }],
    opacity: 0,
  },

  weatherDetailText: {
    fontSize: isLargeScreen ? 24 : 20,
    color: "#0dcaf0", // Bright cyan text
    fontWeight: "bold",
  },

  weatherDetailValue: {
    fontSize: isLargeScreen ? 24 : 20,
    color: "#0dcaf0", // Bright cyan value
    marginLeft: 5,
    fontWeight: "bold",
  },

  // Specific styles for wind and humidity
  windIcon: {
    width: isLargeScreen ? 60 : 40,
    height: isLargeScreen ? 60 : 40,
    tintColor: "#0dcaf0", // Cyan icon color
    marginRight: 10,
  },

  humidityIcon: {
    width: isLargeScreen ? 60 : 40,
    height: isLargeScreen ? 60 : 40,
    tintColor: "#0dcaf0", // Cyan icon color
    marginRight: 10,
    marginBottom: isLargeScreen ? 0 : 12,
  },
});

// Animation styles
const animateDetails = {
  from: { opacity: 0, translateY: 20 },
  to: { opacity: 1, translateY: 0 },
  timing: { duration: 600, delay: 200 },
};

export default styles;
