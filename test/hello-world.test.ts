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
  .requestIntent('HelloWorldIntent')
  .equal('こんにちは、元気ですか？')
  .requestIntent('Clova.NoIntent')
  .equal('元気になーれ')
  .end();

Conversation.init(condition)
  .launchRequest()
  .requestIntent('HelloWorldListIntent')
  .equal('こんにちは、元気ですか？')
  .end();

Conversation.init(condition)
  .launchRequest()
  .requestIntent('HelloWorldSetIntent')
  .equal('こんにちは')
  .end();

Conversation.init(condition)
  .launchRequest()
  .requestIntent('NotFoundIntent')
  .equal('もう一度大きな声であいさつをしましょう。')
  .sessionEndedRequest()
  .end();
