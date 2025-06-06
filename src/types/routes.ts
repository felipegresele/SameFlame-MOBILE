export type RootStackParamList = {
    BoasVindas: undefined,
    Login: undefined,
    Cadastro: undefined,
    RelatarIncendio: {
    latitude: number;
    longitude: number;
    };
    Alertas: undefined,
    Emergencia: undefined,
    Mapa: {
    newIncendio?: {
      id: string;
      latitude: number;
      longitude: number;
      descricao: string;
      status: string;
      fase: string;
      tipo: string;
    };
  };
    AppDrawer: undefined,
    Historico: undefined,
    Alerta: undefined,
    EditarAlerta: {
    alerta: any;
    onRefresh: () => void;
  };
}