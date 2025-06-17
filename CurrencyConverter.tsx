import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftRight, DollarSign } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('TRY');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amount, setAmount] = useState('100');
  const [result, setResult] = useState('');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const currencies = [
    { code: 'TRY', name: 'Türk Lirası', symbol: '₺' },
    { code: 'USD', name: 'Amerikan Doları', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'İngiliz Sterlini', symbol: '£' },
    { code: 'CHF', name: 'İsviçre Frangı', symbol: 'CHF' }
  ];

  const fetchExchangeRates = async () => {
    setLoading(true);
    try {
      // Gerçek döviz kurları için API çağrısı
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      
      if (data && data.rates) {
        const formattedRates: Record<string, Record<string, number>> = {
          'USD': {
            'TRY': data.rates.TRY || 32.15,
            'EUR': data.rates.EUR || 0.92,
            'GBP': data.rates.GBP || 0.81,
            'CHF': data.rates.CHF || 0.9,
            'USD': 1
          },
          'TRY': {
            'USD': 1 / (data.rates.TRY || 32.15),
            'EUR': (data.rates.EUR || 0.92) / (data.rates.TRY || 32.15),
            'GBP': (data.rates.GBP || 0.81) / (data.rates.TRY || 32.15),
            'CHF': (data.rates.CHF || 0.9) / (data.rates.TRY || 32.15),
            'TRY': 1
          },
          'EUR': {
            'USD': 1 / (data.rates.EUR || 0.92),
            'TRY': (data.rates.TRY || 32.15) / (data.rates.EUR || 0.92),
            'GBP': (data.rates.GBP || 0.81) / (data.rates.EUR || 0.92),
            'CHF': (data.rates.CHF || 0.9) / (data.rates.EUR || 0.92),
            'EUR': 1
          },
          'GBP': {
            'USD': 1 / (data.rates.GBP || 0.81),
            'TRY': (data.rates.TRY || 32.15) / (data.rates.GBP || 0.81),
            'EUR': (data.rates.EUR || 0.92) / (data.rates.GBP || 0.81),
            'CHF': (data.rates.CHF || 0.9) / (data.rates.GBP || 0.81),
            'GBP': 1
          },
          'CHF': {
            'USD': 1 / (data.rates.CHF || 0.9),
            'TRY': (data.rates.TRY || 32.15) / (data.rates.CHF || 0.9),
            'EUR': (data.rates.EUR || 0.92) / (data.rates.CHF || 0.9),
            'GBP': (data.rates.GBP || 0.81) / (data.rates.CHF || 0.9),
            'CHF': 1
          }
        };
        setExchangeRates(formattedRates);
        toast({
          title: "Kurlar Güncellendi",
          description: "Güncel döviz kurları başarıyla yüklendi.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Exchange rate fetch error:', error);
      // Hata durumunda demo veriler kullan
      const sampleRates = {
        'TRY': { 'USD': 0.031, 'EUR': 0.029, 'GBP': 0.025, 'CHF': 0.028, 'TRY': 1 },
        'USD': { 'TRY': 32.15, 'EUR': 0.92, 'GBP': 0.81, 'CHF': 0.9, 'USD': 1 },
        'EUR': { 'TRY': 35.01, 'USD': 1.09, 'GBP': 0.88, 'CHF': 0.98, 'EUR': 1 },
        'GBP': { 'TRY': 39.75, 'USD': 1.24, 'EUR': 1.14, 'CHF': 1.1, 'GBP': 1 },
        'CHF': { 'TRY': 36.00, 'USD': 1.11, 'EUR': 1.02, 'GBP': 0.91, 'CHF': 1 }
      };
      setExchangeRates(sampleRates);
      toast({
        title: "Demo Modu",
        description: "API erişimi olmadığı için örnek veriler kullanılıyor.",
        variant: "default"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const convertCurrency = () => {
    if (amount && fromCurrency && toCurrency && exchangeRates[fromCurrency]) {
      const rate = exchangeRates[fromCurrency][toCurrency] || 0;
      setExchangeRate(rate);
      const convertedAmount = parseFloat(amount) * rate;
      setResult(convertedAmount.toFixed(2));
    }
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  useEffect(() => {
    if (amount && fromCurrency && toCurrency && exchangeRates[fromCurrency]) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const getSymbol = (currencyCode: string) => {
    return currencies.find(c => c.code === currencyCode)?.symbol || '';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Döviz Çevirici</span>
            {loading && <span className="text-sm text-gray-500">(Güncel kurlar alınıyor...)</span>}
          </CardTitle>
          <CardDescription>
            Güncel kurlarla para birimi çevirme işlemleri yapın
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-end">
            <Button 
              onClick={fetchExchangeRates} 
              variant="outline" 
              size="sm"
              disabled={loading}
            >
              Kurları Yenile
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="space-y-2">
              <Label htmlFor="from-currency">Kaynak Para Birimi</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Para birimi seçin" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={swapCurrencies}
                className="bg-blue-50 hover:bg-blue-100"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-currency">Hedef Para Birimi</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Para birimi seçin" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Çevrilecek Miktar</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {getSymbol(fromCurrency)}
                </span>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100"
                  min="0"
                  step="0.01"
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Sonuç</Label>
              <div className="p-3 bg-gray-50 rounded-md border">
                {result ? (
                  <span className="text-2xl font-bold text-green-600">
                    {getSymbol(toCurrency)}{result}
                  </span>
                ) : (
                  <span className="text-gray-400">Çevrilecek miktar girin</span>
                )}
              </div>
            </div>
          </div>

          {exchangeRate > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Güncel Kur</p>
                  <p className="text-lg font-semibold">
                    1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Exchange Rates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Güncel Kurlar</CardTitle>
          <CardDescription>Ana para birimlerinin TRY karşısındaki kurları</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currencies.filter(c => c.code !== 'TRY').map((currency) => (
              <Card key={currency.code} className="bg-gray-50">
                <CardContent className="p-4 text-center">
                  <h3 className="font-bold text-lg">
                    {currency.symbol} {currency.code}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{currency.name}</p>
                  <p className="text-xl font-bold text-blue-600">
                    ₺{exchangeRates[currency.code] && exchangeRates[currency.code]['TRY'] ? 
                      exchangeRates[currency.code]['TRY'].toFixed(2) : 
                      '...'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrencyConverter;


