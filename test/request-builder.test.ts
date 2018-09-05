import * as CEK from '@line/clova-cek-sdk-nodejs';
import { buildRequest } from '../src/lib/request-builder';

describe('buildRequest function', () => {
  beforeEach(() => {
  });

  afterEach(() => {
  });

  it('should set values from "IAppCondition"', () => {
    const request = buildRequest(
      {
        handler: {},
        description: '',
        user: {
          userId: 'userIdTest',
          accessToken: 'accessTokenTest'
        },
        extensionId: 'extensionIdTest',
        device: {
          deviceId: 'deviceIdTest'
        }
      },
      'HelloWorldIntent',
      {
        version: '1.0',
        response: {
          card: {},
          directives: [],
          outputSpeech: {},
          shouldEndSession: false
        },
        sessionAttributes: null
      }
    );

    expect(request.context.System.device.deviceId).toBe('deviceIdTest');
    expect(request.session.user.userId).toBe('userIdTest');
    expect(request.session.user.accessToken).toBe('accessTokenTest');
    expect(request.context.System.application.applicationId).toBe('extensionIdTest');
  });
});
