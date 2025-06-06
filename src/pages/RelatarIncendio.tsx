import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/routes";
import { Picker } from "@react-native-picker/picker";
import {Tipo, Status, Fase} from "../types/enum"

type Props = NativeStackScreenProps<RootStackParamList, "RelatarIncendio">;

function RelatarIncendio({ route, navigation }: Props) {
  const { latitude, longitude } = route.params;

  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState<Tipo | "">("");
  const [fase, setFase] = useState<Fase | "">("");
  const [status, setStatus] = useState<Status | "">("");

  function handleEnviar() {
    if (!descricao || !tipo || !fase || !status) {
      Alert.alert("Preencha todos os campos!");
      return;
    }

    const novoIncendio = {
      id: Date.now().toString(),
      latitude,
      longitude,
      descricao,
      status,
      fase,
      tipo,
    };

    navigation.navigate("Mapa", {
      newIncendio: novoIncendio,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatar Incêndio</Text>

      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
      />

      <Picker
        selectedValue={tipo}
        onValueChange={(itemValue) => setTipo(itemValue as Tipo)}
        style={styles.input}
      >
        <Picker.Item label="Selecione o Tipo" value="" />
        {Object.values(Tipo).map((t) => (
          <Picker.Item key={t} label={t} value={t} />
        ))}
      </Picker>

      <Picker
        selectedValue={fase}
        onValueChange={(itemValue) => setFase(itemValue as Fase)}
        style={styles.input}
      >
        <Picker.Item label="Selecione a Fase" value="" />
        {Object.values(Fase).map((f) => (
          <Picker.Item key={f} label={f} value={f} />
        ))}
      </Picker>

      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue as Status)}
        style={styles.input}
      >
        <Picker.Item label="Selecione o Status" value="" />
        {Object.values(Status).map((s) => (
          <Picker.Item key={s} label={s} value={s} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleEnviar}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 10,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "#FF6B00",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RelatarIncendio;
