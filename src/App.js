import React from "react";
import View from "./view";
import Text from "./text";

const App = () => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#8BBDD9",
      height: 400,
    }}
  >
    <Text>Render RN everywhere </Text>
  </View>
);

export default App;
