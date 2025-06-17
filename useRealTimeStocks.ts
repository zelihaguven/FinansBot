import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface StockData {
  symbol: string
  price: number
  change: number
  changePercent: number
  timestamp: number
}

export const useRealTimeStocks = (symbols: string[], useRealData: boolean = false) => {
  const [stocks, setStocks] = useState<Record<string, StockData>>({})
  const [isConnected, setIsConnected] = useState(false)

  const fetchRealTimeData = async () => {
    if (!useRealData) {
      setDemoData()
      return
    }

    try {
      // Her sembol için gerçek veri çek
      const stockPromises = symbols.map(async (symbol) => {
        const { data, error } = await supabase.functions.invoke("real-time-stock-data", {
          body: { symbol: symbol + ".IS" } // BIST için .IS eki
        })
        
        if (error) throw error
        return data
      })

      const results = await Promise.all(stockPromises)
      
      const newStocks: Record<string, StockData> = {}
      results.forEach((result) => {
        if (result && result.symbol) {
          const cleanSymbol = result.symbol.replace(".IS", "")
          newStocks[cleanSymbol] = {
            symbol: cleanSymbol,
            price: result.price || 0,
            change: result.change || 0,
            changePercent: result.changePercent || 0,
            timestamp: result.timestamp || Date.now()
          }
        }
      })

      setStocks(newStocks)
      setIsConnected(true)
    } catch (error) {
      console.error("Real-time data fetch error:", error)
      // Hata durumunda demo verilere geri dön
      setDemoData()
    }
  }

  const setDemoData = () => {
    // Gerçek BIST fiyatlarına yakın demo veriler
    const demoStocks: Record<string, StockData> = {
      "THYAO": {
        symbol: "THYAO",
        price: 261.75 + (Math.random() - 0.5) * 5, // Gerçek fiyat yaklaşık 261.75
        change: (Math.random() - 0.5) * 3,
        changePercent: (Math.random() - 0.5) * 2,
        timestamp: Date.now()
      },
      "AKBNK": {
        symbol: "AKBNK",
        price: 58.60 + (Math.random() - 0.5) * 2, // Gerçek fiyat yaklaşık 58.60
        change: (Math.random() - 0.5) * 2,
        changePercent: (Math.random() - 0.5) * 2,
        timestamp: Date.now()
      },
      "TUPRS": {
        symbol: "TUPRS",
        price: 134.80 + (Math.random() - 0.5) * 3, // Gerçek fiyat yaklaşık 134.80
        change: (Math.random() - 0.5) * 3,
        changePercent: (Math.random() - 0.5) * 2.5,
        timestamp: Date.now()
      },
      "BIMAS": {
        symbol: "BIMAS",
        price: 503.00 + (Math.random() - 0.5) * 10, // Gerçek fiyat yaklaşık 503.00
        change: (Math.random() - 0.5) * 5,
        changePercent: (Math.random() - 0.5) * 2,
        timestamp: Date.now()
      },
      "KRDMD": {
        symbol: "KRDMD",
        price: 22.32 + (Math.random() - 0.5) * 1, // Gerçek fiyat yaklaşık 22.32
        change: (Math.random() - 0.5) * 0.5,
        changePercent: (Math.random() - 0.5) * 3,
        timestamp: Date.now()
      },
      "EREGL": {
        symbol: "EREGL",
        price: 26.60 + (Math.random() - 0.5) * 1, // Gerçek fiyat yaklaşık 26.60
        change: (Math.random() - 0.5) * 1,
        changePercent: (Math.random() - 0.5) * 2.5,
        timestamp: Date.now()
      },
      "ASELS": {
        symbol: "ASELS",
        price: 144.50 + (Math.random() - 0.5) * 2, 
        change: (Math.random() - 0.5) * 1,
        changePercent: (Math.random() - 0.5) * 1.5,
        timestamp: Date.now()
      },
      "ASTOR": {
        symbol: "ASTOR",
        price: 90.20 + (Math.random() - 0.5) * 2, 
        change: (Math.random() - 0.5) * 1,
        changePercent: (Math.random() - 0.5) * 1.5,
        timestamp: Date.now()
      },
      "GARAN": {
        symbol: "GARAN",
        price: 116.40 + (Math.random() - 0.5) * 2, 
        change: (Math.random() - 0.5) * 1,
        changePercent: (Math.random() - 0.5) * 1.5,
        timestamp: Date.now()
      },
      "ISCTR": {
        symbol: "ISCTR",
        price: 12.50 + (Math.random() - 0.5) * 0.5, 
        change: (Math.random() - 0.5) * 0.2,
        changePercent: (Math.random() - 0.5) * 1,
        timestamp: Date.now()
      },
      "KCHOL": {
        symbol: "KCHOL",
        price: 146.70 + (Math.random() - 0.5) * 2, 
        change: (Math.random() - 0.5) * 1,
        changePercent: (Math.random() - 0.5) * 1.5,
        timestamp: Date.now()
      },
      "SASA": {
        symbol: "SASA",
        price: 45.00 + (Math.random() - 0.5) * 1, 
        change: (Math.random() - 0.5) * 0.5,
        changePercent: (Math.random() - 0.5) * 1.5,
        timestamp: Date.now()
      },
      "SISE": {
        symbol: "SISE",
        price: 50.00 + (Math.random() - 0.5) * 1, 
        change: (Math.random() - 0.5) * 0.5,
        changePercent: (Math.random() - 0.5) * 1.5,
        timestamp: Date.now()
      },
      "TCELL": {
        symbol: "TCELL",
        price: 70.00 + (Math.random() - 0.5) * 1, 
        change: (Math.random() - 0.5) * 0.5,
        changePercent: (Math.random() - 0.5) * 1.5,
        timestamp: Date.now()
      },
      "PGSUS": {
        symbol: "PGSUS",
        price: 800.00 + (Math.random() - 0.5) * 10, 
        change: (Math.random() - 0.5) * 5,
        changePercent: (Math.random() - 0.5) * 2,
        timestamp: Date.now()
      },
      "KOZAL": {
        symbol: "KOZAL",
        price: 23.90 + (Math.random() - 0.5) * 1, 
        change: (Math.random() - 0.5) * 0.5,
        changePercent: (Math.random() - 0.5) * 1.5,
        timestamp: Date.now()
      },
      "PETKM": {
        symbol: "PETKM",
        price: 20.00 + (Math.random() - 0.5) * 1, 
        change: (Math.random() - 0.5) * 0.5,
        changePercent: (Math.random() - 0.5) * 1.5,
        timestamp: Date.now()
      },
      "SAHOL": {
        symbol: "SAHOL",
        price: 80.00 + (Math.random() - 0.5) * 2, 
        change: (Math.random() - 0.5) * 1,
        changePercent: (Math.random() - 0.5) * 1.5,
        timestamp: Date.now()
      },
      "TOASO": {
        symbol: "TOASO",
        price: 300.00 + (Math.random() - 0.5) * 5, 
        change: (Math.random() - 0.5) * 2,
        changePercent: (Math.random() - 0.5) * 1.5,
        timestamp: Date.now()
      }
    }

    setStocks(demoStocks)
    setIsConnected(true)
  }

  useEffect(() => {
    fetchRealTimeData()
  }, [symbols, useRealData])

  return { stocks, isConnected, refresh: fetchRealTimeData }
}

