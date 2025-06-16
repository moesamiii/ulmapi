import React, { useEffect, useState } from "react";
import trashIcon from "../../assets/icons/trash.png";
import penIcon from "../../assets/icons/pen.png";
import { getToken } from "../../features/auth/utils/tokenUtils"; // ✅ المسار الصحيح من الصورة

const SavedAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = getToken(); // ✅ التوكن من secure-ls

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!token) {
        alert("التوكن غير موجود، الرجاء تسجيل الدخول");
        return;
      }

      try {
        const res = await fetch(
          "https://test.newulmmed.com/api/BillingAddress/GetUserBillingAddresses?pageNumber=1&pageSize=10",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("فشل في تحميل العناوين");

        const data = await res.json();
        setAddresses(data.data || []);
      } catch (err) {
        console.error("Error fetching addresses:", err);
        alert("فشل تحميل العناوين");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `https://test.newulmmed.com/api/BillingAddress/DeleteBillingAddress/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("فشل الحذف");

      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    } catch (err) {
      console.error("Error deleting address:", err);
      alert("حدث خطأ أثناء الحذف");
    }
  };

  return (
    <div
      className="bg-white p-6 rounded-xl shadow-sm w-full max-w-[582px] text-right"
      dir="rtl"
    >
      <h2 className="text-xl font-bold mb-4 text-[#1C1C1C]">
        عنوان الفواتير المحفوظة
      </h2>

      {loading ? (
        <p className="text-gray-500">جاري التحميل...</p>
      ) : (
        <div className="space-y-3">
          {addresses.map((address, i) => (
            <div
              key={address.id}
              className={`relative rounded-[8px] border p-4 text-sm transition ${
                i === 0
                  ? "bg-[#F3FAFE] border-[#ADE4FF]"
                  : "bg-white border-[#D8D8D8]"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm text-[#1C1C1C]">
                    {address.givenName} {address.surName}
                  </p>
                  {i === 0 ? (
                    <div className="w-5 h-5 rounded-full bg-[#0099FF] flex items-center justify-center">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{
                          stroke: "white",
                          strokeWidth: 3,
                          shapeRendering: "geometricPrecision",
                        }}
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-gray-400" />
                  )}
                </div>

                <div className="flex gap-2">
                  <button className="w-[18px] h-[18px] p-[2px] bg-white rounded-md shadow-sm hover:opacity-80 transition">
                    <img
                      src={penIcon}
                      alt="Edit"
                      className="w-full h-full object-contain"
                    />
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="w-[18px] h-[18px] p-[2px] bg-white rounded-md shadow-sm hover:opacity-80 transition"
                  >
                    <img
                      src={trashIcon}
                      alt="Delete"
                      className="w-full h-full object-contain"
                    />
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-gray-500 leading-5">
                  {address.street}، {address.city}، {address.state}،{" "}
                  {address.country}
                </p>
                <p className="text-gray-400 mt-1 text-sm">
                  {address.postalCode}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedAddresses;
