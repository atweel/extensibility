# Extensibility packge by Stackeat Company
## Overview
This package introduces the concept of **extensible modules** that can be used to break large monolithic packages into a single **core module** and a collection of **extensions modules** to ensure more granular dependency management for their consumers. As of version 0.1.2,integration between extensions and core module that is supported out of the box is limited to injecting capabilities provided by extensions into a single **inversify container** via **inversify container modules**. This functionality may be axtended in future releases.

## Key concepts
### Core module
A **core module** is a module that defines abstractions that can be implemented in **extension modules** along with a mechanism for loading these extensions.

### Extension module
**Extension modules** provide implementation for all or some of the abstractions define in the core module and can be used by consumers independently.

## Example usage
Here is an example of how this concept can be implemented with one core and one extension module. To do so, the core module must export an instance of `CoreModule` by default.
```typescript
import { CoreModule } from '@stackeat/extensibility';

export default new CoreModule();
```
The extension module must provide an implementation of the `ExtensionModule` interface and expose an instance of it as default export.
```typescript
class SampleExtensionModule implements ExtensionModule {

    private readonly containerModule = new ContainerModule(this.bindingsCallback.bind(this));

    private bindingsCallback(
        bind: interfaces.Bind,
        unbind: interfaces.Unbind,
        isBound: interfaces.IsBound,
        rebind: interfaces.Rebind): void {
        //  Bind implementations as you would normally do in a container module
    }
}

export {
    SampleExtensionModule,
};

```