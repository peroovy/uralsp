import type * as Kit from "@sveltejs/kit";

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type RouteParams = {};
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K;
}[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>;
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type PageParentData = EnsureDefined<LayoutData>;
type LayoutParams = RouteParams & {
    adminId?: string;
    q?: string;
    admin?: string;
    contestId?: string;
    application?: string;
    info?: string;
};
type LayoutParentData = EnsureDefined<{}>;

export type PageServerData = null;
export type PageData = Expand<PageParentData>;
export type LayoutServerData = null;
export type LayoutLoad<OutputData extends OutputDataShape<LayoutParentData> = OutputDataShape<LayoutParentData>> = Kit.Load<LayoutParams, LayoutServerData, LayoutParentData, OutputData>;
export type LayoutLoadEvent = Parameters<LayoutLoad>[0];
export type LayoutData = Expand<
    Omit<LayoutParentData, keyof Kit.AwaitedProperties<Awaited<ReturnType<typeof import("./proxy+layout.js").load>>>> &
        EnsureDefined<Kit.AwaitedProperties<Awaited<ReturnType<typeof import("./proxy+layout.js").load>>>>
>;
