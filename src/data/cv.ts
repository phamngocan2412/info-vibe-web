export interface CV {
    id: string;
    label: string;
    fileName: string;
    isDefault: boolean;
    lastUpdated: string;
}

// Dữ liệu CV được cấu hình trực tiếp tại đây
// Bạn chỉ cần thay đổi "fileName" thành tên file PDF thực tế của bạn trong thư mục public/cvs/
export const cvList: CV[] = [
    {
        id: "default-cv",
        label: "My CV",
        fileName: "my-cv.pdf", // Đảm bảo file này tồn tại trong public/cvs/
        isDefault: true,
        lastUpdated: "2024-02-04"
    }
];

export const getActiveCV = (): CV | undefined => {
    return cvList.find(cv => cv.isDefault) || cvList[0];
};
