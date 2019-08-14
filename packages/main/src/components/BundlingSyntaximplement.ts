import { PurelyFunctional } from '@stackeat/primitives';
import { BundlingSyntax, ConfigurationRoutine, InjectionSyntax } from 'conventions/BundlingSyntax';
import { ExtensionModule } from 'conventions/ExtensionModule';
import { interfaces } from 'inversify';
import { InjectionSyntaxImplement } from './InjectionSyntaxImplement';

class BundlingSyntaxImplement<TA extends PurelyFunctional<TA>,
    T extends PurelyFunctional<T>> implements BundlingSyntax<TA, T> {
    constructor(
        private bundleCallback: (extension: ExtensionModule<TA, any>) => void,
        private configureCallback: (configurator: ConfigurationRoutine<any>) => void,
        private injectionCallback: (container: interfaces.Container) => void,
    ) {

    }

    public bundle<TECA>(extension: ExtensionModule<TA, TECA>): BundlingSyntax<TA, T & TECA> {
        this.bundleCallback(extension);

        return new BundlingSyntaxImplement<TA, T & TECA>(this.bundleCallback,
            this.configureCallback, this.injectionCallback);
    }

    public configure(configurator: ConfigurationRoutine<T>): InjectionSyntax {
        this.configureCallback(configurator);

        return new InjectionSyntaxImplement(this.injectionCallback);
    }
}

export {
    BundlingSyntaxImplement,
};
