import { useRoute, useNavigation } from "@react-navigation/native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Text, View, TextInput, StyleSheet, Switch, TouchableOpacity, Alert } from "react-native";
import { Status, Tipo, Fase } from "../types/enum";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/routes";
import { Picker } from '@react-native-picker/picker';
import { v4 as uuidv4 } from 'uuid'; // pra gerar id único, se não tiver instale com npm install uuid

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
    reset,
    setValue,
    handleSubmit,
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
  const { latitude, longitude } = route.params as { latitude: number; longitude: number };

  const onSubmit = (data: any) => {
    const newIncendio = {
      id: uuidv4(),
      latitude,
      longitude,
      descricao: data.descricao,
      status: data.status,
      fase: data.fase,
      tipo: data.tipo,
    };

    // Passa de volta para a tela do mapa
    navigation.navigate("Mapa", { newIncendio });

    Alert.alert("Incêndio relatado com sucesso!", `Descrição: ${data.descricao}`);
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
            onChangeText={(text) => onChange(Number(text))}
            value={value?.toString()}
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
    borderWidth: 1,
    borderColor: "#ccc",
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
