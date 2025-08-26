const LoginPage = ({ onShowSignUp, onShowForgotPassword, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      <div className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
          </div>
          <span className="text-xl font-semibold">Stacks</span>
        </div>
        <div className="flex space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white rounded-full"></div>
          </div>
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white rounded-sm transform rotate-45"></div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-start justify-center px-6 opacity-30">
        <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
          Organize your work
          <br />
          smarter with Stacks
        </h1>
        <p className="text-xl text-blue-100 mb-12 max-w-2xl">
          Plans, notes, and tasks in one connected space. Clear structure.
          <br />
          Seamless flow. Fewer distractions.
        </p>
        <div className="flex space-x-4">
          <button className="bg-gray-600 text-white px-8 py-4 rounded-full text-lg font-medium opacity-50">
            Get Started
          </button>
          <button className="border-2 border-white border-opacity-30 text-white px-8 py-4 rounded-full text-lg font-medium opacity-50">
            Watch Demo
          </button>
        </div>
      </div>

      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to Stacks</h2>
            <p className="text-gray-500">Please login or sign up to continue</p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">📧</span>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
            </div>
            
            <div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔒</span>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">👁</span>
              </div>
            </div>

            <div className="text-right">
              <button
                onClick={onShowForgotPassword}
                className="text-sm text-blue-500 cursor-pointer hover:underline"
              >
                Forgot your password?
              </button>
            </div>

            <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
              Login
            </button>
          </div>

          <div className="mt-6 text-center">
            <span className="text-gray-500">Don't have an account? </span>
            <button
              onClick={onShowSignUp}
              className="text-blue-500 hover:underline font-medium"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};