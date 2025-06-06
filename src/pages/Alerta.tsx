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
import AsyncStorage from "@react-native-async-storage/async-storage";

function Alerta() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");

  const [erros, setErros] = useState({
    nome: "",
    descricao: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
  });

  function formatarCep(text) {
    const numeros = text.replace(/\D/g, "");
    const numerosLimitados = numeros.slice(0, 8);
    if (numerosLimitados.length > 5) {
      return numerosLimitados.slice(0, 5) + "-" + numerosLimitados.slice(5);
    } else {
      return numerosLimitados;
    }
  }

  function validarCampos() {
    const novosErros: any = {};

    if (!nome || nome.trim().length < 5 || nome.trim().length > 24) {
      novosErros.nome = "O nome deve ter entre 5 e 24 caracteres.";
    }

    if (
      !descricao ||
      descricao.trim().length < 10 ||
      descricao.trim().length > 150
    ) {
      novosErros.descricao = "A descrição deve ter entre 10 e 150 caracteres.";
    }

    if (!logradouro.trim()) novosErros.logradouro = "O logradouro é obrigatório.";
    if (!bairro.trim()) novosErros.bairro = "O bairro é obrigatório.";
    if (!cidade.trim()) novosErros.cidade = "A cidade é obrigatória.";
    if (!estado.trim()) novosErros.estado = "O estado é obrigatório.";

    if (!/^\d{5}-\d{3}$/.test(cep)) {
      novosErros.cep = "CEP inválido. Use o formato 00000-000.";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function enviarDenuncia() {
    const token = await AsyncStorage.getItem("@token_jwt");

    if (!token) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    if (!validarCampos()) {
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
        cep,
      },
    };

    try {
      const response = await fetch("http://10.0.2.2:8080/denuncias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(denuncia),
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
        setErros({});
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
        onChangeText={(text) => {
          setNome(text);
          setErros((prev) => ({ ...prev, nome: "" }));
        }}
        placeholder="Digite seu nome"
        placeholderTextColor="#000"
      />
      {erros.nome ? <Text style={styles.erro}>{erros.nome}</Text> : null}

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        value={descricao}
        onChangeText={(text) => {
          setDescricao(text);
          setErros((prev) => ({ ...prev, descricao: "" }));
        }}
        placeholder="Descreva a denúncia"
        placeholderTextColor="#000"
      />
      {erros.descricao ? (
        <Text style={styles.erro}>{erros.descricao}</Text>
      ) : null}

      <Text style={styles.label}>Logradouro</Text>
      <TextInput
        style={styles.input}
        value={logradouro}
        onChangeText={(text) => {
          setLogradouro(text);
          setErros((prev) => ({ ...prev, logradouro: "" }));
        }}
        placeholder="Digite o logradouro"
        placeholderTextColor="#000"
      />
      {erros.logradouro ? (
        <Text style={styles.erro}>{erros.logradouro}</Text>
      ) : null}

      <Text style={styles.label}>Bairro</Text>
      <TextInput
        style={styles.input}
        value={bairro}
        onChangeText={(text) => {
          setBairro(text);
          setErros((prev) => ({ ...prev, bairro: "" }));
        }}
        placeholder="Digite o bairro"
        placeholderTextColor="#000"
      />
      {erros.bairro ? <Text style={styles.erro}>{erros.bairro}</Text> : null}

      <Text style={styles.label}>Cidade</Text>
      <TextInput
        style={styles.input}
        value={cidade}
        onChangeText={(text) => {
          setCidade(text);
          setErros((prev) => ({ ...prev, cidade: "" }));
        }}
        placeholder="Digite a cidade"
        placeholderTextColor="#000"
      />
      {erros.cidade ? <Text style={styles.erro}>{erros.cidade}</Text> : null}

      <Text style={styles.label}>Estado</Text>
      <TextInput
        style={styles.input}
        value={estado}
        onChangeText={(text) => {
          setEstado(text);
          setErros((prev) => ({ ...prev, estado: "" }));
        }}
        placeholder="Digite o estado"
        placeholderTextColor="#000"
      />
      {erros.estado ? <Text style={styles.erro}>{erros.estado}</Text> : null}

      <Text style={styles.label}>CEP</Text>
      <TextInput
        style={styles.input}
        value={cep}
        onChangeText={(text) => {
          setCep(formatarCep(text));
          setErros((prev) => ({ ...prev, cep: "" }));
        }}
        placeholder="00000-000"
        keyboardType="numeric"
        maxLength={9}
        placeholderTextColor="#000"
      />
      {erros.cep ? <Text style={styles.erro}>{erros.cep}</Text> : null}

      <View style={styles.buttonContainer}>
        <Button
          color="orange"
          title="Enviar denúncia"
          onPress={enviarDenuncia}
        />
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
  erro: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 6,
    overflow: "hidden",
  },
});
