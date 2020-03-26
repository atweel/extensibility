![Integrate master branch](https://github.com/atweel/extensibility/workflows/Integrate%20master%20branch/badge.svg)

# Extensibility package

## Overview
This package introduces the concept of **extensible modules** that can be used to break large monolithic packages into a single **core module** and a collection of **extensions modules** thus providing more granular dependency management and reducing overall code footprint for their consumers. As of version 0.1.2, integration between extension modules and core module that is supported out of the box is limited to injecting capabilities provided by extensions into a single **InversifyJS container** via **InversifyJS container modules**. This functionality may be extended in future releases. If you are not familiar with InversifyJS, please refer to the project's repository on GitHub: https://github.com/inversify/InversifyJS.

## Key concepts
### Core module
A **core module** is a module that defines abstractions that can be implemented in **extension modules** along with a mechanism for loading these extensions.

### Extension module
**Extension modules** provide implementation for all or part of the abstractions defined in the core module and can be used by consumers independently.

## Example usage
Here is an example of how this concept can be implemented with one core and one extension modules. To do so, the core module must expose an instance of `CoreModule` as default export.

```typescript
import { CoreModule } from '@atweel/extensibility';

export default new CoreModule();
```
The extension module must provide an implementation of the `ExtensionModule` interface and expose an instance of it as default export.

```typescript
import { ExtensionModule } from '@atweel/extensibility';
import { ContainerModule } from 'inversify';

class SampleExtensionModule implements ExtensionModule {

    private readonly containerModule = new ContainerModule(this.bindingsCallback.bind(this));

    private bindingsCallback(
        bind: interfaces.Bind,
        unbind: interfaces.Unbind,
        isBound: interfaces.IsBound,
        rebind: interfaces.Rebind): void {
        //  Bind implementations as you would normally do in InversifyJS container modules.
        //  See https://github.com/inversify/InversifyJS/blob/master/wiki/container_modules.md
        //  for more information on InversifyJS container modules.
    }
}

export {
    SampleExtensionModule,
};

```

## License

Copyright 2020 Atweel Inc.
Copyright 2020 Eduard Malakhov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contacts

Shall you have any questions or suggestions about this project, please address them to eduard@atweel.com. We'll be happy to hear from you.