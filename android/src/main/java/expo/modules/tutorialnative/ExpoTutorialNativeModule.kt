package expo.modules.tutorialnative

import android.app.AlertDialog
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

    AsyncFunction("dialog") { params: Map<String, Any>, promise: Promise ->

      val titleParam = params["title"]
      val messageParam = params["message"]

      val title = if(titleParam is String) titleParam else "Alert"

      val message = if(messageParam is String) messageParam else {
        promise.reject("DIALOG_ERROR", "Message is not a string", null)
        return@AsyncFunction
      }

      val activity = appContext.activityProvider?.currentActivity

      if(activity == null) {
        promise.reject("DIALOG_ERROR", "current activity is null", null)
        return@AsyncFunction
      }

      val alertBuilder = AlertDialog.Builder(activity)

      alertBuilder.setTitle(title)
      alertBuilder.setMessage(message)
      alertBuilder.setCancelable(false)

      alertBuilder.setPositiveButton("Yes") { dialog, which ->
        promise.resolve(true)
      }

      alertBuilder.setNegativeButton("No") { dialog, which ->
        promise.resolve(false)
      }

      val dialog = alertBuilder.create()

      dialog.show()

    }

  }
}
