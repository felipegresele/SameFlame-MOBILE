import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import * as Location from "expo-location";

function Emergencia() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Permita o acesso à localização para usar esta funcionalidade.");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  const handleEmergencia = async () => {
    setLoading(true);
    try {
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);

      Alert.alert(
        "Emergência enviada",
        `Suas coordenadas foram enviadas para a equipe de bombeiros e serão tratadas com urgência.\n\nLatitude: ${currentLocation.coords.latitude}\nLongitude: ${currentLocation.coords.longitude}`,
        [{ text: "OK" }]
      );

      // Aqui você pode integrar o envio real para a API
    } catch (error) {
      Alert.alert("Erro", "Não foi possível obter sua localização.");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/565/565547.png" }}
        style={styles.icone}
      />

      <Text style={styles.titulo}>🚨 Emergência - Incêndio</Text>

      <Text style={styles.aviso}>
        ⚠️ Use este botão apenas em casos críticos de incêndio. Sua localização será enviada imediatamente para a equipe de bombeiros.
      </Text>

      <TouchableOpacity
        style={styles.botaoEmergencia}
        onPress={handleEmergencia}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBotao}>PEDIR AJUDA</Text>
        )}
      </TouchableOpacity>

      {location && (
        <View style={styles.coordenadas}>
          <Text style={styles.coordText}>📍 Sua Localização:</Text>
          <Text style={styles.coordText}>Latitude: {location.latitude.toFixed(6)}</Text>
          <Text style={styles.coordText}>Longitude: {location.longitude.toFixed(6)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 30,
    justifyContent: "center",
  },
  icone: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#c30000",
    marginBottom: 15,
    textAlign: "center",
  },
  aviso: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 15,
  },
  botaoEmergencia: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#d00000",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  coordenadas: {
    marginTop: 30,
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  coordText: {
    fontSize: 14,
    color: "#333",
  },
});

export default Emergencia;
