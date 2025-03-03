package expo.modules.tutorialnative

import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoTutorialNativeModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoTutorialNative')` in JavaScript.
    Name("ExpoTutorialNative")

    AsyncFunction("dialog") { params: DialogParams, promise: Promise ->

      val activity = appContext.activityProvider?.currentActivity

      if(activity == null) {
        promise.reject("DIALOG_ERROR", "current activity is null", null)
        return@AsyncFunction
      }

      showDialog(activity, params, promise)
    }

  }
}
