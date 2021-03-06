import { ExtensionModule } from '@atweel/extensibility';
import { DemoCoreModuleApi } from './core';

interface DemoExtensionModuleBConfigurationApi {
    configureExtensionB(): void;
}

class DemoExtensionModuleB implements ExtensionModule<DemoCoreModuleApi, DemoExtensionModuleBConfigurationApi> {
    public compileConfigurationApi(extensionApi: DemoCoreModuleApi): DemoExtensionModuleBConfigurationApi {
        return {
            configureExtensionB: (): void => {
                // tslint:disable-next-line: no-console
                console.log('Configuring extension B');
                extensionApi.doStuff('B');
            },
        };
    }
}

export default new DemoExtensionModuleB();

export {
    DemoExtensionModuleB,
    DemoExtensionModuleBConfigurationApi,
};
