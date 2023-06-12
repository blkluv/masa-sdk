import type { LogDescription } from "@ethersproject/abi";
import type { Log } from "@ethersproject/abstract-provider";
import type {
  MasaSBT,
  ReferenceSBTAuthority,
  ReferenceSBTSelfSovereign,
} from "@masa-finance/masa-contracts-identity";
import type { BaseContract } from "ethers";

import { MasaBase } from "../base";
import type { IIdentityContracts, MasaInterface } from "../interface";
import { loadIdentityContracts } from "./load-Identity-contracts";
import {
  ASBTContract,
  CreditScore,
  Green,
  Identity,
  SBTContract,
  SoulLinker,
  SoulName,
  SSSBTContract,
} from "./modules";

export class MasaContracts extends MasaBase {
  /**
   * direct contract access
   */
  public instances: IIdentityContracts;
  /**
   * SBTs
   */
  public sbt: SBTContract<MasaSBT>;
  public sssbt: SSSBTContract<ReferenceSBTSelfSovereign>;
  public asbt: ASBTContract<ReferenceSBTAuthority>;
  /**
   * Soul Linker
   */
  public soulLinker: SoulLinker;
  /**
   * Soul Name
   */
  public soulName: SoulName;
  /**
   * Credit Score
   */
  public creditScore: CreditScore;
  /**
   * Green
   */
  public green: Green;
  /**
   * Identity
   */
  public identity: Identity;

  public constructor(
    masa: MasaInterface,
    contractOverrides?: Partial<IIdentityContracts>
  ) {
    super(masa);

    this.instances = {
      ...loadIdentityContracts({
        provider: this.masa.config.signer.provider,
        networkName: this.masa.config.networkName,
      }),
      ...contractOverrides,
    };

    /**
     * SBTS
     */
    this.sbt = new SBTContract(this.masa, this.instances);
    this.sssbt = new SSSBTContract(this.masa, this.instances);
    this.asbt = new ASBTContract(this.masa, this.instances);
    /**
     * Soul Linker
     */
    this.soulLinker = new SoulLinker(this.masa, this.instances);
    /**
     * Soul Name
     */
    this.soulName = new SoulName(this.masa, this.instances);
    /**
     * Identity
     */
    this.identity = new Identity(this.masa, this.instances);
    /**
     * Credit Score
     */
    this.creditScore = new CreditScore(this.masa, this.instances);
    /**
     * Greens
     */
    this.green = new Green(this.masa, this.instances);
  }

  /**
   *
   * @param logs
   * @param additionalContracts
   */
  public parseLogs = (
    logs: Log[],
    additionalContracts: BaseContract[] = []
  ): LogDescription[] => {
    const parsedLogs: LogDescription[] = [];

    for (const contract of [
      ...Object.values(this.instances),
      ...additionalContracts,
    ]) {
      parsedLogs.push(
        ...logs
          .filter(
            (log: Log) =>
              log.address.toLowerCase() === contract.address.toLowerCase()
          )
          .map((log: Log) => {
            let result;

            try {
              result = contract.interface.parseLog(log);
            } catch (error) {
              if (error instanceof Error) {
                console.warn(error.message);
              }
            }

            return result;
          })
      );
    }

    return parsedLogs;
  };
}
