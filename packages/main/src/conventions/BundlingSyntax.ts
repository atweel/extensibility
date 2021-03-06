import { PurelyFunctional } from '@stackeat/primitives';
import { ExtensionModule } from 'conventions/ExtensionModule';
import { interfaces } from 'inversify';

type ConfigurationSyntax<T extends PurelyFunctional<T>> = {
    [K in keyof T]: (...args: Parameters<T[K]>) => ConfigurationSyntax<T>;
};

type ConfigurationRoutine<T extends PurelyFunctional<T>> = (configuration: ConfigurationSyntax<T>) => void;

interface InjectionSyntax {
    injectInto(container: interfaces.Container): void;
}

interface BundlingSyntax<TEA extends PurelyFunctional<TEA>, TCA extends PurelyFunctional<TCA>> {
    bundle<TECA>(extension: ExtensionModule<TEA, TECA>): BundlingSyntax<TEA, TCA & TECA>;
    configure(configurator: ConfigurationRoutine<TCA>): InjectionSyntax;
}

export {
    BundlingSyntax,
    ConfigurationRoutine,
    ConfigurationSyntax,
    InjectionSyntax,
};
