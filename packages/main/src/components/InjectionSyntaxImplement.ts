import { InjectionSyntax } from 'conventions/BundlingSyntax';
import { interfaces } from 'inversify';

class InjectionSyntaxImplement implements InjectionSyntax {
    constructor(
        private injectionCallback: (container: interfaces.Container) => void,
    ) {

    }
    public injectInto(container: interfaces.Container): void {
        this.injectionCallback(container);
    }
}

export {
    InjectionSyntaxImplement,
};
