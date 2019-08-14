import { NotImplementedError, PurelyFunctional } from '@stackeat/primitives';
import { BundlingSyntaxImplement } from 'components/BundlingSyntaximplement';
import { BundlingSyntax, ConfigurationRoutine, ConfigurationSyntax, InjectionSyntax } from 'conventions/BundlingSyntax';
import { ExtensionModule } from 'conventions/ExtensionModule';
import { interfaces } from 'inversify';
import { InjectionSyntaxImplement } from './InjectionSyntaxImplement';

abstract class CoreModule<TEA extends PurelyFunctional<TEA> = {},
    TCA extends PurelyFunctional<TCA> = {}> implements BundlingSyntax<TEA, TCA> {

    private extensions: Array<ExtensionModule<TEA, any>> = [];

    private bundleCallback = this.bundleInternal.bind(this);
    private configureCallback = this.configure.bind(this);
    private injectionCallback = this.inject.bind(this);
    public bundle<TECA>(extension: ExtensionModule<TEA, TECA>): BundlingSyntax<TEA, TCA & TECA> {
        this.bundleInternal(extension);

        return new BundlingSyntaxImplement<TEA, TCA & TECA>(this.bundleCallback,
            this.configureCallback, this.injectionCallback);
    }
    public configure(configurator: ConfigurationRoutine<TCA>): InjectionSyntax;
    public configure(configurator: ConfigurationRoutine<any>): InjectionSyntax {
        configurator(this.compileConfigurationSyntax());

        return new InjectionSyntaxImplement(this.injectionCallback);
    }

    protected abstract compileExtensionApi(): TEA;
    protected abstract compileConfigurationApi(): TCA;

    protected abstract inject(container: interfaces.Container): void;

    private bundleInternal(extension: ExtensionModule<TEA, any>): void {
        this.extensions.push(extension);
    }

    private compileConfigurationSyntax(): ConfigurationSyntax<any> {
        const result: unknown = this.extensions.reduce((previous, current) => {
            return {
                ...previous,
                ...current.compileConfigurationApi(this.compileExtensionApi()),
            };
        }, this.compileConfigurationApi());

        Object.keys(result).map((value) => {
            const callback = result[value];

            result[value] = (...args: any[]) => {
                callback(args);

                return result;
            };
        });

        return result as ConfigurationSyntax<any>;
    }
}

export {
    CoreModule,
};
