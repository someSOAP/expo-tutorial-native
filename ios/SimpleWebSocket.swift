import Foundation
import Starscream

class SimpleWebSocket {
  
  private var socket: WebSocket?;
  
  func connect(
    url: String,
    onConnect: @escaping () -> Void,
    onError: @escaping (String) -> Void,
    onMessage: @escaping (String) -> Void
  ) {
    
    guard let urlObj = URL(string: url) else {
      onError("ERROR - Invalid URL")
      return
    }
    
    let request = URLRequest(url: urlObj)
    let ws = WebSocket(request: request)
    
    ws.onEvent = { event in
      switch event {
      case .connected(_):
        onConnect()
        
      case .text(let string):
        print("Received text: \(string)")
        onMessage(string)
        
      case .disconnected(let reason, let code):
        print("WebSocket connection closed: \(reason), code: \(code)")
        
      case .error(let error):
        onError(
          "WebSocket connection failed: \(error?.localizedDescription ?? "ERROR")"
        )
        
      default:
        break
      }
      
    }
    
    ws.connect()
    
    socket = ws
    
  }
  
  func disconnect() {
    socket?.disconnect()
    socket = nil
  }
  
  func sendMessage(
    message: String,
    onError: (String) -> Void,
    onSuccess: @escaping () -> Void
  ) {
    
    guard let socket = self.socket else {
      onError("WS Connection must be established")
      return
    }
  
    socket.write(
      string: message,
      completion: {
        onSuccess()
      }
    )

  }
  
  
}
