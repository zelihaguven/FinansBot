
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StockAnalysis from '@/components/StockAnalysis';
import CurrencyConverter from '@/components/CurrencyConverter';
import InvestmentAdvisor from '@/components/InvestmentAdvisor';
import AIStockPrediction from '@/components/AIStockPrediction';
import MarketSentimentAnalysis from '@/components/MarketSentimentAnalysis';
import { TrendingUp, DollarSign, Target, BarChart3, Brain, Heart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">FinansBot</h1>
              <p className="text-gray-600">Yatırım Danışmanınız ve Finansal Araçlarınız</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            <CardHeader>
              <CardTitle className="text-2xl">Hoş Geldiniz!</CardTitle>
              <CardDescription className="text-blue-100">
                Borsa İstanbul analizi, döviz çevrimi ve yatırım danışmanlığı için tek platformunuz
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Feature Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Hisse Senedi Analizi</CardTitle>
              <CardDescription>
                Gerçek zamanlı BIST verileri ve hesaplayıcı
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Döviz Çevirici</CardTitle>
              <CardDescription>
                Güncel kurlarla para birimi çevirme
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <Target className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Yatırım Danışmanı</CardTitle>
              <CardDescription>
                Kişiselleştirilmiş yatırım önerileri
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <Brain className="h-12 w-12 text-indigo-600 mx-auto mb-2" />
              <CardTitle className="text-lg">AI Fiyat Tahmini</CardTitle>
              <CardDescription>
                Makine öğrenimi ile fiyat analizi
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <Heart className="h-12 w-12 text-pink-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Piyasa Duyarlılığı</CardTitle>
              <CardDescription>
                AI destekli sentiment analizi
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Main Features Tabs */}
        <Tabs defaultValue="stocks" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="stocks" className="text-sm py-3">
              Hisse Analizi
            </TabsTrigger>
            <TabsTrigger value="currency" className="text-sm py-3">
              Döviz Çevirici
            </TabsTrigger>
            <TabsTrigger value="advisor" className="text-sm py-3">
              Yatırım Danışmanı
            </TabsTrigger>
            <TabsTrigger value="ai-prediction" className="text-sm py-3">
              AI Tahmin
            </TabsTrigger>
            <TabsTrigger value="sentiment" className="text-sm py-3">
              Piyasa Duyarlılığı
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stocks">
            <StockAnalysis />
          </TabsContent>

          <TabsContent value="currency">
            <CurrencyConverter />
          </TabsContent>

          <TabsContent value="advisor">
            <InvestmentAdvisor />
          </TabsContent>

          <TabsContent value="ai-prediction">
            <AIStockPrediction />
          </TabsContent>

          <TabsContent value="sentiment">
            <MarketSentimentAnalysis />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 FinansBot. Finansal kararlarınızda size yardımcı olmak için buradayız.</p>
            <p className="text-sm mt-2">
              * Bu platform yalnızca bilgilendirme amaçlıdır. Yatırım kararları alırken profesyonel danışmanlık alınız.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
