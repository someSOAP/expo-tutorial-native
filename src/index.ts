// Reexport the native module. On web, it will be resolved to ExpoTutorialNativeModule.web.ts
// and on native platforms to ExpoTutorialNativeModule.ts
export { default } from './ExpoTutorialNativeModule';
export { default as ExpoTutorialNativeView } from './ExpoTutorialNativeView';
export * from  './ExpoTutorialNative.types';
