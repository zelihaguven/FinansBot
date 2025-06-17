import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Calculator, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useRealTimeStocks } from '@/hooks/useRealTimeStocks';

const StockAnalysis = () => {
  const [selectedStock, setSelectedStock] = useState('');
  const [amount, setAmount] = useState('100');
  const [stockPrice, setStockPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const symbols = ['THYAO', 'AKBNK', 'TUPRS', 'BIMAS', 'KRDMD', 'EREGL'];
  const { stocks, isConnected } = useRealTimeStocks(symbols, true); // Gerçek veri modu aktif

  const borsaStocks = [
    { code: 'THYAO', name: 'Türk Hava Yolları', price: stocks['THYAO']?.price || 261.75, change: stocks['THYAO']?.changePercent || -1.32 },
    { code: 'AKBNK', name: 'Akbank', price: stocks['AKBNK']?.price || 58.60, change: stocks['AKBNK']?.changePercent || -2.17 },
    { code: 'TUPRS', name: 'Tüpraş', price: stocks['TUPRS']?.price || 134.80, change: stocks['TUPRS']?.changePercent || 3.85 },
    { code: 'BIMAS', name: 'BİM', price: stocks['BIMAS']?.price || 503.00, change: stocks['BIMAS']?.changePercent || 1.31 },
    { code: 'KRDMD', name: 'Kardemir', price: stocks['KRDMD']?.price || 22.32, change: stocks['KRDMD']?.changePercent || 0.81 },
    { code: 'EREGL', name: 'Ereğli Demir Çelik', price: stocks['EREGL']?.price || 26.60, change: stocks['EREGL']?.changePercent || 2.70 },
    { code: 'ASELS', name: 'Aselsan', price: stocks['ASELS']?.price || 144.50, change: stocks['ASELS']?.changePercent || 4.03 },
    { code: 'ASTOR', name: 'Astor Enerji', price: stocks['ASTOR']?.price || 90.20, change: stocks['ASTOR']?.changePercent || -1.26 },
    { code: 'GARAN', name: 'Garanti Bankası', price: stocks['GARAN']?.price || 116.40, change: stocks['GARAN']?.changePercent || 0.50 },
    { code: 'ISCTR', name: 'İş Bankası C', price: stocks['ISCTR']?.price || 12.50, change: stocks['ISCTR']?.changePercent || 1.20 },
    { code: 'KCHOL', name: 'Koç Holding', price: stocks['KCHOL']?.price || 146.70, change: stocks['KCHOL']?.changePercent || 0.07 },
    { code: 'SASA', name: 'Sasa Polyester', price: stocks['SASA']?.price || 45.00, change: stocks['SASA']?.changePercent || -0.80 },
    { code: 'SISE', name: 'Şişecam', price: stocks['SISE']?.price || 50.00, change: stocks['SISE']?.changePercent || 0.30 },
    { code: 'TCELL', name: 'Turkcell', price: stocks['TCELL']?.price || 70.00, change: stocks['TCELL']?.changePercent || -0.50 }
  ];

  useEffect(() => {
    // Gerçek zamanlı veriler kullanıldığı için fetchStockData'ya gerek yok
    if (selectedStock && stocks[selectedStock]) {
      setStockPrice(stocks[selectedStock].price);
    }
  }, [stocks, selectedStock]);

  const handleStockSelect = (stockCode: string) => {
    const stock = borsaStocks.find(s => s.code === stockCode);
    if (stock) {
      setSelectedStock(stockCode);
      setStockPrice(stock.price);
    }
  };

  const calculateShares = () => {
    if (stockPrice > 0 && amount) {
      return Math.floor(parseFloat(amount) / stockPrice);
    }
    return 0;
  };

  const calculateRemainder = () => {
    if (stockPrice > 0 && amount) {
      return (parseFloat(amount) % stockPrice).toFixed(2);
    }
    return '0.00';
  };

  const selectedStockData = borsaStocks.find(s => s.code === selectedStock);

  return (
    <div className="space-y-6">
      {/* Bağlantı Durumu */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>Gerçek Zamanlı Borsa Verileri</span>
            </CardTitle>
            <Badge variant={isConnected ? "default" : "destructive"} className="flex items-center gap-1">
              {isConnected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
              {isConnected ? "Bağlı" : "Bağlantı Kesildi"}
            </Badge>
          </div>
          <CardDescription>
            Elinizdeki para ile kaç adet hisse senedi alabileceğinizi hesaplayın
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Hisse Senedi Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {borsaStocks.map(stock => {
          const isPositive = stock.change >= 0
          const stockData = stocks[stock.code]
          
          return (
            <Card key={stock.code} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleStockSelect(stock.code)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{stock.code}</h3>
                  {isPositive ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-gray-600">{stock.name}</div>
                  <div className="text-2xl font-bold">
                    ₺{stock.price.toFixed(2)}
                  </div>
                  <div className={`text-sm flex items-center gap-1 ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <span>{isPositive ? '+' : ''}{stock.change.toFixed(2)}%</span>
                  </div>
                  {stockData?.timestamp && (
                    <div className="text-xs text-gray-500">
                      Son güncelleme: {new Date(stockData.timestamp).toLocaleTimeString('tr-TR')}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Hesaplama Bölümü */}
      {selectedStockData && (
        <Card>
          <CardHeader>
            <CardTitle>Yatırım Hesaplayıcısı - {selectedStockData.code}</CardTitle>
            <CardDescription>{selectedStockData.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="amount">Yatırım Miktarı (TL)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Mevcut Fiyat</div>
                <div className="text-2xl font-bold">₺{selectedStockData.price.toFixed(2)}</div>
                <div className={`text-sm ${selectedStockData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedStockData.change >= 0 ? '+' : ''}{selectedStockData.change.toFixed(2)}%
                </div>
              </div>
            </div>

            {amount && parseFloat(amount) > 0 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Hesaplama Sonucu</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Alınabilecek Hisse Adedi</div>
                    <div className="text-xl font-bold text-blue-600">{calculateShares()} adet</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Toplam Maliyet</div>
                    <div className="text-xl font-bold">₺{(calculateShares() * selectedStockData.price).toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Kalan Para</div>
                    <div className="text-xl font-bold text-green-600">₺{calculateRemainder()}</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StockAnalysis;

