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

    Function("add") { (a: Double, b: Double) in
        let result = a + b

        return result
    }

  }
}
