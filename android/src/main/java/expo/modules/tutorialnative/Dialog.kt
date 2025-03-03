package expo.modules.tutorialnative

import android.app.Activity
import android.app.AlertDialog
import expo.modules.kotlin.Promise
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class DialogParams : Record {
    @Field
    val title: String = "Alert"

    @Field
    val message: String? = null
}

fun showDialog(
    activity: Activity,
    params: DialogParams,
    promise: Promise
) {

    val message = if(params.message is String) params.message else {
        promise.reject("DIALOG_ERROR", "Message is not a string", null)
        return
    }

    val alertBuilder = AlertDialog.Builder(activity)

    alertBuilder.setTitle(params.title)
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