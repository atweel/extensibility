// tslint:disable-next-line: no-empty-interface
interface ExtensionModule<TEA, TCA> {
    compileConfigurationApi(etensionApi: TEA): TCA;
}

export {
    ExtensionModule,
};
