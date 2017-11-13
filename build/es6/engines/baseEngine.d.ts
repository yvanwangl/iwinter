export declare const engineSymbolKey: symbol;
export declare class Engine {
    protected router: any;
    protected dir: string;
    protected prefix: string;
    controller(): void;
    addRouterMap(Controller: any): void;
}
