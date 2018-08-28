import * as CEK from '@line/clova-cek-sdk-nodejs';

export interface IRequestCondition {
  intent: {
    slots?: {
      [key: string]: {
        name: string;
        value: CEK.Clova.SlotValue;
        valueType?: CEK.Clova.SlotValueType;
      };
    };
  };
}
