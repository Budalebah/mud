import { DynamicAbiType, StaticAbiType } from "@latticexyz/schema-type";
import { Hex } from "viem";

// Although we could import `SchemaAbiType` from `@latticexyz/schema-type` here, we "redefine" this here
// so that our downstream type errors give back `AbiType` instead of the union of all possible ABI types.
//
// This is a bit of a TS compiler hack and we should figure out a better long-term approach.
export type AbiType = StaticAbiType | DynamicAbiType;

export type UserTypes = {
  readonly [userTypeName: string]: AbiType;
};

export type Enums = {
  readonly [enumName: string]: readonly [string, ...string[]];
};

export type Schema = {
  readonly [fieldName: string]: {
    /** the Solidity primitive ABI type */
    readonly type: AbiType;
    /** the user defined type or Solidity primitive ABI type */
    readonly internalType: string;
  };
};

export type KeySchema = {
  readonly [keyName: string]: {
    /** the Solidity primitive ABI type */
    readonly type: StaticAbiType;
    /** the user defined type or Solidity primitive ABI type */
    readonly internalType: string;
  };
};

export type Table = {
  readonly tableId: Hex;
  readonly primaryKey: readonly string[];
  readonly schema: Schema;
  /** @deprecated Use `schema` and `primaryKey` */
  readonly keySchema: KeySchema;
  /** @deprecated Use `schema` and `primaryKey` */
  readonly valueSchema: Schema;
};

export type Config = {
  readonly tables: {
    readonly [namespacedTableName: string]: Table;
  };
  readonly userTypes: UserTypes;
  readonly enums: Enums;
  readonly namespace: string;
};