export interface Job {
    id: number;
    title: string;
    creatorId: number;
    creatorName: string;
    description: string;
    candidates: Candidate[];
    likes: Like[];
    kind: string;
    department: string;
    isActive: boolean;
}


export interface Candidate {
    userId: number;
    name: string;
    approved: boolean;
}

export interface Like {
    userId: number;
}
