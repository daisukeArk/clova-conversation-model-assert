import * as CEK from '@line/clova-cek-sdk-nodejs';

const launchHandler = async (responseHelper: CEK.Context) => {
  responseHelper.setSimpleSpeech(
    CEK.SpeechBuilder.createSpeechText('ようこそ')
  );
  responseHelper.setSimpleSpeech(
    CEK.SpeechBuilder.createSpeechText('あいさつをしましょう。こんにちは、と聞かせてください。'),
    true
  );
};

const intentHandler = async (responseHelper: CEK.Context) => {
  const intent = responseHelper.getIntentName();

  switch (intent) {
    case 'HelloWorldIntent':
      responseHelper.setSimpleSpeech(
        CEK.SpeechBuilder.createSpeechText(`こんにちは、元気ですか？`)
      );
      responseHelper.setSimpleSpeech(
        CEK.SpeechBuilder.createSpeechText(`こんにちは、元気ですか？`),
        true
      );
      break;
    case 'HelloWorldListIntent':
      responseHelper.setSpeechList([
        CEK.SpeechBuilder.createSpeechText('こんにちは、元気ですか？'),
        CEK.SpeechBuilder.createSpeechUrl('http://clova.line.me/sample.mp3')
      ]);
      responseHelper.setSpeechList(
        [
          CEK.SpeechBuilder.createSpeechText('こんにちは、元気ですか？'),
          CEK.SpeechBuilder.createSpeechUrl('http://clova.line.me/sample.mp3')
        ],
        true
      );
      break;
    case 'HelloWorldSetIntent':
      const speechInfoBrief = CEK.SpeechBuilder.createSpeechText('挨拶の種類');
      const speechInfoVerbose: CEK.Clova.OutputSpeechVerbose = {
        type: 'SimpleSpeech',
        values: CEK.SpeechBuilder.createSpeechText('挨拶には、おはようございます、こんにちは、こんばんは、があります。')
      };

      responseHelper.setSpeechSet(speechInfoBrief, speechInfoVerbose);
      responseHelper.setSpeechSet(speechInfoBrief, speechInfoVerbose, true);
      break;
    case 'HelloWorldSetVerboseListIntent':
      const speechInfoBrief2 = CEK.SpeechBuilder.createSpeechText('挨拶の種類');
      const speechInfoVerbose2: CEK.Clova.OutputSpeechListVerbose = {
        type: 'SpeechList',
        values: [
          CEK.SpeechBuilder.createSpeechText('挨拶には、'),
          CEK.SpeechBuilder.createSpeechText('おはようございます、'),
          CEK.SpeechBuilder.createSpeechText('こんにちは、'),
          CEK.SpeechBuilder.createSpeechText('こんばんは、'),
          CEK.SpeechBuilder.createSpeechText('があります。')
        ]
      };

      responseHelper.setSpeechSet(speechInfoBrief2, speechInfoVerbose2);
      responseHelper.setSpeechSet(speechInfoBrief2, speechInfoVerbose2, true);
      break;
    case 'Clova.YesIntent':
      responseHelper.setSimpleSpeech(
        CEK.SpeechBuilder.createSpeechText('今日も一日頑張っていきましょう。')
      );
      break;
    case 'Clova.NoIntent':
      responseHelper.setSimpleSpeech(
        CEK.SpeechBuilder.createSpeechText('元気になーれ')
      );
      break;
    case 'SlotIntent':
      const userName = `${responseHelper.getSlot('userName') ? responseHelper.getSlot('userName') : '匿名'}さん`;

      responseHelper.setSimpleSpeech(
        CEK.SpeechBuilder.createSpeechText(`${userName}、こんにちは、元気ですか？`)
      );
      responseHelper.setSimpleSpeech(
        CEK.SpeechBuilder.createSpeechText(`${userName}、こんにちは、元気ですか？`),
        true
      );
      break;
    default:
      responseHelper.setSimpleSpeech(
        CEK.SpeechBuilder.createSpeechText('もう一度大きな声であいさつをしましょう。')
      );
      responseHelper.setSimpleSpeech(
        CEK.SpeechBuilder.createSpeechText('あいさつをしましょう。こんにちは、と聞かせてください。'),
        true
      );
      break;
  }
};

const sessionEndedHandler = async (responseHelper: CEK.Context) => {
  responseHelper.endSession();
};

export const clovaHandler = CEK.Client
  .configureSkill()
  .onLaunchRequest(launchHandler)
  .onIntentRequest(intentHandler)
  .onSessionEndedRequest(sessionEndedHandler)
  .handle();
