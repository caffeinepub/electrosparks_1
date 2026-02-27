import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Registration {
    id: bigint;
    numberOfMembers: bigint;
    collegeName: string;
    year: bigint;
    fullName: string;
    email: string;
    totalAmount: bigint;
    timestamp: bigint;
    paymentScreenshotFileName: string;
    phone: string;
    department: string;
    eventType: EventType;
}
export interface Stats {
    totalMembers: bigint;
    totalRevenue: bigint;
    totalRegistrations: bigint;
}
export interface UserProfile {
    name: string;
}
export enum EventType {
    seminar = "seminar",
    workshop = "workshop",
    competition = "competition"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllRegistrations(): Promise<Array<Registration>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getRegistration(id: bigint): Promise<Registration | null>;
    getStats(): Promise<Stats>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitRegistration(fullName: string, collegeName: string, department: string, year: bigint, email: string, phone: string, eventType: EventType, numberOfMembers: bigint, totalAmount: bigint, paymentScreenshotFileName: string): Promise<bigint>;
}
