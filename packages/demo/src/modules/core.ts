import { CoreModule } from '@atweel/extensibility';
import { NotImplementedError } from '@stackeat/primitives';

interface DemoCoreModuleApi {
    doStuff(label: string): void;
}

interface DemoCoreModuleConfigurationApi {
    configureCore(): void;
}

class DemoCoreModule extends CoreModule<DemoCoreModuleApi, DemoCoreModuleConfigurationApi> {
    protected compileExtensionApi(): DemoCoreModuleApi {
        return {
            doStuff: this.doStuff.bind(this),
        };
    }

    protected compileConfigurationApi(): DemoCoreModuleConfigurationApi {
        return {
            configureCore: this.configureCore.bind(this),
        };
    }

    protected inject(/*container: interfaces.Container*/): void {
        throw new NotImplementedError();
    }

    private configureCore(): void {
        // tslint:disable-next-line: no-console
        console.log('configureCore');
    }

    private doStuff(label: string): void {
        // tslint:disable-next-line: no-console
        console.log(`Doing stuff for ${ label }...`);
    }
}

export default new DemoCoreModule();

export {
    DemoCoreModuleConfigurationApi,
    DemoCoreModuleApi,
};
