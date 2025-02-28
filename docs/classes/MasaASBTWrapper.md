[# Masa SDK
 - v3.5.1](../README.md) / [Exports](../modules.md) / MasaASBTWrapper

# Class: MasaASBTWrapper<Contract\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Contract` | extends `ReferenceSBTAuthority` |

## Hierarchy

- [`MasaSBTWrapper`](MasaSBTWrapper.md)<`Contract`\>

  ↳ **`MasaASBTWrapper`**

## Table of contents

### Constructors

- [constructor](MasaASBTWrapper.md#constructor)

### Properties

- [contract](MasaASBTWrapper.md#contract)
- [links](MasaASBTWrapper.md#links)
- [masa](MasaASBTWrapper.md#masa)

### Methods

- [bulkMint](MasaASBTWrapper.md#bulkmint)
- [burn](MasaASBTWrapper.md#burn)
- [list](MasaASBTWrapper.md#list)
- [loadSBTIDs](MasaASBTWrapper.md#loadsbtids)
- [loadSBTs](MasaASBTWrapper.md#loadsbts)
- [mint](MasaASBTWrapper.md#mint)

## Constructors

### constructor

• **new MasaASBTWrapper**<`Contract`\>(`masa`, `contract`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Contract` | extends `ReferenceSBTAuthority`<`Contract`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `masa` | [`MasaInterface`](../interfaces/MasaInterface.md) |
| `contract` | `Contract` |

#### Inherited from

[MasaSBTWrapper](MasaSBTWrapper.md).[constructor](MasaSBTWrapper.md#constructor)

## Properties

### contract

• `Readonly` **contract**: `Contract`

#### Inherited from

[MasaSBTWrapper](MasaSBTWrapper.md).[contract](MasaSBTWrapper.md#contract)

___

### links

• `Readonly` **links**: [`MasaSoulLinker`](MasaSoulLinker.md)

#### Inherited from

[MasaSBTWrapper](MasaSBTWrapper.md).[links](MasaSBTWrapper.md#links)

___

### masa

• `Protected` `Readonly` **masa**: [`MasaInterface`](../interfaces/MasaInterface.md)

#### Inherited from

[MasaSBTWrapper](MasaSBTWrapper.md).[masa](MasaSBTWrapper.md#masa)

## Methods

### bulkMint

▸ **bulkMint**(`receivers`, `paymentMethod?`): `Promise`<`boolean`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `receivers` | `string`[] | `undefined` |
| `paymentMethod` | [`PaymentMethod`](../modules.md#paymentmethod) | `"ETH"` |

#### Returns

`Promise`<`boolean`[]\>

___

### burn

▸ **burn**(`SBTId`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `SBTId` | `BigNumber` |

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[MasaSBTWrapper](MasaSBTWrapper.md).[burn](MasaSBTWrapper.md#burn)

___

### list

▸ **list**(`address?`): `Promise`<{ `tokenId`: `BigNumber` ; `tokenUri`: `string`  }[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address?` | `string` |

#### Returns

`Promise`<{ `tokenId`: `BigNumber` ; `tokenUri`: `string`  }[]\>

#### Inherited from

[MasaSBTWrapper](MasaSBTWrapper.md).[list](MasaSBTWrapper.md#list)

___

### loadSBTIDs

▸ `Protected` **loadSBTIDs**(`sbtIDs`): `Promise`<{ `tokenId`: `BigNumber` ; `tokenUri`: `string`  }[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sbtIDs` | `BigNumber`[] |

#### Returns

`Promise`<{ `tokenId`: `BigNumber` ; `tokenUri`: `string`  }[]\>

#### Inherited from

[MasaSBTWrapper](MasaSBTWrapper.md).[loadSBTIDs](MasaSBTWrapper.md#loadsbtids)

___

### loadSBTs

▸ `Protected` **loadSBTs**(`identityIdOrAddress`): `Promise`<{ `tokenId`: `BigNumber` ; `tokenUri`: `string`  }[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identityIdOrAddress` | `string` \| `BigNumber` |

#### Returns

`Promise`<{ `tokenId`: `BigNumber` ; `tokenUri`: `string`  }[]\>

#### Inherited from

[MasaSBTWrapper](MasaSBTWrapper.md).[loadSBTs](MasaSBTWrapper.md#loadsbts)

___

### mint

▸ **mint**(`receiver`, `paymentMethod?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `receiver` | `string` | `undefined` |
| `paymentMethod` | [`PaymentMethod`](../modules.md#paymentmethod) | `"ETH"` |

#### Returns

`Promise`<`boolean`\>
