import { NativeModule, requireNativeModule } from "expo";

interface OnMessagePayload {
  message: string;
}

type ExpoModuleEvents = {
  onMessage: (params: OnMessagePayload) => void;
};

declare class ExpoTutorialNativeModule extends NativeModule<ExpoModuleEvents> {
  connect(url: string): Promise<void>;
  disconnect(): void;
  send(message: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoTutorialNativeModule>(
  "ExpoTutorialNative",
);
