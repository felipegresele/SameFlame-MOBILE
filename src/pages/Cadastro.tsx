import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RootStackParamList } from "../types/routes";

type Props = NativeStackScreenProps<RootStackParamList, "Cadastro">;

const Cadastro = ({ navigation }: Props) => {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    password: "",
    cargo: "ADMIN",
    endereco: {
      logradouro: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    },
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEnderecoChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      endereco: { ...prev.endereco, [field]: value },
    }));
  };

  const handleSubmit = async () => {
    const { nomeCompleto, email, password, cargo, endereco } = formData;

    if (!nomeCompleto || !email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const response = await fetch("http://10.0.2.2:8080/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomeCompleto,
          email,
          password,
          cargo,
          endereco,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro ao cadastrar usuário");
      }

      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erro", error.message);
      } else {
        Alert.alert("Erro", "Erro desconhecido");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome completo"
        value={formData.nomeCompleto}
        onChangeText={(text) => handleChange("nomeCompleto", text)}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
      />

      <Text style={styles.label}>Logradouro</Text>
      <TextInput
        style={styles.input}
        placeholder="Rua/Avenida"
        value={formData.endereco.logradouro}
        onChangeText={(text) => handleEnderecoChange("logradouro", text)}
      />

      <Text style={styles.label}>Bairro</Text>
      <TextInput
        style={styles.input}
        placeholder="Bairro"
        value={formData.endereco.bairro}
        onChangeText={(text) => handleEnderecoChange("bairro", text)}
      />

      <Text style={styles.label}>Cidade</Text>
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={formData.endereco.cidade}
        onChangeText={(text) => handleEnderecoChange("cidade", text)}
      />

      <Text style={styles.label}>Estado</Text>
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={formData.endereco.estado}
        onChangeText={(text) => handleEnderecoChange("estado", text)}
      />

      <Text style={styles.label}>CEP</Text>
      <TextInput
        style={styles.input}
        placeholder="00000-000"
        value={formData.endereco.cep}
        onChangeText={(text) => {
          const formatted = text.replace(/[^\d-]/g, "");
          let masked = formatted;
          if (formatted.length === 5 && !formatted.includes("-")) {
            masked = formatted + "-";
          }
          if (masked.length > 9) {
            masked = masked.slice(0, 9);
          }
          handleEnderecoChange("cep", masked);
        }}
        keyboardType="default"
      />

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Cadastro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 30,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F6F2F2",
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  btn: {
    marginTop: 20,
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 5,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
