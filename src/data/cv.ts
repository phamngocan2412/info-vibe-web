export interface CV {
    id: string;
    label: string;
    fileName: string;
    url?: string; // New field for Supabase URL
    isDefault: boolean;
    lastUpdated: string;
}

// Dữ liệu CV được cấu hình trực tiếp tại đây
export const cvList: CV[] = [
    {
        id: "default-cv",
        label: "My CV",
        fileName: "my-cv.pdf",
        // Nếu dùng Supabase, url sẽ trông như: https://xyz.supabase.co/.../my-cv.pdf
        // Nếu chưa có url, nó sẽ fallback về /cvs/fileName trong code Hero.tsx
        url: undefined,
        isDefault: true,
        lastUpdated: "2024-02-04"
    }
];

export const getActiveCV = (): CV | undefined => {
    return cvList.find(cv => cv.isDefault) || cvList[0];
};
