import ExpoModulesCore

public class ExpoTutorialNativeModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoTutorialNative')` in JavaScript.
    Name("ExpoTutorialNative")

    AsyncFunction("dialog") { (params: DialogParams, promise: Promise) in
      
      guard let viewController = appContext?.utilities?.currentViewController() else {
        promise.reject("DIALOG_ERROR", "current activity is null")
        return
      }
      
      showDialog(viewController: viewController, params: params, promise: promise)
      
    }

  }
}
