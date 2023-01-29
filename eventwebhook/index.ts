import {AzureFunction, Context, HttpRequest} from "@azure/functions"
import {BlobServiceClient, StorageSharedKeyCredential} from "@azure/storage-blob"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    // log
    context.log(req.body)

    const account = process.env.STORAGE_ACCOUNT_NAME || "";
    const accountKey = process.env.STORAGE_ACCOUNT_KEY || "";
    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    const blobServiceClient = new BlobServiceClient(
        `https://${account}.blob.core.windows.net`,
        sharedKeyCredential
    );
    // コンテナがなければ作る
    const containerClient = await blobServiceClient.getContainerClient("sendgrid");
    await containerClient.createIfNotExists();

    // append blobが無ければ作る
    const date = new Date().getDate();

    const appendBlobClient = await containerClient.getAppendBlobClient(`activity-${getYYYYMMDD(new Date())}.log`);
    await appendBlobClient.createIfNotExists();

    // append blobに追記
    let activity = JSON.stringify(req.body) + '\n';
    await appendBlobClient.getAppendBlobClient().appendBlock(activity, activity.length);

    context.res = {
        status: 200
    };

};

const getYYYYMMDD = (now: Date) => {
    let yyyy = now.getFullYear();
    let mm = ('00' + (now.getMonth() + 1)).slice(-2);
    let dd = ('00' + now.getDate()).slice(-2);
    const ymd = String(yyyy) + String(mm) + String(dd);
    return ymd;
};

export default httpTrigger;
