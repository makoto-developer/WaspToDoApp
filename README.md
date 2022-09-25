# wasp入門

## Requirement

- Node.js v16.x
- Docker

## Starting

クローン

```shell
git clone git@github.com:makoto-developer/WaspToDoApp.git
```

PostgreSQLサーバを起動

```shell
# docker-compose.ymlがあるディレクトリへ移動
cd docker/postgresql

# .envファイルを用意して適宜修正する。その場合プロジェクトルートにある.envファイルの合わせて修正すること。
cp -p .env.example .env
vi .env

# 初回は↓のコマンドでコンテナを作成して起動する
docker-compose up -d
# 2回目移行はstartだけで起動可能。
docker-compose start
cd ../..

# 停止する場合
cd docker/postgresql
docker-compose stop
cd ../..

# 完全停止(コンテナごと削除する場合)。なお、Volumeを設定しているためDBの内容は消えることはない(不要な場合は設定を削除してよい)。
cd docker/postgresql
docker-compose down
cd ../..
```

Wasp Appを起動

```shell
# localhsot:3000で自動で起動するのでブラウザで開く
wasp start

# トラブルシューティング
## DB周りで起動できない場合は一旦migrationファイルを削除して起動する
rm -r migrations/
wasp db migrate-dev
wasp start
```

DBの内容を見る(Prisma)

```shell
wasp db studio
```

## 環境構築作業ログ

プロジェクトを作成

[こちら](https://wasp-lang.dev/docs/language/features#migrating-from-sqlite-to-postgresql)を見ながら作業

```shell
wasp new WaspToDoApp
cd WaspToDoApp
wasp start
```

migrateする場合

```shell
wasp db migrate-dev
```

dbの内容を確認する

```shell
wasp db studio
```
