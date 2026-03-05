import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    id: bigint;
    content: string;
    author: Principal;
    timestamp: Time;
}
export type Time = bigint;
export interface backendInterface {
    addMessage(content: string): Promise<void>;
    getAllMessages(): Promise<Array<Message>>;
    getMessage(id: bigint): Promise<Message>;
}
