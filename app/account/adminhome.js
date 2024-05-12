import AdminHeader from "../admin/adminheader";
import AdminProducts from "../admin/adminproducts";
import { View, StyleSheet, ScrollView } from "react-native";
export default function Home() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <AdminHeader />
        <AdminProducts />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
});
