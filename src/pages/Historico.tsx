import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/routes";

export type Props = NativeStackScreenProps<RootStackParamList, "Historico">;

function Historico({ navigation }: Props) {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(false);

  async function carregarAlertas() {
    setLoading(true);
    const token = await AsyncStorage.getItem("@token_jwt");
    if (!token) {
      Alert.alert("Erro", "Usuário não autenticado.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://10.0.2.2:8080/denuncias", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setAlertas(data.content);
      } else {
        Alert.alert("Erro", "Falha ao carregar alertas.");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro de conexão com o servidor.");
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    carregarAlertas();
  }, []);

  async function deletarAlerta(id) {
    const token = await AsyncStorage.getItem("@token_jwt");
    if (!token) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    try {
      const response = await fetch(`http://10.0.2.2:8080/denuncias/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Alerta deletado!");
        carregarAlertas();
      } else {
        Alert.alert("Erro", "Erro ao deletar alerta.");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro de conexão com o servidor.");
    }
  }

  function confirmarDelecao(id) {
    Alert.alert(
      "Confirmar",
      "Deseja realmente deletar este alerta?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Deletar", style: "destructive", onPress: () => deletarAlerta(id) }
      ]
    );
  }

  function renderItem({ item }) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text>{item.descricao}</Text>
        <Text>
          {item.endereco.logradouro}, {item.endereco.bairro} - {item.endereco.cidade}/{item.endereco.estado}
        </Text>
        <Text>CEP: {item.endereco.cep}</Text>

        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("EditarAlerta", { alerta: item, onRefresh: carregarAlertas })
            }
          >
            <Text style={styles.buttonText}>Atualizar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#ff6347" }]}
            onPress={() => confirmarDelecao(item.id)}
          >
            <Text style={styles.buttonText}>Deletar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.updateButton} onPress={carregarAlertas}>
        <Text style={styles.updateButtonText}>Atualizar Lista</Text>
      </TouchableOpacity>
            <TouchableOpacity style={styles.updateButton} onPress={() => navigation.navigate("Alerta")}>
        <Text style={styles.updateButtonText}>Adicionar Novo Alerta</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="orange" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={alertas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={{ marginTop: 20, textAlign: "center", color: "gray" }}>
              Nenhum alerta encontrado.
            </Text>
          }
        />
      )}
    </View>
  );
}

export default Historico;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "white"
  },
  itemContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "orange"
  },
  nome: {
    fontWeight: "bold",
    fontSize: 16,
    color: "orange",
    marginBottom: 5
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  },
  updateButton: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center"
  },
  updateButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  }
});
