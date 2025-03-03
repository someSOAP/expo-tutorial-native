import ExpoModulesCore

struct DialogParams: Record {
  @Field
  var title: String = "Alert"

  @Field
  var message: String? = nil
}

func showDialog(
  viewController: UIViewController,
  params: DialogParams,
  promise: Promise
) {

  guard let message: String = params.message else {
    promise.reject("DIALOG_ERROR", "Message is not a string")
    return
  }

  let alertController = UIAlertController(title: params.title, message: message, preferredStyle: .alert)

  let yesAction = UIAlertAction(title: "Yes", style: .default) { (action) in
    promise.resolve(true)
  }

  let noAction = UIAlertAction(title: "No", style: .destructive) { (action) in
    promise.resolve(false)
  }

  alertController.addAction(noAction)
  alertController.addAction(yesAction)

  DispatchQueue.main.async {
    viewController.present(alertController, animated: true, completion: nil)
  }
}
