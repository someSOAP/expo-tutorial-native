import MMKV

class MMKVStorage {

  var mmkv: MMKV?

  init() {
    DispatchQueue.main.async {
      MMKV.initialize(rootDir: nil)
      self.mmkv = MMKV.default()
    }
  }


  func set(key: String, value: String) {
    mmkv?.set(value, forKey: key)
  }


  func get(key: String) -> String? {
    mmkv?.string(forKey: key, defaultValue: "")
  }

}
