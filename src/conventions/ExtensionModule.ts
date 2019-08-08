import { interfaces } from 'inversify';

interface ExtensionModule {
    injectContainerModules(container: interfaces.Container): void;
}

export {
    ExtensionModule,
};
