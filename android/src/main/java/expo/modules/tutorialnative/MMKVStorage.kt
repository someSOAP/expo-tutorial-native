package expo.modules.tutorialnative

import android.content.Context
import com.tencent.mmkv.MMKV
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MMKVStorage(context: Context) {
    private var mmkv: MMKV? = null

    init {
        CoroutineScope(Dispatchers.Main).launch {
            MMKV.initialize(context)
            mmkv = MMKV.defaultMMKV()
        }
    }


    fun get(key: String): String? {
        return mmkv?.getString(key, "")
    }

    fun set(key: String, value: String) {
        mmkv?.putString(key, value)
    }
}