import * as CEK from '@line/clova-cek-sdk-nodejs';
import UUID from 'uuid';
import { IConversationCondition } from './conversation-condition';
import { IRequestCondition } from './request-condition';

export function buildRequest(
  appCondition: IConversationCondition,
  intentName: string,
  previousResponse: CEK.Clova.ResponseBody,
  reqCondition?: IRequestCondition
): CEK.Clova.RequestBody {
  let request: CEK.Clova.Request;

  switch (intentName) {
    case 'LaunchRequest':
      request = {
        type: 'LaunchRequest'
      };
      break;
    case 'SessionEndedRequest':
      request = {
        type: 'SessionEndedRequest'
      };
      break;
    default:
      request = {
        type: 'IntentRequest',
        intent: {
          name: intentName,
          slots: reqCondition && reqCondition.intent.slots ? reqCondition.intent.slots : {}
        }
      };
      break;
  }

  return {
    version: '1.0',
    session: {
      new: false,
      sessionAttributes: previousResponse.sessionAttributes ? previousResponse.sessionAttributes : {},
      sessionId: UUID.v4(),
      user: {
        userId: appCondition.user ? appCondition.user.userId : UUID.v4(),
        accessToken: appCondition.user && appCondition.user.accessToken ? appCondition.user.accessToken : ''
      }
    },
    context: {
      System: {
        application: {
          applicationId: appCondition.extensionId ? appCondition.extensionId : ''
        },
        user: {
          userId: appCondition.user ? appCondition.user.userId : UUID.v4(),
          accessToken: appCondition.user && appCondition.user.accessToken ? appCondition.user.accessToken : ''
        },
        device: {
          deviceId: appCondition.device ? appCondition.device.deviceId : UUID.v4(),
          display: {
            size: 'none'
          }
        }
      }
    },
    request: request
  };
}
