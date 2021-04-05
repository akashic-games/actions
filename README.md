# actions
akashic-games organization のリポジトリで共通で利用する Github Actions 用のアクションを管理するためのリポジトリ。
各アクションをディレクトリ単位で切り分けています。

## ビルド方法
以下のコマンドを実行することによって、すべてのリポジトリに対してビルドが実行されます。

```
npm run build
```

以下のように lerna コマンドの `--scope` オプションでアクション名を指定することによって、指定したアクションでのみビルドを実行することができます。

```
npx lerna run build --scope=release # release のみをビルド
```

## テスト方法
以下のコマンドを実行することによって、すべてのリポジトリに対してテストが実行されます。

```
npm test
```

以下のように lerna コマンドの `--scope` オプションでアクション名を指定することによって、指定したアクションでのみテストを実行することができます。

```
npx lerna run test --scope=release # release のみをテスト
```

## アクションの追加方法
アクションを追加する場合は、以下の対応が必要になります。
* アクション用のディレクトリを切る
* 追加したディレクトリを lerna.json の packages に追記

## ライセンス

本リポジトリは MIT License の元で公開されています。
詳しくは [LICENSE](https://github.com/akashic-games/actions/blob/master/LICENSE) をご覧ください。

ただし、画像ファイルおよび音声ファイルは
[CC BY 2.1 JP](https://creativecommons.org/licenses/by/2.1/jp/) の元で公開されています。
