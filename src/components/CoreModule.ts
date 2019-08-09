import { ExtensionModule } from 'conventions/ExtensionModule';
import { interfaces } from 'inversify';

type SettingsLike<T> = {
    [key in keyof T]: string | number | boolean;
};

class CoreModule<TSettings extends SettingsLike<TSettings> = {}> {

    private readonly extensions: ExtensionModule[] = [];
    public use(extension: ExtensionModule): CoreModule<TSettings> {
        this.extensions.push(extension);

        return this;
    }

    public injectContainerModules(container: interfaces.Container): void {
        this.adjustExtensions(this.extensions)
            .map((extension) => extension.injectContainerModules(container));
    }

    protected adjustExtensions(extensions: ExtensionModule[]): ExtensionModule[] {
        return extensions;
    }
}

export {
    CoreModule,
};
