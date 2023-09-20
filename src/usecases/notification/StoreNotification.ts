import { INotificationRepositories } from "@/contracts/repositories/INotificationRepositories";
import { ICloudMessagingService } from "@/contracts/usecases/ICloudMessagingService";
import { IStorageService } from "@/contracts/usecases/IStorageServices";
import { IResponse } from "@/contracts/usecases/IResponse";
import { Response } from "../../utils/Response";
import { IUploadedFile } from "@/contracts/IFile";
import { OperationStatus } from "../../constants/operations";
import { IAuthGuard } from "@/contracts/middleware/AuthGuard";

const storeNotification = async function (
    authGuard: IAuthGuard,
    notifRepo: INotificationRepositories,
    cloudMessageService: ICloudMessagingService,
    cloudStorageService: IStorageService,
    file: IUploadedFile, 
    title: string, 
    description: string
): Promise<IResponse> {

    //1. upload file to cloud storage
    let uploadResponse = await cloudStorageService.uploadFile(file)
    if(uploadResponse.isFailed()) {
        uploadResponse.setStatusCode(OperationStatus.cloudStorageError)
        return uploadResponse
    }

    //2. save data to repo
    let storeResponse = await notifRepo.storeNotification(authGuard.getUserId(), title, description, uploadResponse.getData().fileUrl)
    if(storeResponse.isFailed()) {
        storeResponse.setStatusCode(OperationStatus.repoError)
        return storeResponse
    }
    
    //3. broadcast notification to registered devices
    cloudMessageService.sendNotification([], title, description, uploadResponse.getData().fileUrl)

    return new Response()
        .setStatus(true)
        .setStatusCode(1)
        .setMessage("ok")
        .setData(storeResponse.getData())
}

export { storeNotification };
