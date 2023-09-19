import { INotificationService } from '@/contracts/usecases/INotificationService'
import { NotificationHandlers } from './NotificationHandlers'
import express, { Request, Response } from 'express'
import fileUpload from 'express-fileupload'

export function runHttpHandlers(
    notificationService: INotificationService
) {

    //Instantiate express
    const app = express()
    const port = process.env.APP_PORT ??= '3000'

    app.use(express.json())
    app.use(fileUpload())

    //Instantiate Notification Service
    const notifHandler = new NotificationHandlers(notificationService)

    app.post('/notification', async (req: Request, res: Response) => notifHandler.storeNotificationHandler(req, res))
    app.get('/notification', async (req: Request, res: Response) => notifHandler.fetchAllNotificationHandler(req, res))
    app.get('/notification/:id', async (req: Request, res: Response) => notifHandler.viewNotificationHandler(req, res))
    app.delete('/notification/:id', async (req: Request, res: Response) => notifHandler.deleteNotificationHandler(req, res))

    //Listening 
    app.listen(port, () => {
        console.log(`app listening on port ${port}`)
    })
}