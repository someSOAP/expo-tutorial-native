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

    AsyncFunction("dialog") { (params: [String: Any], promise: Promise) in
      
      let title: String = params["message"] as? String ?? "Alert"
      
      guard let message: String = params["message"] as? String else {
        promise.reject("DIALOG_ERROR", "Message is not a string")
        return
      }
      
      let alertController = UIAlertController(title: title, message: message, preferredStyle: .alert)

      
      let yesAction = UIAlertAction(title: "Yes", style: .default) { (action) in
        promise.resolve(true)
      }
              
      let noAction = UIAlertAction(title: "No", style: .destructive) { (action) in
        promise.resolve(false)
      }
      
      alertController.addAction(noAction)
      alertController.addAction(yesAction)
      
      guard let viewController = appContext?.utilities?.currentViewController() else {
        promise.reject("DIALOG_ERROR", "current activity is null")
        return
      }
      
      DispatchQueue.main.async {
        viewController.present(alertController, animated: true, completion: nil)
      }
      
    }

  }
}
