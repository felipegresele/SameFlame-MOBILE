import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/routes";
import {
  Alert,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import * as Location from "expo-location";
import { getAbrigos, getAlertas, getIncendios } from "../types/mockData";

type Props = NativeStackScreenProps<RootStackParamList, "Mapa">;

interface Incendio {
  id: string;
  latitude: number;
  longitude: number;
  descricao: string;
  status: string;
  fase: string;
  tipo: string;
}

function Mapa({ navigation }: Props) {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [incendios, setIncendios] = useState<Incendio[]>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão negada para acessar a localização");
        Alert.alert("Permissão negada", "Ative a localização para usar o app");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setLocation(loc.coords);
    })();
  }, []);

  const abrigos = getAbrigos(location?.latitude ?? 0, location?.longitude ?? 0);
  const alertas = getAlertas(location?.latitude ?? 0, location?.longitude ?? 0);

  useEffect(() => {
    if (location) {
      const mockIncendios = getIncendios(location.latitude, location.longitude);
      setIncendios(mockIncendios);
    }
  }, [location]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const params = navigation.getState().routes.find(r => r.name === "Mapa")?.params as any;
      if (params?.newIncendio) {
        const newInc = params.newIncendio as Incendio;
        setIncendios((old) => {
          if (old.some(i => i.id === newInc.id)) return old;
          return [...old, newInc];
        });
        navigation.setParams({ newIncendio: undefined });
      }
    });

    return unsubscribe;
  }, [navigation]);

  if (!location) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6B00" />
        <Text>Carregando mapa...</Text>
      </View>
    );
  }

  const usarRegiao = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  function handleMapPress(event: MapPressEvent) {
    setSelectedLocation(event.nativeEvent.coordinate);
  }

  function handleAddIncendio() {
    if (!selectedLocation) {
      Alert.alert("Selecione um local no mapa antes de adicionar um incêndio.");
      return;
    }

    navigation.navigate("RelatarIncendio", {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.button} onPress={handleAddIncendio}>
          <Text style={styles.buttonText}>Adicionar Incêndio +</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.dashboardButton]}
          onPress={() => navigation.navigate("Alerta")}
        >
          <Text style={styles.buttonText}>Alerta +</Text>
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        region={usarRegiao}
        showsUserLocation={true}
        onPress={handleMapPress}
      >
        {abrigos.map((abrigo) => (
          <Marker
            key={abrigo.id}
            coordinate={{ latitude: abrigo.latitude, longitude: abrigo.longitude }}
            title={abrigo.nome}
            description={`Abrigo disponível - Capacidade: ${abrigo.capacidade}`}
            pinColor="green"
          />
        ))}

        {alertas.map((alerta) => (
          <Marker
            key={alerta.id}
            coordinate={{ latitude: alerta.latitude, longitude: alerta.longitude }}
            title="Alerta de incêndio"
            description={alerta.descricao}
            pinColor="red"
          />
        ))}

        {incendios.map((incendio) => (
          <Marker
            key={incendio.id}
            coordinate={{ latitude: incendio.latitude, longitude: incendio.longitude }}
            title={`Incêndio: ${incendio.tipo}`}
            description={`Status: ${incendio.status} - Fase: ${incendio.fase} - ${incendio.descricao}`}
            pinColor="#FF6B00"
          />
        ))}

        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Local selecionado"
            pinColor="blue"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  topButtons: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  button: {
    backgroundColor: "#FF6B00",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dashboardButton: {
    backgroundColor: "#0066CC",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default Mapa
