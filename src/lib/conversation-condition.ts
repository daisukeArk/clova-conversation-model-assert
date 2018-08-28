export interface IConversationCondition {
  handler: any;
  request?: {
    locale?: string;
  };
  extensionId?: string;
  description: string;
  user?: {
    userId: string;
    accessToken?: string;
  };
  device?: {
    deviceId: string;
  };
}
