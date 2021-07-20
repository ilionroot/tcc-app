import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: 24,
    width: 300,
    height: 300,
    borderWidth: 16,
    borderColor: "saddlebrown",
    flexDirection: "row",
    flexWrap: "wrap-reverse",
  },
  house: {
    width: 33.5,
    height: 33.5,
  },
  piece: {
    width: 33.5,
    height: 33.5,
    position: "absolute",
  },
  piecesContainer: {
    width: 33.5,
    height: 33.5,
  },
});
