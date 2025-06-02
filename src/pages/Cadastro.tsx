import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Controller, useForm } from "react-hook-form"
import { Alert, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native"
import { RootStackParamList } from "../types/routes"
import AsyncStorage from "@react-native-async-storage/async-storage"

export interface FormData {
    username: string,
    password: string,
    confirmPassword: string,
    email: string,
}

type Props = NativeStackScreenProps<RootStackParamList, "Cadastro">

function Cadastro({ navigation }: Props) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm<FormData>({
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
        },
    });

    const password = watch("password");

    async function HandleSign(data: FormData) {
        try {
            const usersData = await AsyncStorage.getItem("@usuarios");
            const users = usersData ? JSON.parse(usersData) : [];
            
            const userExists = users.find((user: FormData) => user.username === data.username)

            if (userExists) {
                Alert.alert("Usuário já existe!")
                return;
            }

            users.push(data);
            await AsyncStorage.setItem("@usuarios", JSON.stringify(users))
            Alert.alert("Usuário cadastrado!")
            //Navegar para pagína de Login
            navigation.navigate("Login")
        } catch (error) {
            Alert.alert("Erro ao salvar os dados")
            console.error("Erro ao salvar os dados:", error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <View>
                <Text style={styles.label}>Usuário:</Text>
                <Controller
                    name="username"
                    control={control}
                    rules={{ required: "Usuário é obrigatório" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            placeholder="Digite seu usuário"
                            style={styles.input}
                        />
                    )}
                />
                {errors?.username && <Text style={styles.error}>{errors.username.message}</Text>}

                <Text style={styles.label}>Email:</Text>
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: "Email é obrigatório",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Email inválido",
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            placeholder="Digite seu email"
                            keyboardType="email-address"
                            style={styles.input}
                        />
                    )}
                />
                    
                {errors?.email && <Text style={styles.error}>{errors.email.message}</Text>}

                <Text style={styles.label}>Senha:</Text>
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: "Senha é obrigatória",
                        maxLength: {
                            value: 15,
                            message: "A senha não pode ter mais de 15 caracteres",
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            placeholder="Digite sua senha"
                            secureTextEntry
                            style={styles.input}
                        />
                    )}
                />
                {errors?.password && <Text style={styles.error}>{errors.password.message}</Text>}

                <Text style={styles.label}>Confirmar Senha:</Text>
                <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                        required: "Confirmação de senha é obrigatória",
                        validate: (value) =>
                            value === password || "As senhas não coincidem",
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            placeholder="Confirme sua senha"
                            secureTextEntry
                            keyboardType="visible-password"
                            style={styles.input}
                        />
                    )}
                />
                {errors?.confirmPassword && (
                    <Text style={styles.error}>{errors.confirmPassword.message}</Text>
                )}

                <TouchableOpacity onPress={handleSubmit(HandleSign)} style={styles.btn}>
                    <Text style={styles.btnText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Cadastro

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
