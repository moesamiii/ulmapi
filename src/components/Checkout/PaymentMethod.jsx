import React from "react";

const PaymentMethod = () => {
  return (
    <div
      className="bg-white p-6 rounded-[24px] shadow-sm w-full max-w-[582px] text-right space-y-6"
      dir="rtl"
    >
      <h2 className="text-[20px] font-medium text-[#686767] leading-[100%]">
        اختر طريقة الدفع
      </h2>

      {/* بطاقة */}
      <label className="flex items-center justify-between border border-[#D8D8D8] rounded-[16px] px-4 py-4 cursor-pointer hover:bg-[#F9FAFB] transition-colors">
        <div className="relative flex items-center">
          <input
            type="radio"
            name="payment"
            className="absolute opacity-0 w-0 h-0 peer"
          />
          <div className="w-5 h-5 rounded-full border-2 border-[#D8D8D8] flex items-center justify-center peer-checked:border-[#0798F1] peer-focus-visible:ring-2 peer-focus-visible:ring-[#0798F1]/30">
            <div className="w-2.5 h-2.5 bg-[#0798F1] rounded-full opacity-0 scale-0 peer-checked:opacity-100 peer-checked:scale-100"></div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-1 justify-between">
          <div className="flex flex-col items-end text-right">
            <span className="text-[#1C1C1C] text-[14px] font-normal">
              الدفع باستخدام البطاقة
            </span>
          </div>
          <div className="flex gap-2">
            <img
              src="https://img.icons8.com/color/48/visa.png"
              alt="Visa"
              className="w-[61px] h-[42px]"
            />
            <img
              src="https://img.icons8.com/color/48/mastercard-logo.png"
              alt="MasterCard"
              className="w-[42px] h-[42px]"
            />
            <img
              src="https://img.icons8.com/color/48/paypal.png"
              alt="PayPal"
              className="w-[42px] h-[42px]"
            />
          </div>
        </div>
      </label>

      {/* كاش */}
      <label className="flex items-center justify-between border border-[#D8D8D8] rounded-[16px] px-4 py-4 cursor-pointer hover:bg-[#F9FAFB] transition-colors">
        <div className="relative flex items-center">
          <input
            type="radio"
            name="payment"
            className="absolute opacity-0 w-0 h-0 peer"
          />
          <div className="w-5 h-5 rounded-full border-2 border-[#D8D8D8] flex items-center justify-center peer-checked:border-[#0798F1] peer-focus-visible:ring-2 peer-focus-visible:ring-[#0798F1]/30">
            <div className="w-2.5 h-2.5 bg-[#0798F1] rounded-full opacity-0 scale-0 peer-checked:opacity-100 peer-checked:scale-100"></div>
          </div>
        </div>
        <span className="text-[#1C1C1C] text-[14px] font-normal flex-1 text-right pr-3">
          الدفع كاش في نيو أولم
        </span>
      </label>

      {/* تقسيط بنك */}
      <label className="flex items-center justify-between border border-[#D8D8D8] rounded-[16px] px-4 py-4 cursor-pointer hover:bg-gray-50">
        <div className="relative flex items-center">
          <input
            type="radio"
            name="payment"
            className="absolute opacity-0 w-0 h-0 peer"
          />
          <div className="w-5 h-5 border-2 border-[#D8D8D8] rounded-full flex items-center justify-center peer-checked:border-[#0099FF] peer-focus:ring-2 peer-focus:ring-[#0099FF]/30">
            <div className="w-2.5 h-2.5 bg-[#0099FF] rounded-full opacity-0 scale-0 peer-checked:opacity-100 peer-checked:scale-100"></div>
          </div>
        </div>
        <div className="flex flex-col items-end text-right flex-1 mr-2">
          <span className="text-[#1C1C1C] text-[14px] font-normal">
            دفع بالتقسيط عن طريق البنك
          </span>
          <span className="text-[#0798F1] text-[14px] font-medium">
            من 10 إلى JOD 1,000
          </span>
        </div>
      </label>

      {/* تقسيط موقع */}
      <label className="flex items-center justify-between border border-[#D8D8D8] rounded-[16px] px-4 py-4 cursor-pointer hover:bg-gray-50">
        <div className="relative flex items-center">
          <input
            type="radio"
            name="payment"
            className="absolute opacity-0 w-0 h-0 peer"
          />
          <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-[#0099FF] rounded-full opacity-0 scale-0 peer-checked:opacity-100 peer-checked:scale-100"></div>
          </div>
        </div>
        <div className="flex flex-col items-end text-right flex-1 mr-2">
          <span className="text-[#1C1C1C] text-[14px] font-normal">
            دفع بالتقسيط عن طريق الموقع
          </span>
          <span className="text-[#0798F1] text-[14px] font-medium">
            من 1,000 إلى JOD 10,000
          </span>
        </div>
      </label>
    </div>
  );
};

export default PaymentMethod;
