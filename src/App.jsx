import { useState } from 'react'

function App() {
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      user: {
        name: "Ana García",
        username: "@anadev",
        avatar: "👩‍💻",
        online: true
      },
      content: "¡Acabo de terminar mi portfolio con React y Tailwind! 🚀 La combinación es increíble para desarrollar rápido interfaces modernas.",
      time: "2h",
      likes: 24,
      comments: 5,
      shares: 2,
      category: "Frontend",
      categoryColor: "bg-blue-500"
    },
    { 
      id: 2, 
      user: {
        name: "Carlos López",
        username: "@carlosjs",
        avatar: "👨‍💻",
        online: false
      },
      content: "¿Alguien más está usando las nuevas features de ES2023? Los array methods nuevos han simplificado mucho mi código.",
      time: "4h",
      likes: 18,
      comments: 3,
      shares: 1,
      category: "JavaScript",
      categoryColor: "bg-yellow-500"
    },
    { 
      id: 3, 
      user: {
        name: "María Rodríguez",
        username: "@mariaui",
        avatar: "🎨",
        online: true
      },
      content: "Diseño vs Desarrollo: ¿Por qué elegir cuando puedes aprender ambos? Hoy comparto mis tips para colaboración efectiva entre equipos.",
      time: "6h",
      likes: 32,
      comments: 8,
      shares: 4,
      category: "Diseño",
      categoryColor: "bg-pink-500"
    },
    { 
      id: 4, 
      user: {
        name: "David Chen",
        username: "@davidbackend",
        avatar: "⚙️",
        online: true
      },
      content: "Acabo de optimizar nuestra API y reduje el tiempo de respuesta en un 60%. Node.js + Redis es una combinación increíble para performance.",
      time: "1d",
      likes: 45,
      comments: 12,
      shares: 6,
      category: "Backend",
      categoryColor: "bg-green-500"
    }
  ])

  const [newPost, setNewPost] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')

  const addPost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        user: {
          name: "Tú",
          username: "@tuusuario",
          avatar: "😊",
          online: true
        },
        content: newPost,
        time: "Ahora",
        likes: 0,
        comments: 0,
        shares: 0,
        category: "General",
        categoryColor: "bg-purple-500"
      }
      setPosts([post, ...posts])
      setNewPost('')
    }
  }

  const likePost = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  const categories = ["Todas", "Frontend", "Backend", "JavaScript", "Diseño", "General"]

  const filteredPosts = selectedCategory === "Todas" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  const stats = {
    totalPosts: posts.length,
    totalLikes: posts.reduce((sum, post) => sum + post.likes, 0),
    totalComments: posts.reduce((sum, post) => sum + post.comments, 0),
    activeUsers: posts.filter(post => post.user.online).length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">SocialDev</h1>
                <p className="text-slate-600 text-sm">Comunidad de desarrolladores</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="hidden md:flex items-center space-x-6">
              {[
                { label: "Posts", value: stats.totalPosts },
                { label: "Likes", value: stats.totalLikes },
                { label: "Comentarios", value: stats.totalComments },
                { label: "En línea", value: stats.activeUsers }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-slate-800 font-bold">{stat.value}</div>
                  <div className="text-slate-500 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Create Post Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl text-white">+</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Crear Publicación</h3>
                <p className="text-slate-600 text-sm mb-4">Comparte tu proyecto</p>
                
                <textarea 
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="¿Qué estás desarrollando?"
                  className="w-full p-3 border border-slate-300 rounded-xl mb-3 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                />
                
                <button 
                  onClick={addPost}
                  disabled={!newPost.trim()}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Publicar 🚀
                </button>
              </div>
            </div>

            {/* Online Users */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-800 mb-4">Desarrolladores en línea</h3>
              <div className="space-y-3">
                {posts.filter(post => post.user.online).slice(0, 3).map((post, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                        {post.user.avatar}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{post.user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{post.user.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  
                  {/* Card Header */}
                  <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {post.user.avatar}
                          </div>
                          {post.user.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">{post.user.name}</h3>
                          <p className="text-slate-500 text-sm">{post.user.username}</p>
                        </div>
                      </div>
                      <span className="text-slate-400 text-sm">{post.time}</span>
                    </div>
                    
                    {/* Category */}
                    <div className="flex justify-between items-center">
                      <span className={`${post.categoryColor} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-slate-700 leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={() => likePost(post.id)}
                          className="flex items-center space-x-1 text-slate-500 hover:text-red-500 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-full bg-white group-hover:bg-red-50 flex items-center justify-center transition-colors border border-slate-200">
                            ❤️
                          </div>
                          <span className="text-sm font-medium">{post.likes}</span>
                        </button>
                        
                        <button className="flex items-center space-x-1 text-slate-500 hover:text-blue-500 transition-colors group">
                          <div className="w-8 h-8 rounded-full bg-white group-hover:bg-blue-50 flex items-center justify-center transition-colors border border-slate-200">
                            💬
                          </div>
                          <span className="text-sm font-medium">{post.comments}</span>
                        </button>
                        
                        <button className="flex items-center space-x-1 text-slate-500 hover:text-green-500 transition-colors group">
                          <div className="w-8 h-8 rounded-full bg-white group-hover:bg-green-50 flex items-center justify-center transition-colors border border-slate-200">
                            🔄
                          </div>
                          <span className="text-sm font-medium">{post.shares}</span>
                        </button>
                      </div>
                      
                      <button className="text-slate-400 hover:text-yellow-500 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-white hover:bg-yellow-50 flex items-center justify-center transition-colors border border-slate-200">
                          ⭐
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">📝</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No hay publicaciones</h3>
                <p className="text-slate-500">Sé el primero en compartir en esta categoría</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App