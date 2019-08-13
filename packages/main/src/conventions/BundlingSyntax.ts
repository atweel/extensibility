import { PurelyFunctional } from '@stackeat/primitives';
import { ExtensionModule } from 'conventions/ExtensionModule';

type ConfigurationSyntax<T> = {
    [key in keyof T]: () => ConfigurationSyntax<T>;
};

type ConfigurationRoutine<T> = (configuration: ConfigurationSyntax<T>) => void;

interface BundlingSyntax<TEA extends PurelyFunctional<TEA>, TCA extends PurelyFunctional<TCA>> {
    bundle<TECA>(extension: ExtensionModule<TEA, TECA>): BundlingSyntax<TEA, TCA & TECA>;
    configure(configurator: ConfigurationRoutine<TCA>): void;
}

export {
    BundlingSyntax,
    ConfigurationRoutine,
    ConfigurationSyntax,
};
