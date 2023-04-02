export const TopicStatusEnum = {
    NEW: "Tạo mới",
    READY: "Sẵn sàng xét duyệt",
    FAIL_REVIEW: "Rớt xét duyệt",
    CARRY_OUT: "Đang thực hiện",
    DUE_TO_ACCEPT: "Đến hạn nghiệm thu",
    FAIL_ACCEPT: "Rớt nghiệm thu",
    FINISHED: "Đã hoàn thành",
    OUT_OF_DATE: "Trễ hạn",
    CANCELED: "Bị hủy"
} as const;