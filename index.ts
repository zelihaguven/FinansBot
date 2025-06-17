
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const upgrade = req.headers.get("upgrade") || ""
  if (upgrade.toLowerCase() != "websocket") {
    return new Response("request isn't trying to upgrade to websocket.")
  }
  
  const { socket, response } = Deno.upgradeWebSocket(req)
  
  socket.addEventListener("open", () => {
    console.log("WebSocket connection opened")
    
    // Finnhub WebSocket bağlantısı
    const finnhubWs = new WebSocket("wss://ws.finnhub.io?token=YOUR_API_KEY")
    
    finnhubWs.addEventListener("open", () => {
      // BIST hisselerini subscribe et
      const symbols = ["THYAO.IS", "AKBNK.IS", "TUPRS.IS", "BIMAS.IS"]
      symbols.forEach(symbol => {
        finnhubWs.send(JSON.stringify({"type":"subscribe","symbol": symbol}))
      })
    })
    
    finnhubWs.addEventListener("message", (event) => {
      const data = JSON.parse(event.data)
      // Frontend'e veri gönder
      socket.send(JSON.stringify(data))
    })
  })
  
  return response
})

