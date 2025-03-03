package expo.modules.tutorialnative

import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import okhttp3.WebSocket
import okhttp3.WebSocketListener

class SimpleWebSocket {
    private val client = OkHttpClient()
    private var webSocket: WebSocket? = null

    fun connect(
        url: String,
        onConnect: () -> Unit,
        onError: (reason: String) -> Unit,
        onMessage: (message: String) -> Unit
    ) {

        val request = Request.Builder().url(url).build()

        webSocket = client.newWebSocket(request, object : WebSocketListener() {
            override fun onOpen(webSocket: WebSocket, response: Response) {
                onConnect()
            }

            override fun onMessage(webSocket: WebSocket, text: String) {
                onMessage(text)
            }

            override fun onClosed(webSocket: WebSocket, code: Int, reason: String) {
                println("WebSocket connection closed: ${reason}, code: ${code}")
            }

            override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
                onError("WebSocket connection failed: ${t.message}")
            }
        })
    }

    fun disconnect() {
        webSocket?.cancel()
        webSocket = null
    }

    fun sendMessage(
        message: String,
        onError: (reason: String) -> Unit,
        onSuccess: () -> Unit
    ) {

        val ws = webSocket

        if(ws == null) {
            onError("WS Connection must be established")
        } else {
            ws.send(message)
            onSuccess()
        }

    }
}
