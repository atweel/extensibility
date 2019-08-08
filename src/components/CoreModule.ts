import { ExtensionModule } from 'conventions/ExtensionModule';
import { interfaces } from 'inversify';

class CoreModule {

    private readonly extensions: ExtensionModule[] = [];
    public use(extension: ExtensionModule): CoreModule {
        this.extensions.push(extension);

        return this;
    }

    public injectContainerModules(container: interfaces.Container): void {
        this.extensions.map((extension) => extension.injectContainerModules(container));
    }
}

export {
    CoreModule,
};
