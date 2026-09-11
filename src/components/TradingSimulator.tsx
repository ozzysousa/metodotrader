import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUp, ArrowDown, Clock } from "lucide-react";

type AssetId = "EURUSD" | "BTCUSD" | "GBPUSD";

interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
}

interface TradeRow {
  id: number;
  asset: string;
  direction: "CALL" | "PUT";
  entry: number;
  amount: number;
  result: number; // lucro positivo ou perda negativa
}

const ASSETS: Record<AssetId, { label: string; base: number; volatility: number; decimals: number }> = {
  EURUSD: { label: "EUR/USD (OTC)", base: 1.0942, volatility: 0.0005, decimals: 5 },
  BTCUSD: { label: "BTC/USD (Cripto)", base: 68420.5, volatility: 0.002, decimals: 2 },
  GBPUSD: { label: "GBP/USD (Forex)", base: 1.2715, volatility: 0.0005, decimals: 5 },
};

const PAYOUT = 0.87;

const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function buildInitialCandles(asset: AssetId): Candle[] {
  const cfg = ASSETS[asset];
  const candles: Candle[] = [];
  let current = cfg.base;
  for (let i = 0; i < 40; i++) {
    const vol = current * cfg.volatility;
    const open = current + (Math.random() - 0.5) * vol;
    const close = open + (Math.random() - 0.5) * vol;
    const high = Math.max(open, close) + Math.random() * vol * 0.5;
    const low = Math.min(open, close) - Math.random() * vol * 0.5;
    candles.push({ open, close, high, low });
    current = close;
  }
  return candles;
}

const TradingSimulator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const candlesRef = useRef<Candle[]>(buildInitialCandles("EURUSD"));
  const assetRef = useRef<AssetId>("EURUSD");
  const smaRef = useRef(false);

  const [asset, setAsset] = useState<AssetId>("EURUSD");
  const [price, setPrice] = useState(ASSETS.EURUSD.base.toFixed(5));
  const [smaActive, setSmaActive] = useState(false);
  const [balance, setBalance] = useState(15420);
  const [amount, setAmount] = useState(100);
  const [trading, setTrading] = useState(false);
  const [history, setHistory] = useState<TradeRow[]>([]);
  const [toast, setToast] = useState<{ icon: string; msg: string; tone: "win" | "loss" | "info" } | null>(null);
  const tradeIdRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const candles = candlesRef.current;
    if (!candles.length) return;

    const cssWidth = canvas.width / 2;
    const cssHeight = canvas.height / 2;
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    const numCandles = candles.length;
    const paddingRight = 60;
    const candleWidth = (cssWidth - paddingRight) / numCandles;

    let minVal = Math.min(...candles.map((c) => c.low));
    let maxVal = Math.max(...candles.map((c) => c.high));
    const spreadPad = (maxVal - minVal) * 0.1;
    minVal -= spreadPad;
    maxVal += spreadPad;
    const spread = maxVal - minVal;

    const getY = (val: number) => cssHeight - ((val - minVal) / spread) * cssHeight;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      const y = (cssHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(cssWidth, y);
      ctx.stroke();
    }

    for (let i = 0; i < numCandles; i++) {
      const c = candles[i];
      const x = i * candleWidth + candleWidth * 0.1;
      const isGreen = c.close >= c.open;
      const color = isGreen ? "#10b981" : "#f43f5e";
      ctx.strokeStyle = color;
      ctx.fillStyle = color;

      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const centerX = x + candleWidth * 0.4;
      ctx.moveTo(centerX, getY(c.high));
      ctx.lineTo(centerX, getY(c.low));
      ctx.stroke();

      const rectY = getY(Math.max(c.open, c.close));
      const rectH = Math.max(1, Math.abs(getY(c.open) - getY(c.close)));
      ctx.fillRect(x, rectY, candleWidth * 0.8, rectH);
    }

    if (smaRef.current) {
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 4; i < numCandles; i++) {
        let sum = 0;
        for (let j = 0; j < 5; j++) sum += candles[i - j].close;
        const avg = sum / 5;
        const x = i * candleWidth + candleWidth * 0.5;
        if (i === 4) ctx.moveTo(x, getY(avg));
        else ctx.lineTo(x, getY(avg));
      }
      ctx.stroke();
    }
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    canvas.getContext("2d")?.scale(2, 2);
    draw();
  }, [draw]);

  // Loop de animação: flutua o preço da última vela a cada 800ms
  useEffect(() => {
    const interval = setInterval(() => {
      const candles = candlesRef.current;
      if (!candles.length) return;
      const last = candles[candles.length - 1];
      const cfg = ASSETS[assetRef.current];
      const vol = last.close * (assetRef.current === "BTCUSD" ? 0.0005 : 0.0001);
      last.close += (Math.random() - 0.5) * vol;
      if (last.close > last.high) last.high = last.close;
      if (last.close < last.low) last.low = last.close;
      draw();
      setPrice(last.close.toFixed(cfg.decimals));
    }, 800);
    return () => clearInterval(interval);
  }, [draw]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  const showToast = (icon: string, msg: string, tone: "win" | "loss" | "info") => {
    setToast({ icon, msg, tone });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAssetChange = (value: AssetId) => {
    assetRef.current = value;
    setAsset(value);
    candlesRef.current = buildInitialCandles(value);
    setHistory([]);
    setPrice(ASSETS[value].base.toFixed(ASSETS[value].decimals));
    draw();
  };

  const toggleSma = () => {
    smaRef.current = !smaRef.current;
    setSmaActive(smaRef.current);
    draw();
  };

  const executeTrade = (direction: "CALL" | "PUT") => {
    if (trading) return;
    if (isNaN(amount) || amount <= 0) {
      showToast("!", "Insira um valor de investimento válido.", "loss");
      return;
    }
    if (amount > balance) {
      showToast("!", "Saldo insuficiente para esta operação.", "loss");
      return;
    }

    const entry = candlesRef.current[candlesRef.current.length - 1].close;
    setBalance((b) => b - amount);
    setTrading(true);
    showToast("✓", `Ordem de ${direction === "CALL" ? "COMPRA" : "VENDA"} aberta em ${asset}!`, "info");

    setTimeout(() => {
      const exit = candlesRef.current[candlesRef.current.length - 1].close;
      const won = direction === "CALL" ? exit > entry : exit < entry;
      const profit = won ? amount * PAYOUT : 0;

      if (won) {
        setBalance((b) => b + amount + profit);
        showToast("★", `WIN! Lucro de ${formatBRL(profit)}`, "win");
      } else {
        showToast("✕", "LOSS. Operação finalizada sem lucro.", "loss");
      }

      setHistory((h) => [
        {
          id: ++tradeIdRef.current,
          asset,
          direction,
          entry,
          amount,
          result: won ? profit : -amount,
        },
        ...h,
      ]);
      setTrading(false);
    }, 4000);
  };

  return (
    <section
      aria-label="Simulador de operações"
      className="container mx-auto px-4 lg:px-8 py-12 md:py-16 space-y-8"
    >
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-sm font-bold text-primary tracking-widest uppercase">
          Teste a metodologia agora
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-foreground">
          Simulador de Prática em Tempo Real
        </h2>
        <p className="text-muted-foreground">
          Sinta na pele como é analisar o gráfico e executar ordens. O mercado abaixo
          simula a movimentação real de ativos financeiros — sem risco para o seu bolso.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-card p-4 rounded-2xl border border-border">
        <select
          aria-label="Selecionar ativo"
          value={asset}
          onChange={(e) => handleAssetChange(e.target.value as AssetId)}
          className="w-full sm:w-auto bg-background border border-input px-5 py-3 rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary transition-colors"
        >
          {Object.entries(ASSETS).map(([id, cfg]) => (
            <option key={id} value={id}>
              {cfg.label}
            </option>
          ))}
        </select>
        <div className="bg-background border border-input px-5 py-3 rounded-xl text-sm font-bold text-foreground flex items-center justify-between w-full sm:w-auto gap-4">
          <span>Saldo Demo:</span>
          <span className="text-primary font-mono text-base">{formatBRL(balance)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico */}
        <div className="lg:col-span-2 bg-card p-5 rounded-2xl border border-border flex flex-col space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              <span className="text-xs font-bold text-muted-foreground tracking-wider uppercase">
                Mercado aberto simulado
              </span>
            </div>
            <button
              onClick={toggleSma}
              className={`px-4 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                smaActive
                  ? "bg-primary/10 border-primary/50 text-primary"
                  : "bg-secondary border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {smaActive ? "Desativar SMA" : "Ativar SMA"}
            </button>
          </div>

          <div className="relative w-full h-[400px] bg-background rounded-2xl overflow-hidden border border-border">
            <canvas ref={canvasRef} className="w-full h-full block" aria-label="Gráfico de candles simulado" />
            <div className="absolute top-4 left-4 pointer-events-none bg-card/90 backdrop-blur border border-border px-4 py-2 rounded-xl text-xs font-semibold text-foreground shadow-lg">
              Preço: <span className="font-mono text-primary text-sm ml-1">{price}</span>
            </div>
          </div>
        </div>

        {/* Painel de Operações */}
        <div className="bg-card p-6 md:p-8 rounded-2xl border border-border flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-foreground border-b border-border pb-4">
              Painel de Operações
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="trade-amount" className="text-xs text-muted-foreground font-bold block mb-2 uppercase tracking-wider">
                  Valor do investimento
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-muted-foreground font-bold text-base">R$</span>
                  <input
                    id="trade-amount"
                    type="number"
                    min={1}
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    className="w-full bg-background border border-input py-3.5 pl-12 pr-4 rounded-xl text-base font-bold text-foreground focus:outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>
              <div className="p-4 bg-primary/10 rounded-xl flex justify-between items-center border border-primary/20">
                <span className="text-sm text-foreground font-medium">Payout atual:</span>
                <span className="text-primary font-black text-lg">87%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <button
              onClick={() => executeTrade("CALL")}
              disabled={trading}
              className="py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold rounded-2xl transition-all text-center flex flex-col items-center justify-center gap-1.5 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <ArrowUp className="w-7 h-7" strokeWidth={3} aria-hidden="true" />
              <span className="tracking-wide">COMPRA</span>
            </button>
            <button
              onClick={() => executeTrade("PUT")}
              disabled={trading}
              className="py-5 bg-destructive hover:bg-destructive/90 text-destructive-foreground font-extrabold rounded-2xl transition-all text-center flex flex-col items-center justify-center gap-1.5 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <ArrowDown className="w-7 h-7" strokeWidth={3} aria-hidden="true" />
              <span className="tracking-wide">VENDA</span>
            </button>
          </div>
        </div>
      </div>

      {/* Histórico */}
      <div className="bg-card p-6 rounded-2xl border border-border overflow-hidden">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
          Histórico de simulação
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-muted-foreground min-w-[600px]">
            <thead>
              <tr className="text-xs uppercase tracking-wider border-b border-border bg-secondary/50">
                <th className="py-4 px-4 rounded-tl-xl">Ativo</th>
                <th className="py-4 px-4">Direção</th>
                <th className="py-4 px-4">Taxa de entrada</th>
                <th className="py-4 px-4">Investimento</th>
                <th className="py-4 px-4 rounded-tr-xl">Lucro / Perda</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {history.length === 0 ? (
                <tr className="text-center">
                  <td colSpan={5} className="py-8 text-muted-foreground">
                    Faça sua primeira operação no painel acima para ver o histórico.
                  </td>
                </tr>
              ) : (
                history.map((t) => {
                  const won = t.result > 0;
                  return (
                    <tr key={t.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="py-4 px-4 font-bold text-foreground">{t.asset}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-1 text-[10px] font-bold rounded ${
                            t.direction === "CALL"
                              ? "bg-primary/10 text-primary"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {t.direction}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono text-xs">
                        {t.entry.toFixed(ASSETS[t.asset as AssetId]?.decimals ?? 5)}
                      </td>
                      <td className="py-4 px-4 font-mono text-xs">{formatBRL(t.amount)}</td>
                      <td className="py-4 px-4 font-bold">
                        <span
                          className={`px-2.5 py-1 rounded-md ${
                            won
                              ? "bg-primary/10 text-primary"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {won ? "+" : "-"} {formatBRL(Math.abs(t.result))}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          className={`fixed bottom-6 right-6 bg-card border px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 ${
            toast.tone === "win"
              ? "border-primary/50 text-primary"
              : toast.tone === "loss"
                ? "border-destructive/50 text-destructive"
                : "border-border text-foreground"
          }`}
        >
          <span className="text-lg font-black" aria-hidden="true">{toast.icon}</span>
          <span className="text-sm font-semibold">{toast.msg}</span>
        </div>
      )}
    </section>
  );
};

export default TradingSimulator;
