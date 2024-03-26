export const CustomCheckbox = ({ checked, onChange }) => (
  <div
    className={`w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center ${
      checked ? "bg-gradient-to-r from-pink-500 to-blue-500" : ""
    }`}
    onClick={onChange}
  >
    {checked && <div className="w-3 h-3 bg-white rounded-full" />}
  </div>
);
