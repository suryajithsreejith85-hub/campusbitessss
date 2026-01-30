
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { FoodItem, CartItem, User, AppRoute } from './types';
import { MENU_ITEMS } from './data';
import FoodCard from './components/FoodCard';
import CartSidebar from './components/CartSidebar';
import AIAssistant from './components/AIAssistant';

// Simple Login Component
const Login: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [roll, setRoll] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin({
        id: 'user_1',
        name: 'suryajith',
        email: email || 'student@college.edu',
        rollNumber: roll || '20CS101',
        balance: 500
      });
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-indigo-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <div className="bg-indigo-100 p-4 rounded-2xl">
              <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">CampusBites</h2>
          <p className="text-center text-gray-500 mb-8">Login to order delicious meals</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">College Email</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="student@college.edu"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Roll Number</label>
              <input 
                type="text" 
                required 
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="e.g. 21BCE0123"
              />
            </div>
            <button 
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC<{ user: User, onLogout: () => void }> = ({ user, onLogout }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Breakfast', 'Lunch', 'Snacks', 'Drinks'];

  const addToCart = (item: FoodItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(0, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const handleCheckout = () => {
    const totalAmount = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0) * 1.05;
    
    // Razorpay Integration
    const options = {
      key: 'rzp_test_dummy', // This would be your real key
      amount: Math.round(totalAmount * 100), // amount in paise
      currency: 'INR',
      name: 'CampusBites Canteen',
      description: 'Canteen Food Payment',
      handler: function (response: any) {
        alert(`Payment successful! Order ID: ${response.razorpay_payment_id}. Your food will be ready in 15 mins.`);
        setCart([]);
        setIsCartOpen(false);
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: '9999999999'
      },
      theme: {
        color: '#4F46E5'
      }
    };

    if ((window as any).Razorpay) {
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } else {
      alert("Payment gateway error. Please try again.");
    }
  };

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      {/* Navbar */}
      <nav className="bg-white border-b sticky top-0 z-30 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 hidden sm:block">CampusBites</h1>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </button>
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.rollNumber}</p>
              </div>
              <button onClick={onLogout} className="text-sm text-red-600 font-semibold hover:underline">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        {/* Categories Scroller */}
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all shadow-sm ${
                activeCategory === cat 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-600 border border-gray-100 hover:border-indigo-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hero Section (Conditional) */}
        {activeCategory === 'All' && !searchQuery && (
          <div className="relative bg-indigo-600 rounded-3xl p-8 mb-12 text-white overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-extrabold mb-2">Feeling Hungry, {user.name.split(' ')[0]}?</h2>
              <p className="text-indigo-100 text-lg mb-6 max-w-md">Order your favorites and skip the queue. Freshly prepared for you!</p>
              <div className="flex gap-4">
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors">Popular Items</button>
                <button className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold border border-indigo-400">View Offers</button>
              </div>
            </div>
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full transform translate-x-1/4 -translate-y-1/4 opacity-50 blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-white rounded-full opacity-10"></div>
          </div>
        )}

        {/* Food Grid */}
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          {searchQuery ? `Results for "${searchQuery}"` : `${activeCategory} Menu`}
        </h3>
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border">
            <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <FoodCard key={item.id} item={item} onAdd={addToCart} />
            ))}
          </div>
        )}
      </main>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
had      />
      <AIAssistant />
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('campus_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('campus_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('campus_user');
  };

  return (
    <HashRouter>
      <Routes>
        <Route 
          path={AppRoute.LOGIN} 
          element={user ? <Navigate to={AppRoute.DASHBOARD} /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path={AppRoute.DASHBOARD} 
          element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to={AppRoute.LOGIN} />} 
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
