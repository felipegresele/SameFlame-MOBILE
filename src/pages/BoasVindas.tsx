
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { RootStackParamList } from '../types/routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, "BoasVindas">;

function BoasVindas( {navigation}:Props ) {

    return (
        <View style={styles.container}>
            <Image source={require("../../assets/safeflame.png")} resizeMode="contain" style={styles.image}/>
            <View style={styles.textContent}>
                <Text style={styles.text}>Sua <Text style={{color: "orange"}}>proteção</Text> contra incêndios.</Text>
            </View>
            <View style={styles.btnContent}>
                <TouchableOpacity style={[styles.btn, {backgroundColor: "orange"}]} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, {backgroundColor: "black"}]} onPress={() => navigation.navigate("Cadastro")}>
                    <Text style={styles.btnText}>Cadastrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, {backgroundColor: "red", marginTop: 25 }]} onPress={() => navigation.navigate("Mapa")}>
                    <Text style={styles.btnText}>Emergencia(SOS)</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

export default BoasVindas

const styles = StyleSheet.create({
    container: {
        
    },
    image: {
        width: 400,
    },
    textContent: {
        marginBottom: 30,
        alignItems: "center",
    },
    text: {
        fontSize: 30,
        textAlign: "center",
    },
    btnContent: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 15,
        padding: 5,
    },
    btn: {
        width: 215,
        height: 60,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    }
})