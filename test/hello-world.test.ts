import { clovaHandler } from '../samples/hello-world/clova-handler';
import { Conversation } from '../src/index';
import { IConversationCondition } from '../src/lib/conversation-condition';

const condition: IConversationCondition = {
  handler: clovaHandler,
  description: 'テストフレームワーク テスト'
};

Conversation.init(condition)
  .launchRequest()
  .equal('ようこそ')
  .sessionEndedRequest()
  .end();

Conversation.init(condition)
  .launchRequest()
  .requestIntent('HelloWorldIntent')
  .equal('こんにちは、元気ですか？')
  .requestIntent('Clova.YesIntent')
  .equal('今日も一日頑張っていきましょう。')
  .end();

Conversation.init(condition)
  .launchRequest()
  .requestIntent(
    'SlotIntent',
    {
      intent: {
        slots: {
          userName: {
            name: 'userName',
            value: '大輔'
          }
        }
      }
    })
  .equal('大輔さん、こんにちは、元気ですか？')
  .end();

Conversation.init(condition)
  .launchRequest()
  .requestIntent('HelloWorldIntent')
  .equal('こんにちは、元気ですか？')
  .requestIntent('Clova.NoIntent')
  .equal('元気になーれ')
  .end();

Conversation.init(condition)
  .launchRequest()
  .requestIntent('HelloWorldListIntent')
  .equalList([
    'こんにちは、元気ですか？',
    'http://clova.line.me/sample.mp3'
  ])
  .end();

Conversation.init(condition)
  .launchRequest()
  .requestIntent('HelloWorldSetIntent')
  .equalSetBrief('挨拶の種類')
  .equalSetVerbose('挨拶には、おはようございます、こんにちは、こんばんは、があります。')
  .end();

Conversation.init(condition)
  .launchRequest()
  .requestIntent('HelloWorldSetVerboseListIntent')
  .equalSetBrief('挨拶の種類')
  .equalSetVerboseList([
    '挨拶には、',
    'おはようございます、',
    'こんにちは、',
    'こんばんは、',
    'があります。'
  ])
  .end();

Conversation.init(condition)
  .launchRequest()
  .requestIntent('NotFoundIntent')
  .equal('もう一度大きな声であいさつをしましょう。')
  .sessionEndedRequest()
  .end();
