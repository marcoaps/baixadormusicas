import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Check, 
  X, 
  Download, 
  Music, 
  Globe, 
  User, 
  ChevronDown, 
  ChevronUp, 
  Home, 
  CreditCard, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  Play, 
  Pause,
  ExternalLink,
  ShieldCheck,
  Disc3
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('spotify');
  const [isConverterOpen, setIsConverterOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [urlInput, setUrlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadLimit, setDownloadLimit] = useState(3);
  const [activePlayingId, setActivePlayingId] = useState(null);

  // Initial downloads list resembling the dashboard in the screenshot
  const [conversions, setConversions] = useState([
    {
      id: '1',
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      duration: '3:20',
      source: 'spotify',
      bitrate: '320kbps',
      cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=150&auto=format&fit=crop&q=60',
      status: 'Baixado',
      progress: 100
    },
    {
      id: '2',
      title: 'Starboy (feat. Daft Punk)',
      artist: 'The Weeknd',
      duration: '3:50',
      source: 'spotify',
      bitrate: '320kbps',
      cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=60',
      status: 'Baixado',
      progress: 100
    }
  ]);

  const services = [
    { id: 'spotify', name: 'Spotify para MP3', icon: '🟢', placeholder: 'Cole o link de uma música, álbum ou playlist do Spotify...' },
    { id: 'youtube', name: 'YouTube Music para MP3', icon: '🔴', placeholder: 'Cole o link do YouTube Music aqui...' },
    { id: 'apple', name: 'Apple Music para MP3', icon: '🍎', placeholder: 'Cole o link da faixa do Apple Music...' },
    { id: 'amazon', name: 'Amazon Music para MP3', icon: '📦', placeholder: 'Cole o link do Amazon Music...' },
    { id: 'suno', name: 'Suno para MP3', icon: '✨', placeholder: 'Cole a URL da canção gerada no Suno AI...' },
    { id: 'backup', name: 'Backup da playlist do Spotify', icon: '📁', placeholder: 'Insira o link da playlist para backup...' },
    { id: 'ai-music', name: 'Música de compositor de IA', icon: '🤖', placeholder: 'Cole a URL do áudio de IA...' }
  ];

  const currentService = services.find(s => s.id === activeTab) || services[0];

  // Simulated link processing & download flow
  const handleConvert = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    if (downloadLimit <= 0) {
      setIsModalOpen(true);
      return;
    }

    setIsProcessing(true);
    const newId = Date.now().toString();

    // Generate simulated metadata based on user link or defaults
    const mockTitles = ['As It Was', 'Flowers', 'Levitating', 'Die For You', 'Save Your Tears'];
    const mockArtists = ['Harry Styles', 'Miley Cyrus', 'Dua Lipa', 'The Weeknd', 'Joji'];
    const randomIndex = Math.floor(Math.random() * mockTitles.length);

    const newItem = {
      id: newId,
      title: mockTitles[randomIndex],
      artist: mockArtists[randomIndex],
      duration: '3:15',
      source: activeTab,
      bitrate: '320kbps',
      cover: `https://picsum.photos/seed/${newId}/100/100`,
      status: 'Baixando',
      progress: 15
    };

    setConversions(prev => [newItem, ...prev]);
    setUrlInput('');

    // Progressive update simulation
    let progress = 15;
    const interval = setInterval(() => {
      progress += 25;
      if (progress >= 100) {
        clearInterval(interval);
        setConversions(curr => curr.map(item => item.id === newId ? { ...item, status: 'Baixado', progress: 100 } : item));
        setIsProcessing(false);
        setDownloadLimit(prev => Math.max(0, prev - 1));
      } else {
        setConversions(curr => curr.map(item => item.id === newId ? { ...item, progress } : item));
      }
    }, 600);
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] text-slate-800 font-sans antialiased overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1e232d] text-slate-300 flex flex-col justify-between shrink-0 select-none border-r border-slate-800">
        <div>
          {/* Brand header */}
          <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-700/60 bg-[#191d26]">
            <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-white text-lg shadow-md shadow-emerald-500/20">
              D
            </div>
            <span className="text-xl font-bold tracking-tight text-white">DumpMedia</span>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-xs">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition font-medium">
              <Home size={16} />
              <span>INÍCIO</span>
            </button>

            {/* Collapsible Menu: Conversor de música online */}
            <div className="pt-2">
              <button 
                onClick={() => setIsConverterOpen(!isConverterOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-white font-medium hover:bg-slate-800/80 transition"
              >
                <div className="flex items-center gap-2.5">
                  <Music size={16} className="text-emerald-400" />
                  <span>Conversor de música online</span>
                </div>
                {isConverterOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>

              {isConverterOpen && (
                <div className="ml-4 pl-3 border-l border-slate-700/80 space-y-1 mt-1">
                  {services.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-[13px] transition flex items-center justify-between ${
                          isActive 
                            ? 'text-sky-400 font-semibold bg-sky-500/10' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                        }`}
                      >
                        <span className="truncate">{item.name}</span>
                        {isActive && <span className="h-1.5 w-1.5 rounded-full bg-sky-400"></span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 mt-3 space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition">
                <CreditCard size={15} />
                <span>Informações de assinatura</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition">
                <User size={15} />
                <span>Minha conta</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Promo Widget at bottom of Sidebar */}
        <div className="p-3">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-900/90 via-purple-900 to-slate-900 p-4 border border-purple-500/20 text-center shadow-lg">
            <div className="flex justify-center gap-1.5 mb-2">
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">Spotify</span>
              <span className="text-xs bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">YT</span>
              <span className="text-xs bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">Amazon</span>
            </div>
            <p className="text-xs font-semibold text-slate-200">Desbloqueie mais músicas online</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-3 w-full rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 py-1.5 text-xs font-bold text-white shadow-md hover:brightness-110 active:scale-95 transition"
            >
              Seja Premium!
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Conversor Online</span>
            <span>/</span>
            <span className="font-semibold text-slate-700">{currentService.name}</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900">
              <Globe size={15} className="text-slate-400" />
              <span>Português</span>
              <ChevronDown size={13} />
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold hover:bg-amber-100 transition"
            >
              <Sparkles size={13} />
              <span>Upgrade</span>
            </button>

            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold border border-slate-300">
              <User size={15} />
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-8 max-w-5xl mx-auto w-full space-y-8">
          
          {/* Header Title */}
          <div className="text-center pt-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
              <span>{currentService.name}</span>
              <span className="text-sky-500">💎</span>
            </h1>
            <p className="text-slate-500 text-xs mt-2">
              Converta músicas, playlists e álbuns para MP3 com alta qualidade (320kbps).
            </p>
          </div>

          {/* URL Search / Input Card */}
          <form onSubmit={handleConvert} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={currentService.placeholder}
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full pl-4 pr-10 py-3 text-sm rounded-xl bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none"
              />
              {urlInput && (
                <button
                  type="button"
                  onClick={() => setUrlInput('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl text-sm font-semibold transition flex items-center gap-2 shadow-sm shrink-0"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Analisando...</span>
                </>
              ) : (
                <>
                  <span>Analisar</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Links */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 px-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-600">Downloads restantes hoje:</span>
              <span className={`px-2 py-0.5 rounded font-bold ${downloadLimit > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {downloadLimit} grátis
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>Teste rápido:</span>
              <button 
                type="button" 
                onClick={() => setUrlInput('https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b')}
                className="text-blue-600 hover:underline"
              >
                Link demo Spotify
              </button>
            </div>
          </div>

          {/* Conversion Table Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Disc3 size={17} className="text-blue-500" />
                <span>Lista de Conversão</span>
              </h2>
              <span className="text-xs text-slate-400 font-medium">
                {conversions.length} {conversions.length === 1 ? 'música' : 'músicas'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100">
                    <th className="py-3 px-6">Música</th>
                    <th className="py-3 px-4">Duração</th>
                    <th className="py-3 px-4">Qualidade</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-6 text-right">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {conversions.map((song) => {
                    const isDownloaded = song.status === 'Baixado';
                    const isPlaying = activePlayingId === song.id;

                    return (
                      <tr key={song.id} className="hover:bg-slate-50/60 transition">
                        {/* Music Title + Cover */}
                        <td className="py-3.5 px-6">
                          <div className="flex items-center gap-3">
                            <div className="relative group h-11 w-11 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                              <img src={song.cover} alt={song.title} className="h-full w-full object-cover" />
                              <button 
                                onClick={() => setActivePlayingId(isPlaying ? null : song.id)}
                                className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition"
                              >
                                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                              </button>
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-sm truncate max-w-xs">{song.title}</p>
                              <p className="text-slate-400 text-xs">{song.artist}</p>
                            </div>
                          </div>
                        </td>

                        {/* Duration */}
                        <td className="py-3.5 px-4 text-slate-500 font-mono">
                          {song.duration}
                        </td>

                        {/* Bitrate */}
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium font-mono text-[11px]">
                            {song.bitrate}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          {isDownloaded ? (
                            <span className="inline-flex items-center gap-1.5 text-emerald-600 font-medium">
                              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                              <span>Baixado</span>
                            </span>
                          ) : (
                            <div className="w-28 space-y-1">
                              <div className="flex justify-between text-[10px] text-blue-600 font-medium">
                                <span>Baixando...</span>
                                <span>{song.progress}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 transition-all duration-300" 
                                  style={{ width: `${song.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </td>

                        {/* Download CTA */}
                        <td className="py-3.5 px-6 text-right">
                          <button
                            disabled={!isDownloaded}
                            onClick={() => {
                              // Trigger realistic download simulation
                              const element = document.createElement("a");
                              const file = new Blob([`Dummy MP3 audio for ${song.title}`], { type: 'audio/mpeg' });
                              element.href = URL.createObjectURL(file);
                              element.download = `${song.artist} - ${song.title}.mp3`;
                              document.body.appendChild(element);
                              element.click();
                              document.body.removeChild(element);
                            }}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs shadow-sm transition ${
                              isDownloaded
                                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            <Download size={13} />
                            <span>Salvar MP3</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* UPGRADE POPUP MODAL (Exact match from the screenshot) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-5 top-5 z-20 rounded-full bg-slate-100 p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
            >
              <X size={18} />
            </button>

            {/* Clouds & Rocket Header Graphic */}
            <div className="relative bg-gradient-to-b from-sky-400 via-sky-200/50 to-white pt-10 pb-4 px-6 text-center overflow-hidden">
              {/* Cloud decorative SVG styling */}
              <div className="absolute top-0 left-0 right-0 h-full pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.8),transparent_70%)]"></div>
              
              <div className="relative mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg shadow-sky-500/20 text-blue-500">
                <Rocket size={34} className="transform -rotate-12 animate-pulse" />
              </div>

              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                Faça upgrade para desbloquear downloads ilimitados!
              </h2>

              {/* Value propositions */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs font-semibold text-emerald-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-500" />
                  <span>Downloads ilimitados</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-500" />
                  <span>Download de playlists completas</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-500" />
                  <span>Melhor qualidade de música(320kbps)</span>
                </span>
              </div>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 p-6 bg-white">
              
              {/* Mensal */}
              <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 p-5 text-center transition hover:border-blue-300 hover:shadow-md">
                <div>
                  <span className="inline-block rounded-full bg-blue-50 px-3 py-0.5 text-xs font-semibold text-blue-600">
                    Mensal
                  </span>
                  <div className="mt-4 text-3xl font-black text-blue-600">
                    $15.95<span className="text-xs text-slate-400 font-normal">/Por mês</span>
                  </div>
                  <p className="mt-4 text-[11px] text-slate-500">
                    Cobrado mensalmente
                  </p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="mt-6 w-full rounded-xl bg-blue-50 py-2.5 text-xs font-bold text-blue-600 hover:bg-blue-100 transition"
                >
                  Atualize agora &rarr;
                </button>
              </div>

              {/* Anual (Highlighted - Orange) */}
              <div className="relative flex flex-col justify-between rounded-2xl border-2 border-orange-400 p-5 text-center shadow-lg bg-orange-50/10">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                  Mais Popular
                </div>
                <div>
                  <span className="inline-block rounded-full bg-orange-100 px-3 py-0.5 text-xs font-bold text-orange-600">
                    Anual
                  </span>
                  <div className="mt-4 text-3xl font-black text-orange-500">
                    $3.83<span className="text-xs text-slate-400 font-normal">/Por mês</span>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-600 font-medium">
                    Cobrado anualmente
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Cobrado como um pagamento único de $45,95
                  </p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="mt-6 w-full rounded-xl bg-orange-500 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/30 hover:bg-orange-600 transition"
                >
                  Atualize agora &rarr;
                </button>
              </div>

              {/* Perpétuo */}
              <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 p-5 text-center transition hover:border-blue-300 hover:shadow-md">
                <div>
                  <span className="inline-block rounded-full bg-blue-50 px-3 py-0.5 text-xs font-semibold text-blue-600">
                    Perpétuo
                  </span>
                  <div className="mt-4 text-3xl font-black text-blue-600">
                    $69.95
                  </div>
                  <p className="mt-4 text-[11px] text-slate-500">
                    Pague apenas uma vez
                  </p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="mt-6 w-full rounded-xl bg-blue-50 py-2.5 text-xs font-bold text-blue-600 hover:bg-blue-100 transition"
                >
                  Atualize agora &rarr;
                </button>
              </div>

            </div>

            {/* Modal Footer Note */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Garantia de reembolso de 30 dias • Cancelamento seguro a qualquer momento</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}