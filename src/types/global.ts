export interface RouteConfig {
    path: string;
    name?: string;
    element?: React.ReactNode;
    children?: RouteConfig[];
}