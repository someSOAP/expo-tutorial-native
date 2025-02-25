package expo.modules.tutorialnative

import expo.modules.kotlin.jni.JavaScriptFunction
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

    Function("add") { a: Double, b: Double ->
      val result = a + b

      return@Function result
    }

    Function("sum") { arr: List<Double> ->
      var result = 0.0

      for ( i in arr) {
        result += i
      }

      return@Function result
    }

    Function("reduce") { arr: List<Double>, cb: JavaScriptFunction<Double> ->
      if(arr.isEmpty()) {
        return@Function 0.0
      }

      arr.reduce { result, item -> cb(result, item) }
    }

  }
}
