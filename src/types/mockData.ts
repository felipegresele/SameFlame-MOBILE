import {Fase, Status, Tipo} from "../types/enum"

export const getAbrigos = (latitude: number, longitude: number) => [
    {
      id: "abrigo1",
      nome: "Abrigo Escola A",
      capacidade: 50,
      latitude: latitude + 0.01,
      longitude: longitude - 0.01,
    },
    {
      id: "abrigo2",
      nome: "Centro Comunitário",
      capacidade: 100,
      latitude: latitude - 0.015,
      longitude: longitude + 0.012,
    },
    {
      id: "abrigo3",
      nome: "Igreja São João",
      capacidade: 30,
      latitude: latitude - 0.07,
      longitude: longitude + 0.05,
    },
    {
      id: "abrigo4",
      nome: "Clube Recreativo",
      capacidade: 40,
      latitude: latitude - 0.02,
      longitude: longitude + 0.03,
    },
  ];
  
  export const getAlertas = (latitude: number, longitude: number) => [
    {
      id: "alerta1",
      descricao: "Foco de incêndio na mata",
      latitude: latitude + 0.012,
      longitude: longitude + 0.004,
    },
    {
      id: "alerta2",
      descricao: "Forte fumaça em um edifício",
      latitude: latitude + 0.07,
      longitude: latitude + 0.04,
    },
  ];
  
  export const getIncendios = (latitude: number, longitude: number) => [
    {
    descricao: "Incêndio em edifício",
    status: Status.Forte,
    fase: Fase.EmAndamento,
    precisaResgaste: true,
    pessoasAfetadas: 3,
    tipo: Tipo.Urbano,
    dataHora: new Date().toISOString(),
    latitude: latitude + 0.005,
    longitude: longitude - 0.006
  },
  {
    descricao: "Fogo em área de vegetação",
    status: Status.Moderado,
    fase: Fase.SobControle,
    precisaResgaste: false,
    pessoasAfetadas: 0,
    tipo: Tipo.Florestal,
    dataHora: new Date().toISOString(),
    latitude: latitude - 0.008,
    longitude: longitude + 0.004
  },
  {
    descricao: "Explosão em galpão industrial",
    status: Status.Critico,
    fase: Fase.NaoIniciado,
    precisaResgaste: true,
    pessoasAfetadas: 12,
    tipo: Tipo.Industrial,
    dataHora: new Date().toISOString(),
    latitude: latitude + 0.01,
    longitude: longitude + 0.005
  },
  {
    descricao: "Incêndio em residência",
    status: Status.Leve,
    fase: Fase.Extinto,
    precisaResgaste: false,
    pessoasAfetadas: 1,
    tipo: Tipo.Residencial,
    dataHora: new Date().toISOString(),
    latitude: latitude - 0.006,
    longitude: longitude - 0.005
  }
  ];
  