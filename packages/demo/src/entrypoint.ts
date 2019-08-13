import coreModule from 'modules/core';
import extensionModuleA from 'modules/extension-a';
import extensionModuleB from 'modules/extension-b';

coreModule
    .bundle(extensionModuleA)
    .bundle(extensionModuleB)
    .configure((bundle) => {
        bundle
            .configureCore()
            .configureExtensionA()
            .configureExtensionB();
    });
