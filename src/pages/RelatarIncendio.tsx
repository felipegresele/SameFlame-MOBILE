import { useRoute, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Text, View, TextInput, StyleSheet, Switch, TouchableOpacity, Alert } from "react-native";
import { Status, Tipo, Fase } from "../types/enum";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/routes";
import { Picker } from '@react-native-picker/picker';
import { v4 as uuidv4 } from 'uuid';

interface IncendioFormData {
  descricao: string;
  status: string;
  fase: string;
  precisaResgaste: boolean;
  pessoasAfetadas: number;
  tipo: string;
  dataHora: string;
}

export type Props = NativeStackScreenProps<RootStackParamList, "RelatarIncendio">;

function RelatarIncendio({ navigation }: Props) {
  const route = useRoute();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IncendioFormData>({
    defaultValues: {
      descricao: "",
      status: Status.Moderado,
      fase: Fase.NaoIniciado,
      precisaResgaste: false,
      pessoasAfetadas: 0,
      tipo: Tipo.Urbano,
      dataHora: new Date().toISOString(),
    },
  });

  // Pega coordenadas enviadas via navegação
  const params = route.params as { latitude?: number; longitude?: number } | undefined;

  useEffect(() => {
    // Se não veio latitude ou longitude, alerta e volta para o mapa
    if (!params?.latitude || !params?.longitude) {
      Alert.alert(
        "Localização não selecionada",
        "Por favor, volte ao mapa e selecione o local ou próximo do incêndio.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Mapa"),
          },
        ],
        { cancelable: false }
      );
    }
  }, [params, navigation]);

  // Se não tem coords, não renderiza formulário para evitar crash
  if (!params?.latitude || !params?.longitude) {
    return null;
  }

  const onSubmit = (data: IncendioFormData) => {
    const newIncendio = {
      id: uuidv4(),
      latitude: params.latitude,
      longitude: params.longitude,
      descricao: data.descricao,
      status: data.status,
      fase: data.fase,
      tipo: data.tipo,
      precisaResgaste: data.precisaResgaste,
      pessoasAfetadas: data.pessoasAfetadas,
      dataHora: data.dataHora,
    };

    Alert.alert(
      "Incêndio relatado com sucesso!",
      "Em breve aparecerá no mapa e a equipe de resgate já foi comunicada.",
      [
        {
          text: "OK",
          onPress: () => {
            reset(); // Reseta os campos do formulário
            navigation.navigate("Mapa", { newIncendio }); // Navega para o mapa com os dados
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição:</Text>
      <Controller
        name="descricao"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Digite a descrição"
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      {errors.descricao && <Text style={styles.error}>Descrição é obrigatória</Text>}

      <Text style={styles.label}>Status:</Text>
      <Controller
        name="status"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
            {Object.values(Status).map((val) => (
              <Picker.Item key={val} label={val} value={val} />
            ))}
          </Picker>
        )}
      />

      <Text style={styles.label}>Fase:</Text>
      <Controller
        name="fase"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
            {Object.values(Fase).map((val) => (
              <Picker.Item key={val} label={val} value={val} />
            ))}
          </Picker>
        )}
      />

      <Text style={styles.label}>Tipo:</Text>
      <Controller
        name="tipo"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
            {Object.values(Tipo).map((val) => (
              <Picker.Item key={val} label={val} value={val} />
            ))}
          </Picker>
        )}
      />

      <Text style={styles.label}>Precisa de resgate:</Text>
      <Controller
        name="precisaResgaste"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Switch value={value} onValueChange={onChange} />
        )}
      />

      <Text style={styles.label}>Pessoas afetadas:</Text>
      <Controller
        name="pessoasAfetadas"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            keyboardType="numeric"
            onChangeText={(text) => onChange(Number(text) || 0)}
            value={value?.toString() || "0"}
            style={styles.input}
          />
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Relatar Incêndio</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RelatarIncendio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontWeight: "bold",
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
  },
  picker: {
    marginTop: 4,
  },
  button: {
    backgroundColor: "#FF6B00",
    padding: 16,
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  error: {
    color: "red",
  },
});
