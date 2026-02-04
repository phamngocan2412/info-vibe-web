export interface CV {
    id: string;
    label: string;
    fileName: string; // e.g., "frontend-cv.pdf"
    isDefault: boolean;
    lastUpdated: string;
}

// Initial Data - You can update this by pasting the JSON generated from the Admin page
export const cvList: CV[] = [
    {
        id: "1",
        label: "Full Stack Developer",
        fileName: "placeholder-cv.pdf",
        isDefault: true,
        lastUpdated: "2024-02-04"
    }
];

export const getActiveCV = (): CV | undefined => {
    return cvList.find(cv => cv.isDefault) || cvList[0];
};
