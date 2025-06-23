const InputField = ({ label, type, name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-2 text-sm lg:text-base">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="w-full px-4 py-3 lg:px-6 lg:py-4 bg-gray-800 text-white rounded-full placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-400 transition-all text-sm lg:text-base"
    />
  </div>
);
export default InputField;