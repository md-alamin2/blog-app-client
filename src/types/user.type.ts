import {Roles} from "../constants/roles"
export interface UserType {
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  role: "USER" | "ADMIN"; 
  phone?: string;
  status?: "ACTIVE";
  id: string;
}
