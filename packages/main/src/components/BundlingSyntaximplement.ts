import { PurelyFunctional } from '@stackeat/primitives';
import { BundlingSyntax, ConfigurationRoutine } from 'conventions/BundlingSyntax';
import { ExtensionModule } from 'conventions/ExtensionModule';

class BundlingSyntaxImplement<TA extends PurelyFunctional<TA>,
    T extends PurelyFunctional<T>> implements BundlingSyntax<TA, T> {
    constructor(
        private bundleCallback: (extension: ExtensionModule<TA, any>) => void,
        private configureCallback: (configurator: ConfigurationRoutine<any>) => void,
    ) {

    }

    public bundle<TECA>(extension: ExtensionModule<TA, TECA>): BundlingSyntax<TA, T & TECA> {
        this.bundleCallback(extension);

        return new BundlingSyntaxImplement<TA, T & TECA>(this.bundleCallback, this.configureCallback);
    }

    public configure(configurator: ConfigurationRoutine<T>): void {
        this.configureCallback(configurator);
    }
}

export {
    BundlingSyntaxImplement,
};
