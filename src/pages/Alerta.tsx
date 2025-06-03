import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Alerta() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");

  function formatarCep(text) {
    const numeros = text.replace(/\D/g, "");
    const numerosLimitados = numeros.slice(0, 8);
    if (numerosLimitados.length > 5) {
      return numerosLimitados.slice(0, 5) + "-" + numerosLimitados.slice(5);
    } else {
      return numerosLimitados;
    }
  }

  async function enviarDenuncia() {
    const token = await AsyncStorage.getItem("@token_jwt");

    if (!token) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    if (!/^\d{5}-\d{3}$/.test(cep)) {
      Alert.alert("Erro", "CEP inválido. Use o formato 00000-000.");
      return;
    }

    const denuncia = {
      nome,
      descricao,
      endereco: {
        logradouro,
        bairro,
        cidade,
        estado,
        cep
      }
    };

    try {
      const response = await fetch("http://10.0.2.2:8080/denuncias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(denuncia)
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Denúncia enviada!");
        setNome("");
        setDescricao("");
        setLogradouro("");
        setBairro("");
        setCidade("");
        setEstado("");
        setCep("");
      } else {
        const error = await response.json();
        console.log("Erro do servidor:", error);
        Alert.alert("Erro", "Erro ao enviar denúncia.");
      }
    } catch (err) {
      console.error("Erro ao conectar com servidor", err);
      Alert.alert("Erro", "Erro de conexão com o servidor.");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite seu nome"
        placeholderTextColor="#000"
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descreva a denúncia"
        placeholderTextColor="#000"
      />

      <Text style={styles.label}>Logradouro</Text>
      <TextInput
        style={styles.input}
        value={logradouro}
        onChangeText={setLogradouro}
        placeholder="Digite o logradouro"
        placeholderTextColor="#000"
      />

      <Text style={styles.label}>Bairro</Text>
      <TextInput
        style={styles.input}
        value={bairro}
        onChangeText={setBairro}
        placeholder="Digite o bairro"
        placeholderTextColor="#000"
      />

      <Text style={styles.label}>Cidade</Text>
      <TextInput
        style={styles.input}
        value={cidade}
        onChangeText={setCidade}
        placeholder="Digite a cidade"
        placeholderTextColor="#000"
      />

      <Text style={styles.label}>Estado</Text>
      <TextInput
        style={styles.input}
        value={estado}
        onChangeText={setEstado}
        placeholder="Digite o estado"
        placeholderTextColor="#000"
      />

      <Text style={styles.label}>CEP</Text>
      <TextInput
        style={styles.input}
        value={cep}
        onChangeText={(text) => setCep(formatarCep(text))}
        placeholder="00000-000"
        keyboardType="numeric"
        maxLength={9}
        placeholderTextColor="#000"
      />

      <View style={styles.buttonContainer}>
        <Button color="orange" title="Enviar denúncia" onPress={enviarDenuncia} />
      </View>
    </ScrollView>
  );
}

export default Alerta;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    color: "orange",
  },
  input: {
    borderWidth: 1,
    borderColor: "orange",
    padding: 10,
    marginTop: 5,
    borderRadius: 6,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 6,
    overflow: "hidden",
  },
  btn: {
    width: 200,
    height:60,
    borderRadius: 20,
    fontWeight: "bold",
  }
});
