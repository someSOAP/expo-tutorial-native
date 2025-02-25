import { registerWebModule, NativeModule } from 'expo';

import { ExpoTutorialNativeModuleEvents } from './ExpoTutorialNative.types';

class ExpoTutorialNativeModule extends NativeModule<ExpoTutorialNativeModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoTutorialNativeModule);
