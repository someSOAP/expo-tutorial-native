import { NativeModule, requireNativeModule } from "expo";

interface DialogParams {
  title?: string;
  message: string;
}

declare class ExpoTutorialNativeModule extends NativeModule {
  dialog(params: DialogParams): Promise<boolean>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoTutorialNativeModule>(
  "ExpoTutorialNative",
);
