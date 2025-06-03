import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, Alert, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/routes";

export type Props = NativeStackScreenProps<RootStackParamList, "Historico">

function Historico({ navigation }: Props) {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(false);

  // Função para carregar alertas do servidor
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
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setAlertas(data);
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

  // Função para deletar alerta
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
        carregarAlertas(); // Atualiza lista após deletar
      } else {
        Alert.alert("Erro", "Erro ao deletar alerta.");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro de conexão com o servidor.");
    }
  }

  // Função para confirmar exclusão
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

  // Render item da lista
  function renderItem({ item }) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text>{item.descricao}</Text>
        <Text>{item.endereco.logradouro}, {item.endereco.bairro} - {item.endereco.cidade}/{item.endereco.estado}</Text>
        <Text>CEP: {item.endereco.cep}</Text>

        <View style={styles.buttonsRow}>
          <Button
            title="Atualizar"
            color="#FF8C00"
            onPress={() => navigation.navigate("EditarAlerta", { alerta: item, onRefresh: carregarAlertas })}
          />
          <Button
            title="Deletar"
            color="#FF4500"
            onPress={() => confirmarDelecao(item.id)}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Atualizar Lista" color="#FF6347" onPress={carregarAlertas} />
      {loading ? (
        <ActivityIndicator size="large" color="#FF4500" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={alertas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={<Text style={{ marginTop: 20, textAlign: "center" }}>Nenhum alerta encontrado.</Text>}
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
    backgroundColor: "#330000"  // tema fogo fundo escuro
  },
  itemContainer: {
    backgroundColor: "#660000",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8
  },
  nome: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#FF7F50",
    marginBottom: 5
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  }
});
