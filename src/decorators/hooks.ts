export const beforeSymbolKey = Symbol.for('winter:before');
export const afterSymbolKey = Symbol.for('winter:after');


const [Before, After] = ['before', 'after'].map((hook) => {
    return (hookFunc) => {
        return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
            Reflect.defineMetadata(beforeSymbolKey, hookFunc, target, propertyKey);
        };
    };
});

export {
    Before,
    After
};