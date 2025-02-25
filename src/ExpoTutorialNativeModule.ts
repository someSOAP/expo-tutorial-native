import { NativeModule, requireNativeModule } from "expo";

declare class ExpoTutorialNativeModule extends NativeModule {
  getValue(key: string): string;
  setValue(key: string, value: string): void;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoTutorialNativeModule>(
  "ExpoTutorialNative",
);
