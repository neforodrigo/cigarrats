import React, { useState } from 'react';
import { 
  Home, 
  BarChart2, 
  PlusCircle, 
  Users, 
  User, 
  Heart, 
  MessageCircle, 
  Camera, 
  Coffee, 
  Beer, 
  Cigarette,
  Flame,
  Wind,
  Utensils,
  X
} from 'lucide-react';

const INITIAL_POSTS = [
  {
    id: 1,
    user: {
      name: 'Beatriz Almeida',
      username: '@carlos_smoke',
      avatar: 'https://i.pravatar.cc/150?u=carlos',
    },
    time: 'Há 10 min',
    text: 'Aquele combo sagrado para começar o dia no escritório.',
    tags: ['Café', 'Manhã', 'Pausa do Trabalho'],
    likes: 12,
    liked: false,
    comments: 3,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROAXG23pCb4rzSQPfkD42vEXWwRdyoP-Sr7vC2GGjxO8srJucaHOmBucY&s=10',
  },
  {
    id: 2,
    user: {
      name: 'Mariana Silva',
      username: '@mari_s',
      avatar: 'https://i.pravatar.cc/150?u=mariana',
    },
    time: 'Há 2 horas',
    text: 'Sextou! A primeira da noite com o pessoal do escritório.',
    tags: ['Cerveja', 'Social', 'Bar'],
    likes: 45,
    liked: true,
    comments: 8,
    image: 'https://i.pinimg.com/236x/d6/d7/ce/d6d7cef4ac3ba4aaab52403889cc182c.jpg',
  },
  {
    id: 3,
    user: {
      name: 'Beto Rocha',
      username: '@betoroch',
      avatar: 'https://i.pravatar.cc/150?u=beto',
    },
    time: 'Há 5 horas',
    text: 'Depois daquele almoço pesado, não tem jeito.',
    tags: ['Pós-refeição'],
    likes: 8,
    liked: false,
    comments: 0,
    image: 'https://thumbs.dreamstime.com/b/cigarros-e-cigarro-que-encontram-se-dentro-e-em-torno-da-bandeja-de-cinza-de-vidro-na-superf%C3%ADcie-de-madeira-vista-de-cima-de-89027438.jpg',
  }
];

const AVAILABLE_TAGS = [
  { id: 'cafe', label: 'Café', icon: <Coffee size={16} /> },
  { id: 'cerveja', label: 'Cerveja/Álcool', icon: <Beer size={16} /> },
  { id: 'pos_refeicao', label: 'Pós-refeição', icon: <Utensils size={16} /> },
  { id: 'trabalho', label: 'Pausa do Trabalho', icon: <Cigarette size={16} /> },
  { id: 'estresse', label: 'Estresse', icon: <Wind size={16} /> },
  { id: 'social', label: 'Social/Festa', icon: <Users size={16} /> },
];

export default function CigarRatsApp() {
  const [activeTab, setActiveTab] = useState('feed');
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [userStats, setUserStats] = useState({
    dailyCount: 4,
    dailyLimit: 10,
    streak: 12
  });

  const toggleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleNewLog = (newLog) => {
    const newPost = {
      id: Date.now(),
      user: {
        name: 'Você',
        username: '@seu_usuario',
        avatar: 'https://i.pravatar.cc/150?u=voce',
      },
      time: 'Agora',
      text: newLog.text,
      tags: newLog.tags,
      likes: 0,
      liked: false,
      comments: 0,
      image: newLog.hasImage ? 'https://images.unsplash.com/photo-1526685714488-66a98f1f72da?auto=format&fit=crop&q=80&w=800' : null,
    };
    
    setPosts([newPost, ...posts]);
    setUserStats(prev => ({ ...prev, dailyCount: prev.dailyCount + 1 }));
    setIsLogModalOpen(false);
  };

  return (
    <div className="flex justify-center bg-gray-900 min-h-screen font-sans text-gray-100">
      {}
      <div className="w-full max-w-md bg-gray-950 min-h-screen flex flex-col relative shadow-2xl border-x border-gray-800">
        
        {/* Header atualizado com a logo */}
        <header className="px-4 py-4 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-950/90 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white overflow-hidden flex items-center justify-center border border-gray-700">
               <img 
                 src="https://i.imgur.com/BmJeg6i.png" 
                 alt="Logo do CigarRats" 
                 className="w-full h-full object-contain p-1" 
                 onError={(e) => {
                   // Fallback seguro: se o sandbox bloquear a imagem, não quebra o layout
                   e.target.onerror = null;
                   e.target.src = "https://api.dicebear.com/7.x/shapes/svg?seed=CigarRats&backgroundColor=f97316";
                 }}
               />
            </div>
            <h1 className="text-2xl font-black italic tracking-tighter text-white">CigarRats</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-800 overflow-hidden border border-gray-700">
            <img src="https://i.pravatar.cc/150?u=voce" alt="Perfil" className="w-full h-full object-cover" />
          </div>
        </header>

        {}
        <main className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
          {activeTab === 'feed' && <FeedView posts={posts} onLike={toggleLike} />}
          {activeTab === 'stats' && <StatsView stats={userStats} />}
          {activeTab === 'ranking' && <RankingView />}
        </main>

        {/* Bottom Navigation */}
        <BottomNav 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          openLogModal={() => setIsLogModalOpen(true)} 
        />

        {/* Modal para Registrar Fumo */}
        {isLogModalOpen && (
          <LogModal 
            onClose={() => setIsLogModalOpen(false)} 
            onSubmit={handleNewLog} 
          />
        )}
      </div>
    </div>
  );
}

function FeedView({ posts, onLike }) {
  return (
    <div className="flex flex-col gap-2 bg-gray-900">
      {posts.map(post => (
        <div key={post.id} className="bg-gray-950 p-4 border-b border-gray-800">
          {/* Cabeçalho do Post */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full border border-gray-800" />
              <div>
                <h3 className="font-bold text-sm text-gray-100">{post.user.name}</h3>
                <p className="text-xs text-gray-500">{post.user.username} • {post.time}</p>
              </div>
            </div>
          </div>

          {/* Texto e Tags */}
          <p className="text-sm text-gray-300 mb-3">{post.text}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="bg-gray-800 text-orange-400 text-xs px-2 py-1 rounded-md font-medium border border-gray-700">
                {tag}
              </span>
            ))}
          </div>

          {/* Imagem (se houver) */}
          {post.image && (
            <div className="rounded-xl overflow-hidden mb-4 border border-gray-800">
              <img src={post.image} alt="Momento" className="w-full h-auto object-cover max-h-80" />
            </div>
          )}

          {/* Ações (Curtir, Comentar) */}
          <div className="flex items-center gap-6 text-gray-400">
            <button 
              onClick={() => onLike(post.id)}
              className={`flex items-center gap-1.5 transition-colors ${post.liked ? 'text-orange-500' : 'hover:text-gray-200'}`}
            >
              <Flame size={20} fill={post.liked ? "currentColor" : "none"} />
              <span className="text-sm font-medium">{post.likes}</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-gray-200 transition-colors">
              <MessageCircle size={20} />
              <span className="text-sm font-medium">{post.comments}</span>
            </button>
          </div>
        </div>
      ))}
      
      {/* Mensagem de fim de feed */}
      <div className="p-8 text-center text-gray-500 text-sm">
        <Wind className="mx-auto mb-2 opacity-50" size={24} />
        <p>Você chegou ao fim do feed.</p>
        <p>Vá interagir ou registrar o seu!</p>
      </div>
    </div>
  );
}

function StatsView({ stats }) {
  const percentage = (stats.dailyCount / stats.dailyLimit) * 100;
  let progressColor = 'bg-green-500';
  if (percentage > 70) progressColor = 'bg-yellow-500';
  if (percentage >= 100) progressColor = 'bg-red-500';

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold mb-4">Seu Progresso Hoje</h2>
      
      {/* Cartão Principal */}
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Cigarette size={100} />
        </div>
        
        <div className="relative z-10">
          <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Cigarros Fumados</p>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-5xl font-black text-white">{stats.dailyCount}</span>
            <span className="text-gray-500 mb-1 font-medium">/ {stats.dailyLimit} meta</span>
          </div>

          {/* Barra de Progresso */}
          <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${progressColor}`} 
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-right">
            {percentage >= 100 ? 'Meta atingida ou ultrapassada ⚠️' : 'Dentro do controle.'}
          </p>
        </div>
      </div>

      {/* Grid de Informações Extra */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800 flex flex-col items-center justify-center text-center">
          <Flame className="text-orange-500 mb-2" size={28} />
          <p className="text-3xl font-bold">{stats.streak}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Dias Logados</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800 flex flex-col items-center justify-center text-center">
          <Coffee className="text-amber-700 mb-2" size={28} />
          <p className="text-xl font-bold">Café</p>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Maior Gatilho</p>
        </div>
      </div>
    </div>
  );
}

function RankingView() {
  const ranking = [
    { pos: 1, name: 'Marcos P.', score: 1450, badge: '🔥' },
    { pos: 2, name: 'Você', score: 1200, badge: '🚬' },
    { pos: 3, name: 'Ana Souza', score: 980, badge: '' },
    { pos: 4, name: 'Felipe D.', score: 850, badge: '' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-6">Ranking Semanal</h2>
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        {ranking.map((user, idx) => (
          <div key={idx} className={`flex items-center justify-between p-4 border-b border-gray-800 last:border-0 ${user.name === 'Você' ? 'bg-gray-800/50' : ''}`}>
            <div className="flex items-center gap-4">
              <span className={`font-black text-lg ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-300' : idx === 2 ? 'text-amber-600' : 'text-gray-500'}`}>
                {user.pos}º
              </span>
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              <div>
                <p className="font-bold text-sm">{user.name} {user.badge}</p>
                <p className="text-xs text-gray-500">Pontos de interação</p>
              </div>
            </div>
            <span className="font-bold text-orange-500">{user.score}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-gray-500 mt-4">Os pontos são baseados em registros, curtidas e comentários recebidos.</p>
    </div>
  );
}

function LogModal({ onClose, onSubmit }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [text, setText] = useState('');
  const [hasImage, setHasImage] = useState(false);

  const toggleTag = (label) => {
    if (selectedTags.includes(label)) {
      setSelectedTags(selectedTags.filter(t => t !== label));
    } else {
      setSelectedTags([...selectedTags, label]);
    }
  };

  const handleSubmit = () => {
    onSubmit({ text, tags: selectedTags, hasImage });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col justify-end">
      {/* Área clicável para fechar o modal */}
      <div className="flex-1" onClick={onClose} />
      
      {/* Corpo do Modal */}
      <div className="bg-gray-900 rounded-t-3xl p-5 border-t border-gray-800 animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Registrar Momento</h2>
          <button onClick={onClose} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition">
            <X size={20} />
          </button>
        </div>

        {/* Acompanhamentos / Gatilhos */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">O que acompanha?</p>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_TAGS.map(tag => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.label)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                  selectedTags.includes(tag.label) 
                    ? 'bg-orange-500/20 border-orange-500 text-orange-400' 
                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {tag.icon}
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Área de Texto */}
        <div className="mb-4">
          <textarea 
            placeholder="Comente sobre este momento (opcional)..."
            className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-sm text-gray-100 focus:outline-none focus:border-orange-500 placeholder-gray-600 resize-none h-24"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        {/* Adicionar Foto */}
        <div className="mb-6">
          <button 
            onClick={() => setHasImage(!hasImage)}
            className={`w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed transition-all ${
              hasImage 
                ? 'bg-green-500/10 border-green-500/50 text-green-400' 
                : 'border-gray-700 bg-gray-950 text-gray-400 hover:bg-gray-800'
            }`}
          >
            <Camera size={20} />
            <span className="font-medium">{hasImage ? 'Foto anexada (Clique para remover)' : 'Adicionar uma foto'}</span>
          </button>
        </div>

        {/* Botão de Envio */}
        <button 
          onClick={handleSubmit}
          className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-orange-900/20"
        >
          Salvar Registro
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
}

function BottomNav({ activeTab, setActiveTab, openLogModal }) {
  return (
    <nav className="fixed md:absolute bottom-0 w-full max-w-md bg-gray-950/90 backdrop-blur-md border-t border-gray-800 px-6 py-3 pb-safe">
      <div className="flex justify-between items-center relative">
        <button 
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeTab === 'feed' ? 'text-orange-500' : 'text-gray-500 hover:text-gray-300'}`}
        >
          <Home size={24} />
          <span className="text-[10px] font-medium">Início</span>
        </button>

        <button 
          onClick={() => setActiveTab('stats')}
          className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeTab === 'stats' ? 'text-orange-500' : 'text-gray-500 hover:text-gray-300'}`}
        >
          <BarChart2 size={24} />
          <span className="text-[10px] font-medium">Status</span>
        </button>

        {/* FAB (Floating Action Button) Central */}
        <div className="relative -top-6">
          <button 
            onClick={openLogModal}
            className="bg-orange-600 hover:bg-orange-500 text-white p-4 rounded-full shadow-lg shadow-orange-900/50 flex items-center justify-center transform transition active:scale-95 border-4 border-gray-950"
          >
            <PlusCircle size={28} />
          </button>
        </div>

        <button 
          onClick={() => setActiveTab('ranking')}
          className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeTab === 'ranking' ? 'text-orange-500' : 'text-gray-500 hover:text-gray-300'}`}
        >
          <Users size={24} />
          <span className="text-[10px] font-medium">Ranking</span>
        </button>

        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeTab === 'profile' ? 'text-orange-500' : 'text-gray-500 hover:text-gray-300'}`}
        >
          <User size={24} />
          <span className="text-[10px] font-medium">Perfil</span>
        </button>
      </div>
    </nav>
  );
}
