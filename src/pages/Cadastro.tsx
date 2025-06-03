import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useState } from "react"
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native"
import { RootStackParamList } from "../types/routes"


type Props = NativeStackScreenProps<RootStackParamList, "Cadastro">

const Cadastro = ({ navigation }: Props) => {
    const [formData, setFormData] = useState({
        nomeCompleto: "",
        email: "",
        password: "",
        confirmPassword: "",
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
        const { nomeCompleto, email, password, confirmPassword, endereco } = formData;

        if (!nomeCompleto || !email || !password || !confirmPassword) {
            Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem.");
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
                    cargo: "ADMIN",
                    endereco,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Erro ao cadastrar usuário");
            }

            Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
            navigation.navigate("Login")
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

            <Text>Email</Text>
            <TextInput
                placeholder="Digite seu e-mail"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <Text>Senha</Text>
            <TextInput
                placeholder="Digite sua senha"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
            />

            <Text>Confirmar Senha</Text>
            <TextInput
                placeholder="Confirme sua senha"
                secureTextEntry
                value={formData.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
            />

            <Text>Logradouro</Text>
            <TextInput
                placeholder="Rua/Avenida"
                value={formData.endereco.logradouro}
                onChangeText={(text) => handleEnderecoChange("logradouro", text)}
            />

            <Text>Bairro</Text>
            <TextInput
                placeholder="Bairro"
                value={formData.endereco.bairro}
                onChangeText={(text) => handleEnderecoChange("bairro", text)}
            />

            <Text>Cidade</Text>
            <TextInput
                placeholder="Cidade"
                value={formData.endereco.cidade}
                onChangeText={(text) => handleEnderecoChange("cidade", text)}
            />

            <Text>Estado</Text>
            <TextInput
                placeholder="Estado"
                value={formData.endereco.estado}
                onChangeText={(text) => handleEnderecoChange("estado", text)}
            />

            <Text>CEP</Text>
            <TextInput
                placeholder="00000-000"
                value={formData.endereco.cep}
                onChangeText={(text) => {
                    // Permite apenas números e o hífen no formato correto
                    const formatted = text.replace(/[^\d-]/g, '');

                    // Pode colocar uma máscara simples para adicionar o hífen automaticamente
                    let masked = formatted;
                    if (formatted.length === 5 && !formatted.includes('-')) {
                        masked = formatted + '-';
                    }
                    if (masked.length > 9) {
                        masked = masked.slice(0, 9);
                    }
                    handleEnderecoChange("cep", masked);
                }}
                keyboardType="default"
            />

            <TouchableOpacity
                style={{
                    marginTop: 20,
                    backgroundColor: "black",
                    padding: 15,
                    borderRadius: 5,
                }}
                onPress={handleSubmit}
            >
                <Text style={{ color: "white", textAlign: "center" }}>Cadastrar</Text>
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
        width: 250,
        height: 50,
        backgroundColor: "#F6F2F2",
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    btn: {
        marginTop: 20,
        width: 215,
        height: 60,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "orange",
    },
    btnText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
    error: {
        color: "red",
        marginBottom: 10,
    },
});
