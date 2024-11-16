export const AadharInput = ({ aadhar, onChange }) => (
    <div>
        <label htmlFor="Aadhar" className="block text-sm font-medium text-gray-700">
            Aadhar Card Number <sup className="text-red-500">*</sup>
        </label>
        <div className="mt-1">
            <input
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                type="text"
                name="Aadhar"
                value={aadhar}
                onChange={onChange}
                placeholder="0000 0000 0000"
                maxLength="12"
            />
        </div>
    </div>
);
