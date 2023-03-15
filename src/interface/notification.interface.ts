export interface NotificationIntf {
    author: string,
    subject: string,
    content: string,
    createAt: string,
    redirect?: string,
    isRead: boolean
}