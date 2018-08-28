# Test framework for LINE Clova Extension Kit SDK for Node.js

Clova Extension Kit SDK for Node.jsのテストフレームワークです。
このフレームワークでテストを実行するためには、`jest`のインストールが必要です。

## Install

### Install @daisukeark/clova-conversation-model-assert

```bash
npm install --save-dev @daisukeark/clova-conversation-model-assert
```

### Install jest

```bash
npm install --save-dev jest
```

## Samples

```typescript
import { Conversation, IConversationCondition, IRequestCondition } from '@daisukeark/clova-conversation-model-assert';
import { clovaHandler } from '../samples/hello-world/clova-handler';

const condition: IConversationCondition = {
  handler: clovaHandler,
  description: 'テストフレームワーク テスト'
};

Conversation.init(condition)
  // 起動要求
  .launchRequest()
  // LaunchRequestの発話情報が完全一致するか評価します。
  .equal('ようこそ')
  // セッション終了要求
  .sessionEndedRequest()
  // 評価
  .end();

Conversation.init(condition)
  // 起動要求
  .launchRequest()
  // インテント要求 HelloWorldIntent
  .requestIntent('HelloWorldIntent')
  // HelloWorldIntentの発話情報が完全一致するか評価します。
  .equal('こんにちは、元気ですか？')
  // インテント要求 Clova.YesIntent
  .requestIntent('Clova.YesIntent')
  // Clova.YesIntentの発話情報が完全一致するか評価します。
  .equal('今日も一日頑張っていきましょう。')
  // 評価
  .end();
```

実行には以下のコマンドを実行してください。

```bash
$(npm bin)/jest
```

## Conversation Assert

種類 | 概要 |
:-- | :-- |
equal | SimpleSpeechテキストが完全一致すること |
