import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Props = NativeStackScreenProps<RootStackParamList, "EditarAlerta">;

export default function EditarAlerta({ route, navigation }: Props) {
  const { alerta, onRefresh } = route.params;

  const [nome, setNome] = useState(alerta.nome);
  const [descricao, setDescricao] = useState(alerta.descricao);

  const [cep, setCep] = useState(alerta.endereco.cep);
  const [logradouro, setLogradouro] = useState(alerta.endereco.logradouro);
  const [bairro, setBairro] = useState(alerta.endereco.bairro);
  const [cidade, setCidade] = useState(alerta.endereco.cidade);
  const [estado, setEstado] = useState(alerta.endereco.estado);

  const validarCampos = () => {
    if (!nome || nome.length < 5 || nome.length > 24) {
      Alert.alert("Erro", "O nome deve ter entre 5 e 24 caracteres.");
      return false;
    }
    if (!descricao || descricao.length < 10 || descricao.length > 150) {
      Alert.alert("Erro", "A descrição deve ter entre 10 e 150 caracteres.");
      return false;
    }
    if (!cep || cep.length !== 9) {
      Alert.alert("Erro", "O CEP deve ter exatamente 9 caracteres (ex: 12345-678).");
      return false;
    }
    if (!logradouro || logradouro.length < 4) {
      Alert.alert("Erro", "O logradouro deve ter no mínimo 4 caracteres.");
      return false;
    }
    if (!bairro || bairro.length < 3) {
      Alert.alert("Erro", "O bairro deve ter no mínimo 3 caracteres.");
      return false;
    }
    if (!cidade || cidade.length < 4) {
      Alert.alert("Erro", "A cidade deve ter no mínimo 4 caracteres.");
      return false;
    }
    if (!estado || estado.length < 6 || estado.length > 32) {
      Alert.alert("Erro", "O estado deve ter entre 6 e 32 caracteres.");
      return false;
    }
    return true;
  };

  const salvarAlteracoes = async () => {
    if (!validarCampos()) return;

    const token = await AsyncStorage.getItem("@token_jwt");
    if (!token) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    try {
      const response = await fetch(`http://10.0.2.2:8080/denuncias/${alerta.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          descricao,
          endereco: {
            cep,
            logradouro,
            bairro,
            cidade,
            estado,
          },
        }),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Alerta atualizado com sucesso!");
        if (onRefresh) onRefresh();
        navigation.goBack();
      } else {
        Alert.alert("Erro", "Falha ao atualizar o alerta.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro de conexão com o servidor.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>CEP</Text>
      <TextInput
        style={styles.input}
        value={cep}
        onChangeText={setCep}
        placeholder="12345-678"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Logradouro</Text>
      <TextInput
        style={styles.input}
        value={logradouro}
        onChangeText={setLogradouro}
      />

      <Text style={styles.label}>Bairro</Text>
      <TextInput style={styles.input} value={bairro} onChangeText={setBairro} />

      <Text style={styles.label}>Cidade</Text>
      <TextInput style={styles.input} value={cidade} onChangeText={setCidade} />

      <Text style={styles.label}>Estado</Text>
      <TextInput style={styles.input} value={estado} onChangeText={setEstado} />

      <View style={styles.buttonContainer}>
        <Button title="Salvar" color="orange" onPress={salvarAlteracoes} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "orange",
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "orange",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
  },
  multiline: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    marginTop: 30,
  },
});
