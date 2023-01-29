# sendgrid-tools

SendGridのActivityログをWebHookを経由してBlobStorageに流し込むFunction

## ローカル実行

1. Storageアカウントを<BlockBlob>作成

2. Azure Functionを作成

3. STORAGE_ACCOUNT_NAME,STORAGE_ACCOUNT_KEYをFunctionの環境変数に追加

4. Functionの環境変数をローカルへダウンロード

```
func azure functionapp fetch-app-settings <functionname>
```

5. ローカルで実行

```
func start
```

## deploy

```
func azure functionapp publish <functionname>
```

