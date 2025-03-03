package expo.modules.tutorialnative

import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoTutorialNativeModule : Module() {

  private val simpleWebSocket = SimpleWebSocket()

  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoTutorialNative')` in JavaScript.
    Name("ExpoTutorialNative")

    Events("onMessage")

    AsyncFunction("connect") { url: String, promise: Promise ->
      simpleWebSocket.connect(
        url,
        onConnect = {
          promise.resolve()
        },
        onError = { reason ->
          promise.reject("ERROR", reason, null)
        },
        onMessage = { message ->
          sendEvent("onMessage", mapOf(
            "message" to message
          ))
        }
      )
    }

    Function("disconnect") {
      simpleWebSocket.disconnect()
    }

    AsyncFunction("send") { message: String, promise: Promise ->
      simpleWebSocket.sendMessage(
        message,
        onError = { reason: String ->
          promise.reject("ERROR", reason, null)
        },
        onSuccess = {
          promise.resolve()
        }
      )
    }

  }
}
