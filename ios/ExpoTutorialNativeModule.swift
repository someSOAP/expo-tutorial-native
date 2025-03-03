import ExpoModulesCore

public class ExpoTutorialNativeModule: Module {
  
  let simpleWebSocket = SimpleWebSocket()
  
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoTutorialNative')` in JavaScript.
    Name("ExpoTutorialNative")

    Events("onMessage")
    
    AsyncFunction("connect") { (url: String, promise: Promise) in
      simpleWebSocket.connect(
        url: url,
        onConnect: {
          promise.resolve()
        },
        onError: { reason in
          promise.reject("ERROR", reason)
        },
        onMessage: { message in
          self.sendEvent("onMessage", [
            "message": message
          ])
        }
      )
    }
    
    Function("disconnect") {
      simpleWebSocket.disconnect()
    }
    
    AsyncFunction("send") { (message: String, promise: Promise) in
      simpleWebSocket.sendMessage(
        message: message,
        onError: { reason in
          promise.reject("ERROR", reason)
        },
        onSuccess: {
          promise.resolve()
        }
      )
    }

  }
}
