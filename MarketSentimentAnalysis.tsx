import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface SentimentData {
  symbol: string
  sentiment_score: number
  sentiment_label: string
  news_count: number
  social_mentions: number
  last_updated: string
}

const MarketSentimentAnalysis = () => {
  const [sentiments, setSentiments] = useState<SentimentData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Demo veriler - gerçek uygulamada API'den gelecek
    const demoSentiments: SentimentData[] = [
      {
        symbol: 'THYAO',
        sentiment_score: 0.75,
        sentiment_label: 'Pozitif',
        news_count: 12,
        social_mentions: 245,
        last_updated: new Date().toISOString()
      },
      {
        symbol: 'AKBNK',
        sentiment_score: 0.45,
        sentiment_label: 'Nötr',
        news_count: 8,
        social_mentions: 156,
        last_updated: new Date().toISOString()
      },
      {
        symbol: 'TUPRS',
        sentiment_score: 0.85,
        sentiment_label: 'Çok Pozitif',
        news_count: 15,
        social_mentions: 312,
        last_updated: new Date().toISOString()
      },
      {
        symbol: 'BIMAS',
        sentiment_score: 0.65,
        sentiment_label: 'Pozitif',
        news_count: 6,
        social_mentions: 89,
        last_updated: new Date().toISOString()
      },
      {
        symbol: 'KRDMD',
        sentiment_score: 0.25,
        sentiment_label: 'Negatif',
        news_count: 4,
        social_mentions: 67,
        last_updated: new Date().toISOString()
      },
      {
        symbol: 'EREGL',
        sentiment_score: 0.55,
        sentiment_label: 'Nötr',
        news_count: 9,
        social_mentions: 134,
        last_updated: new Date().toISOString()
      }
    ]
    
    setTimeout(() => {
      setSentiments(demoSentiments)
      setLoading(false)
    }, 1000)
  }, [])

  const getSentimentIcon = (score: number) => {
    if (score >= 0.7) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (score <= 0.3) return <TrendingDown className="h-4 w-4 text-red-600" />
    return <Minus className="h-4 w-4 text-yellow-600" />
  }

  const getSentimentColor = (score: number) => {
    if (score >= 0.7) return 'bg-green-500'
    if (score <= 0.3) return 'bg-red-500'
    return 'bg-yellow-500'
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Piyasa Duyarlılık Analizi</CardTitle>
          <CardDescription>Yükleniyor...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-600" />
            Piyasa Duyarlılık Analizi
          </CardTitle>
          <CardDescription>
            Haber ve sosyal medya verilerine dayalı AI duyarlılık analizi
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sentiments.map(sentiment => (
          <Card key={sentiment.symbol}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{sentiment.symbol}</h3>
                <Badge variant="outline" className="flex items-center gap-1">
                  {getSentimentIcon(sentiment.sentiment_score)}
                  {sentiment.sentiment_label}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Duyarlılık Skoru</span>
                    <span>{(sentiment.sentiment_score * 100).toFixed(0)}%</span>
                  </div>
                  <Progress 
                    value={sentiment.sentiment_score * 100} 
                    className="h-2"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3 text-blue-500" />
                    <span>{sentiment.news_count} haber</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3 text-pink-500" />
                    <span>{sentiment.social_mentions} mention</span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  Son güncelleme: {new Date(sentiment.last_updated).toLocaleTimeString('tr-TR')}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MarketSentimentAnalysis

