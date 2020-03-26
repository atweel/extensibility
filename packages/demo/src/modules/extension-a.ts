import { ExtensionModule } from '@atweel/extensibility';
import { DemoCoreModuleApi } from './core';

interface DemoExtensionModuleAConfigurationApi {
    configureExtensionA(): void;
}

class DemoExtensionModuleA implements ExtensionModule<DemoCoreModuleApi, DemoExtensionModuleAConfigurationApi> {
    public compileConfigurationApi(extensionApi: DemoCoreModuleApi): DemoExtensionModuleAConfigurationApi {
        return {
            configureExtensionA: (): void => {
                // tslint:disable-next-line: no-console
                console.log('Configuring extension A');
                extensionApi.doStuff('A');
            },
        };
    }
}

export default new DemoExtensionModuleA();

export {
    DemoExtensionModuleA,
    DemoExtensionModuleAConfigurationApi,
};
