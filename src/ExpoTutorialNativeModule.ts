import { NativeModule, requireNativeModule } from "expo";

declare class ExpoTutorialNativeModule extends NativeModule {
  add(a: number, b: number): number;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoTutorialNativeModule>(
  "ExpoTutorialNative",
);
