export interface formInterface {
    _id: string,
    templateId: string,
    fields: {
        initialName: string,
        name: string,
        note: string,
        dataType: string
    }[],
    markedTemplateFileName: string
}

