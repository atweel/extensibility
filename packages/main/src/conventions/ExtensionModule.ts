// tslint:disable-next-line: no-empty-interface
interface ExtensionModule<TEA, TCA> {
    compileConfigurationApi(extensionApi: TEA): TCA;
}

export {
    ExtensionModule,
};
