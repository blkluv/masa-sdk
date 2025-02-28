import type { TypedDataSigner } from "@ethersproject/abstract-signer";
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  Signer,
  TypedDataDomain,
  TypedDataField,
} from "ethers";
import { utils } from "ethers";

/**
 *
 * @param data
 */
const hashData = (data: BytesLike) => utils.keccak256(data);

/**
 *
 * @param msg
 * @param wallet
 * @param doHash
 */
export const signMessage = async (
  msg: string,
  wallet: Signer,
  doHash: boolean = false,
): Promise<string | undefined> => {
  let signature;

  try {
    const data = utils.toUtf8Bytes(msg);
    const hash = doHash ? hashData(data) : data;
    signature = await wallet.signMessage(utils.arrayify(hash));
  } catch (error) {
    console.error("Sign message failed!", error);
  }

  return signature;
};

/**
 *
 * @param wallet
 * @param name
 * @param verifyingContract
 * @param version
 */
export const generateSignatureDomain = async (
  wallet: Signer,
  name: string,
  verifyingContract: string,
  version: string = "1.0.0",
): Promise<TypedDataDomain> => {
  const chainId = (await wallet.provider?.getNetwork())?.chainId;

  const domain: TypedDataDomain = {
    name,
    version,
    chainId,
    verifyingContract,
  };

  return domain;
};

/**
 *
 * @param contract
 * @param wallet
 * @param name
 * @param types
 * @param value
 */
export const signTypedData = async (
  contract: BaseContract,
  wallet: Signer,
  name: string,
  types: Record<string, Array<TypedDataField>>,
  value: Record<string, string | BigNumber | number>,
): Promise<{ signature: string; domain: TypedDataDomain }> => {
  const domain = await generateSignatureDomain(wallet, name, contract.address);
  const signature = await (wallet as Signer & TypedDataSigner)._signTypedData(
    domain,
    types,
    value,
  );

  return { signature, domain };
};

/**
 *
 * @param msg
 * @param signature
 * @param doHash
 */
export const recoverAddress = (
  msg: string,
  signature: string,
  doHash: boolean = false,
): string | undefined => {
  let recovered;

  try {
    const data = utils.toUtf8Bytes(msg);
    const hash = doHash ? hashData(data) : data;
    recovered = utils.recoverAddress(
      utils.arrayify(utils.hashMessage(utils.arrayify(hash))),
      signature,
    );
  } catch (err) {
    console.error("Address recovery failed!", err);
  }

  return recovered;
};
