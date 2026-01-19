import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: '10 Consejos para una Vida Saludable',
      excerpt: 'Descubre cómo mantener un estilo de vida saludable con estos consejos prácticos...',
      author: 'Dr. William Cruz',
      date: '15 Ene 2026',
      category: 'Salud General',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Importancia de los Chequeos Regulares',
      excerpt: 'Los chequeos médicos regulares son fundamentales para detectar problemas de salud...',
      author: 'Dra. Ana Rodríguez',
      date: '12 Ene 2026',
      category: 'Prevención',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Nutrición y Bienestar',
      excerpt: 'Una alimentación balanceada es clave para mantener una buena salud física y mental...',
      author: 'Dr. Carlos Méndez',
      date: '10 Ene 2026',
      category: 'Nutrición',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Blog de Salud
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Artículos y consejos de nuestros especialistas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card overflow-hidden hover:scale-105 transition-transform cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium mb-3">
                {post.category}
              </span>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
              </div>
              <button className="mt-4 flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium group">
                <span>Leer más</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
