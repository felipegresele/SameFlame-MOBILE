import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { RootStackParamList } from "../types/routes"
import AsyncStorage from "@react-native-async-storage/async-storage"

export interface FormData {
        username: string,
        email: string,
        password: string,
    }

type Props = NativeStackScreenProps<RootStackParamList, "Login">

function Login( {navigation}: Props ) {
    const [form, setForm] = useState<FormData[]>([])
    const {reset, register, handleSubmit, formState: {errors}, getValues, control } = useForm<FormData>({
        defaultValues: {
            username: "",
            password: "",
            email: "",
        },
    })

        async function handleSignIn(data: FormData) {
        try {
            const usersData = await AsyncStorage.getItem("@usuarios");
            const users = usersData ? JSON.parse(usersData) : [];
        
            const foundUser = users.find(
                (user: FormData) =>
                user.username === data.username && user.password === data.password
            );
        
            if (foundUser) {
                console.log("Login bem-sucedido", foundUser);
                // Armazena usuário logado atual, se quiser
                await AsyncStorage.setItem("@usuario_logado", JSON.stringify(foundUser));
                navigation.navigate("AppDrawer");
            } else {
                Alert.alert("Usuário ou senha inválidos!");
                reset()
            }
        } catch (error) {
            console.error("Erro ao verificar login", error);
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View>
                <Text style={{fontSize: 20}}>Usuário:</Text>
                <Controller 
                    name="username"
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, value} }) => (
                        <TextInput 
                        placeholder="Digite seu usuário:"
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        />
                    )}
                />
                {errors?.username && <Text>{errors.username.message || "Usuário é obrigatório"}</Text>}
                <Text style={{fontSize: 20}}>Senha:</Text>
                <Controller 
                    name="password"
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, value} }) => (
                        <TextInput 
                        placeholder="Digite a senha:"
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        />
                    )}
                />
                {errors?.password && <Text>{errors.password.message || "Senha é obrigatório"} </Text>}
                <Text style={{fontSize: 20}}>Email:</Text>
                <Controller 
                    name="email"
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, value} }) => (
                        <TextInput 
                        placeholder="Digite o email:"
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        />
                    )}
                />
                {errors?.email && <Text>{errors.email.message || "Email é obrigatório"}</Text>}
                <TouchableOpacity onPress={handleSubmit(handleSignIn)} style={styles.btn}>
                    <Text style={styles.btnText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                    <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

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
    color: '#888888',
    textAlign: 'center',
    fontSize: 13,
    marginTop: 10,
  },
})