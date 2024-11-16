const { default: Captcha } = require("./captcha");
export const CaptchaInput = ({ captcha, onChange, setGeneratedCaptcha }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">
            Captcha <sup className="text-red-500">*</sup>
        </label>
        <div className="flex items-center mt-1 space-x-4">
            <input
                className="appearance-none block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                type="text"
                name="captcha"
                value={captcha}
                onChange={onChange}
                placeholder="Enter captcha"
            />
            <Captcha setCaptchaValue={setGeneratedCaptcha} />
        </div>
    </div>
);
