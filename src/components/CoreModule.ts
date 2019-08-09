import { ExtensionModule } from 'conventions/ExtensionModule';
import { interfaces } from 'inversify';

type SettingsLike<T> = {
    [key in keyof T]: string | number | boolean;
};

class CoreModule<TSettings extends SettingsLike<TSettings> = {}> {
    constructor(defaultSettings: TSettings) {
        this.settings = defaultSettings;
    }

    public configure(settings: Partial<TSettings>): CoreModule<TSettings> {
        this.settings = {
            ...this.settings,
            ...settings,
        }

        return this;
    }

    private readonly extensions: ExtensionModule[] = [];
    private settings: TSettings;
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

    protected getSettings(): TSettings {
        return this.settings;
    }
}

export {
    CoreModule,
};
