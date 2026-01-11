export interface ExperienceItem {
    id: number;
    role: string;
    company: string;
    period: string;
    description: string; // Key for description array
}

export const experiences: ExperienceItem[] = [
    {
        id: 1,
        role: "experience.items.vms.role",
        company: "experience.items.vms.company",
        period: "experience.items.vms.period",
        description: "experience.items.vms.description"
    },
    {
        id: 2,
        role: "experience.items.aisoft.role",
        company: "experience.items.aisoft.company",
        period: "experience.items.aisoft.period",
        description: "experience.items.aisoft.description"
    },
    {
        id: 3,
        role: "experience.items.vlu.role",
        company: "experience.items.vlu.company",
        period: "experience.items.vlu.period",
        description: "experience.items.vlu.description"
    },
    {
        id: 4,
        role: "experience.items.iot.role",
        company: "experience.items.iot.company",
        period: "experience.items.iot.period",
        description: "experience.items.iot.description"
    }
];
