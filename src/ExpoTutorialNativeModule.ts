import { NativeModule, requireNativeModule } from 'expo';

import { ExpoTutorialNativeModuleEvents } from './ExpoTutorialNative.types';

declare class ExpoTutorialNativeModule extends NativeModule<ExpoTutorialNativeModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoTutorialNativeModule>('ExpoTutorialNative');
