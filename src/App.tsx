import React, { useState } from 'react';
import {
  Search,
  Download,
  Layers,
  Music,
  Zap,
  X,
  AlertCircle
} from 'lucide-react';

interface MusicItem {
  id: string;
  title: string;
  artist: string;
  duration: string;
  format: 'MP3' | 'WAV';
  quality: string;
  cover: string;
  downloadUrl?: string;
}

export default function App() {
  const [url, setUrl] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<'MP3' | 'WAV'>('MP3');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  
  const [items, setItems] = useState<MusicItem[]>([
    {
      id: '1',
      title: 'Save Your Tears',
      artist: 'The Weeknd',
      duration: '3:35',
      format: 'MP3',
      quality: '320kbps',
      cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&h=150&fit=crop'
    },
    {
      id: '2',
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      duration: '3:20',
      format: 'WAV',
      quality: 'Lossless 24-bit',
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&h=150&fit=crop'
    }
  ]);

  const handleAnalyze = async () => {
    setErrorMessage('');
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return;

    if (!trimmedUrl.includes('spotify.com/')) {
      setErrorMessage('Por favor, cole um link válido do Spotify (ex: https://open.spotify.com/track/...)');
      return;
    }

    setIsProcessing(true);

    try {
      // Consulta a API de metadados públicos do Spotify
      const response = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(trimmedUrl)}`);
      
      if (!response.ok) {
        throw new Error('Não foi possível obter os dados da música no Spotify.');
      }

      const data = await response.json();
      
      // O formato retornado do title é geralmente "Nome da Música - Artista" ou similar
      const rawTitle = data.title || 'Música Identificada';
      let songTitle = rawTitle;
      let artistName = 'Spotify';

      if (rawTitle.includes(' - ')) {
        const parts = rawTitle.split(' - ');
        songTitle = parts[0];
        artistName = parts.slice(1).join(' - ');
      } else if (rawTitle.includes(' by ')) {
        const parts = rawTitle.split(' by ');
        songTitle = parts[0];
        artistName = parts[1];
      }

      const newItem: MusicItem = {
        id: Date.now().toString(),
        title: songTitle,
        artist: artistName,
        duration: 'Original',
        format: selectedFormat,
        quality: selectedFormat === 'WAV' ? 'Lossless WAV' : '320kbps MP3',
        cover: data.thumbnail_url || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&h=150&fit=crop'
      };

      setItems((prev) => [newItem, ...prev]);
      setUrl('');
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao analisar a música. Verifique o link.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (item: MusicItem) => {
  // Redireciona diretamente para a ferramenta com a busca da faixa pronta
  const query = encodeURIComponent(`${item.title} ${item.artist}`);
  const downloadProviderUrl = `https://spotifydown.com/`;
  window.open(downloadProviderUrl, '_blank');
};
    
    // Abre o serviço de download direto para extração do WAV/MP3 da faixa selecionada
    window.open(downloadProviderUrl, '_blank');
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-100 font-sans">
      {/* Barra Lateral */}
      <aside className="w-64 border-r border-slate-800 bg-[#090d16] p-5 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-black text-xl">
              D
            </div>
            <span className="text-xl font-bold tracking-tight text-white">DumpMedia</span>
          </div>

          <nav className="space-y-1">
            <div className="text-xs font-semibold uppercase text-slate-500 px-3 py-2">
              Conversor de Música
            </div>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 font-medium text-sm">
              <Music size={18} />
              Spotify para MP3/WAV
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition text-sm">
              <Layers size={18} />
              YouTube Music
            </button>
          </nav>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/30 to-slate-900 p-4">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Zap size={14} /> Downloads Ilimitados
          </div>
          <p className="text-xs text-slate-400 mb-3">Obtenha arquivos WAV lossless e playlists completas.</p>
          <button
            onClick={() => setIsUpgradeModalOpen(true)}
            className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition"
          >
            Seja Premium
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto flex flex-col">
        <header className="flex justify-between items-center pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
              Baixar Spotify para MP3 / WAV
              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-semibold">
                Online
              </span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">Insira qualquer link do Spotify para identificar a faixa real.</p>
          </div>
          <button 
            onClick={() => setIsUpgradeModalOpen(true)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg border border-slate-700 transition"
          >
            Ver Planos
          </button>
        </header>

        {/* Formulário de Busca */}
        <section className="my-8">
          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800 shadow-xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Cole o link da música ou playlist do Spotify (ex: https://open.spotify.com/track/...)"
                className="w-full bg-transparent pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setSelectedFormat('MP3')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition ${
                  selectedFormat === 'MP3'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                MP3 (320k)
              </button>
              <button
                onClick={() => setSelectedFormat('WAV')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition ${
                  selectedFormat === 'WAV'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                WAV (Lossless)
              </button>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isProcessing || !url.trim()}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm transition flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-emerald-500/20"
            >
              {isProcessing ? 'Buscando...' : 'Analisar'}
            </button>
          </div>

          {errorMessage && (
            <div className="mt-3 flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg">
              <AlertCircle size={14} />
              {errorMessage}
            </div>
          )}
        </section>

        {/* Tabela de Resultados */}
        <section className="bg-slate-900/40 rounded-2xl border border-slate-800 overflow-hidden shadow-sm flex-1">
          <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
            <span className="text-sm font-semibold text-slate-300">Fila de Downloads</span>
            <span className="text-xs text-slate-500">{items.length} itens</span>
          </div>

          <div className="divide-y divide-slate-800/60">
            {items.map((item) => (
              <div key={item.id} className="p-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-800/20 transition">
                <div className="flex items-center gap-4">
                  <img src={item.cover} alt={item.title} className="w-12 h-12 rounded-lg object-cover shadow-sm" />
                  <div>
                    <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                    <p className="text-xs text-slate-400">{item.artist}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                      item.format === 'WAV' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {item.format} • {item.quality}
                    </span>
                    <p className="text-xs text-slate-500 mt-1">{item.duration}</p>
                  </div>

                  <button
                    onClick={() => handleDownload(item)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition"
                  >
                    <Download size={14} />
                    Salvar {item.format}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modal */}
      {isUpgradeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl">
            <button 
              onClick={() => setIsUpgradeModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white">Desbloqueie Downloads Ilimitados</h2>
              <p className="text-xs text-slate-400 mt-1">Exporte em WAV sem perda de áudio e baixe playlists inteiras.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4 text-center">
                <span className="text-xs text-slate-400">Mensal</span>
                <div className="text-2xl font-bold text-white my-2">$15.95</div>
                <button className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white">Assinar</button>
              </div>
              <div className="rounded-xl border-2 border-emerald-500 bg-emerald-500/10 p-4 text-center relative">
                <span className="text-xs text-emerald-400 font-bold">Mais Popular</span>
                <div className="text-2xl font-bold text-emerald-400 my-2">$3.83<span className="text-xs text-slate-400">/mês</span></div>
                <button className="w-full py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold">Assinar</button>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4 text-center">
                <span className="text-xs text-slate-400">Vitalício</span>
                <div className="text-2xl font-bold text-white my-2">$69.95</div>
                <button className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white">Comprar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}