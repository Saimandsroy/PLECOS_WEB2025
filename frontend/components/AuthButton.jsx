const AuthButton = ({ children, onClick, type = "submit" }) => (
  <button
    type={type}
    onClick={onClick}
    className="w-full bg-cyan-200 hover:bg-cyan-400 text-gray-800 font-semibold py-3 px-4 lg:py-4 lg:px-6 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 mt-3 lg:mt-5 text-sm lg:text-base shadow-lg hover:shadow-xl active:shadow-none"
  >
    {children}
  </button>
);
export default AuthButton;