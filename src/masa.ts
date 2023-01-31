import {
  arweave as arweaveInit,
  MasaAccount,
  MasaArgs,
  MasaArweave,
  MasaClient,
  MasaConfig,
  MasaContracts,
  MasaCreditScore,
  MasaGreen,
  MasaIdentity,
  MasaSession,
  MasaSoulName,
  version,
} from "./";

export default class Masa {
  public readonly config: MasaConfig;

  public readonly arweave: MasaArweave;
  public readonly client: MasaClient;

  public readonly contracts: MasaContracts;
  public readonly account: MasaAccount;
  public readonly session: MasaSession;
  public readonly identity: MasaIdentity;
  public readonly soulName: MasaSoulName;
  public readonly creditScore: MasaCreditScore;
  public readonly green: MasaGreen;

  public constructor({
    cookie,
    wallet,
    apiUrl = "https://dev.middleware.masa.finance",
    environment = "dev",
    defaultNetwork = "goerli",
    arweave = {
      host: "arweave.net",
      port: 443,
      protocol: "https",
      logging: false,
    },
  }: MasaArgs) {
    this.client = new MasaClient({
      apiUrl,
      cookie,
    });

    this.arweave = arweaveInit(arweave);

    this.config = {
      apiUrl,
      environment,
      network: defaultNetwork,
      wallet,
    };

    this.contracts = new MasaContracts(this.config);
    this.account = new MasaAccount(this);
    this.session = new MasaSession(this);
    this.identity = new MasaIdentity(this);
    this.soulName = new MasaSoulName(this);
    this.creditScore = new MasaCreditScore(this);
    this.green = new MasaGreen(this);
  }

  metadata = {
    store: (soulName: string, receiver: string, duration: number) =>
      this.client.soulName.store(soulName, receiver, duration),
    retrieve: (url: string, additionalHeaders?: Record<string, string>) =>
      this.client.metadata.get(url, additionalHeaders),
  };

  utils = {
    version,
  };
}
