export interface UserData {
    _id: string;
    name: string;
    email: string;
    photoUrl: string;
    interests: string[];
    courses: string[];
    role: string;
    isBlocked: boolean;
    status: boolean;
    isVerified: boolean;
    updateAtLogin: Date;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }
  