export const httpMethodSymbolKey = Symbol.for('winter:httpMethod');
const [GET, POST, PUT, DELETE] = ['get', 'post', 'put', 'delete'].map((method) => {
    return (target, propertyKey) => {
        Reflect.defineMetadata(httpMethodSymbolKey, method, target, propertyKey);
    };
});
export { GET, POST, PUT, DELETE };
//# sourceMappingURL=http-method.js.map