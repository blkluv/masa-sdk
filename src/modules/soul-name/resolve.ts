import type { MasaInterface } from "../../interface";

/**
 *
 * @param masa
 * @param soulName
 */
export const resolveSoulName = async (
  masa: MasaInterface,
  soulName: string,
): Promise<string | undefined> => {
  let owner;

  try {
    const extension =
      await masa.contracts.instances.SoulNameContract.extension();
    const cleansedSoulname = soulName.replace(extension, "");
    const tokenId = await masa.contracts.instances.SoulNameContract.getTokenId(
      cleansedSoulname,
    );
    owner = masa.contracts.instances.SoulNameContract.ownerOf(tokenId);
  } catch (error) {
    if (error instanceof Error && masa.config.verbose) {
      console.error(error.message);
    }
  }

  return owner;
};
