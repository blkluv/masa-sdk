import type { BigNumber } from "ethers";

import { Templates } from "../../collections";
import type { MasaInterface } from "../../interface";
import { signMessage, unpackSessionId } from "../../utils";

export const login = async (
  masa: MasaInterface,
): Promise<
  | {
      address: string;
      userId: BigNumber | string;
      cookie?: string;
    }
  | undefined
> => {
  console.log("Logging in");

  let result;

  if (!(await masa.session.checkLogin())) {
    // get challenge
    const challengeData = await masa.client.session.getChallenge();

    if (challengeData) {
      // sign
      const msg = Templates.loginTemplate(
        challengeData.challenge,
        challengeData.expires,
      );

      const address = await masa.config.signer.getAddress();

      if (masa.config.verbose) {
        console.info(`Signer Address: '${address}'`);
      }

      console.info(`Signing: \n'${msg}'\n`);
      const signature = await signMessage(msg, masa.config.signer);
      console.log(`Signature: '${signature}'`);

      if (signature) {
        const checkSignatureResponse = await masa.client.session.checkSignature(
          address,
          signature,
          challengeData.cookie,
        );

        if (checkSignatureResponse) {
          console.log("\nLogged in as:");
          console.log(`Address: '${address}'`);

          if (masa.config.verbose) {
            console.log(`User ID: '${checkSignatureResponse.userId}'`);
            console.log(
              `Session ID: '${unpackSessionId(challengeData.cookie)}'`,
            );
          }

          result = {
            address,
            userId: checkSignatureResponse.userId,
            cookie: challengeData.cookie,
          };
        }
      } else {
        console.error("Creating signature failed!");
      }
    }
  } else {
    console.error("Already logged in! Please logout before logging in again.");
  }

  return result;
};
