import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForm, Controller } from "react-hook-form";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../types/routes";

export interface FormData {
  email: string;
  password: string;
}

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

function Login({ navigation }: Props) {
  const {
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignIn(data: FormData) {
    Alert.alert("Debug", `Tentando logar com email: ${data.email}`);
    console.log("Dados do login:", data);
  
    try {
      const response = await fetch("http://10.0.2.2:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
  
      console.log("Resposta status:", response.status);
  
      if (!response.ok) {
        Alert.alert("Erro no login", "Email ou senha inválidos");
        reset();
        return;
      }
  
      const responseData = await response.json();
      console.log("Dados recebidos:", responseData);
  
      const token = responseData.token;
      if (!token) {
        Alert.alert("Erro", "Token não recebido");
        return;
      }
  
      await AsyncStorage.setItem("@token_jwt", token);
      Alert.alert("Sucesso", "Login efetuado!");
      navigation.navigate("AppDrawer");
    } catch (error) {
      console.error("Erro no login", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View>
        <Text style={{ fontSize: 20 }}>Email:</Text>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Digite o email:"
              onChangeText={onChange}
              value={value}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && (
          <Text>{errors.email.message || "Email é obrigatório"}</Text>
        )}

        <Text style={{ fontSize: 20 }}>Senha:</Text>
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Digite a senha:"
              onChangeText={onChange}
              value={value}
              style={styles.input}
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <Text>{errors.password.message || "Senha é obrigatória"}</Text>
        )}

        <TouchableOpacity onPress={handleSubmit(handleSignIn)} style={styles.btn}>
          <Text style={styles.btnText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;

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
  input: {
    width: 250,
    height: 50,
    backgroundColor: "#F6F2F2",
    marginBottom: 20,
    marginTop: 5,
    paddingHorizontal: 10,
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
  link: {
    color: "#888888",
    textAlign: "center",
    fontSize: 13,
    marginTop: 10,
  },
});
