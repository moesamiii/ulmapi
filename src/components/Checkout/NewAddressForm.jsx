import React, { useState } from "react";
import { useAuthContext } from "../../features/auth/context/AuthProvider";

const NewAddressForm = () => {
  const { token, tokenReady } = useAuthContext(); // ✅ Now includes tokenReady

  const [formData, setFormData] = useState({
    givenName: "",
    surName: "",
    country: "JO",
    city: "",
    street: "",
    state: "",
    postalCode: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tokenReady || !token) {
      setStatusMessage("⏳ يرجى الانتظار... يتم تحميل التوكن");
      return;
    }

    const { givenName, surName, country, city, street, state, postalCode } =
      formData;

    if (
      !givenName.trim() ||
      !surName.trim() ||
      !country.trim() ||
      city.trim().length < 3 ||
      state.trim().length < 3 ||
      !street.trim() ||
      !postalCode.trim()
    ) {
      setStatusMessage("❌ الرجاء تعبئة جميع الحقول المطلوبة بشكل صحيح");
      return;
    }

    setStatusMessage("جارٍ إرسال البيانات...");

    try {
      const response = await fetch(
        "https://test.newulmmed.com/api/BillingAddress/AddBillingAddress",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setStatusMessage("✅ تم حفظ العنوان بنجاح");
      } else {
        const data = await response.json();
        console.error("Server Error:", data);
        setStatusMessage(`❌ ${data.statusMessage || "فشل الإرسال"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage("❌ حدث خطأ أثناء الاتصال بالخادم");
    }
  };

  return (
    <div
      className="bg-white p-6 rounded-xl shadow-sm w-full max-w-[582px]"
      dir="rtl"
    >
      <h3 className="text-base font-semibold mb-6 text-[#1C1C1C]">
        إضافة عنوان جديد
      </h3>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 text-sm text-right"
      >
        <InputField
          name="givenName"
          label="الاسم الأول"
          value={formData.givenName}
          onChange={handleChange}
        />
        <InputField
          name="surName"
          label="الاسم الأخير"
          value={formData.surName}
          onChange={handleChange}
        />
        <SelectField
          name="country"
          label="الدولة"
          value={formData.country}
          onChange={handleChange}
        />
        <InputField
          name="city"
          label="المدينة"
          value={formData.city}
          onChange={handleChange}
        />
        <InputField
          name="street"
          label="اسم الشارع"
          value={formData.street}
          onChange={handleChange}
        />
        <InputField
          name="state"
          label="المنطقة / الولاية"
          value={formData.state}
          onChange={handleChange}
        />
        <InputField
          name="postalCode"
          label="الرمز البريدي"
          value={formData.postalCode}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={!tokenReady}
          className={`bg-[#0798F1] hover:bg-[#007dd1] text-white text-sm font-medium px-6 py-2 rounded-[8px] self-end ${
            !tokenReady ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          حفظ
        </button>

        {statusMessage && (
          <p className="text-sm mt-2 text-right text-[#1C1C1C]">
            {statusMessage}
          </p>
        )}
      </form>
    </div>
  );
};

// ✅ Reusable Input Component
const InputField = ({ name, label, value, onChange }) => (
  <div>
    <label className="block mb-1 text-[#1C1C1C] font-medium">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={`أضف ${label}`}
      className="w-full border border-[#D8D8D8] rounded-[8px] p-3 bg-white placeholder:text-gray-400"
    />
  </div>
);

// ✅ Country Selector
const SelectField = ({ name, label, value, onChange }) => (
  <div>
    <label className="block mb-1 text-[#1C1C1C] font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-[#D8D8D8] rounded-[8px] p-3 bg-white"
    >
      <option value="JO">الأردن</option>
      <option value="SA">السعودية</option>
      <option value="EG">مصر</option>
      <option value="AE">الإمارات</option>
    </select>
  </div>
);

export default NewAddressForm;
