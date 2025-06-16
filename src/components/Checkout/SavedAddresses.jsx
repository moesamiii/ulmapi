import React, { useEffect, useState } from "react";
import trashIcon from "../../assets/icons/trash.png";
import penIcon from "../../assets/icons/pen.png";
import { getToken } from "../../features/auth/utils/tokenUtils";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const SavedAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    givenName: "",
    surName: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    addressId: null,
  });

  const token = getToken();

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

  const confirmDelete = (id) => {
    setDeleteModal({ isOpen: true, addressId: id });
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `https://test.newulmmed.com/api/BillingAddress/DeleteBillingAddress/${deleteModal.addressId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("فشل الحذف");

      setAddresses((prev) =>
        prev.filter((addr) => addr.id !== deleteModal.addressId)
      );
      setDeleteModal({ isOpen: false, addressId: null });
    } catch (err) {
      console.error("Error deleting address:", err);
      alert("حدث خطأ أثناء الحذف");
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address.id);
    setFormData({ ...address });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        "https://test.newulmmed.com/api/BillingAddress/UpdateBillingAddress",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("فشل التحديث");

      setAddresses((prev) =>
        prev.map((addr) => (addr.id === formData.id ? { ...formData } : addr))
      );
      setEditingAddress(null);
    } catch (err) {
      console.error("Error updating address:", err);
      alert("حدث خطأ أثناء التحديث");
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
                  <button
                    onClick={() => handleEdit(address)}
                    className="w-[18px] h-[18px] p-[2px] bg-white rounded-md shadow-sm hover:opacity-80 transition"
                  >
                    <img
                      src={penIcon}
                      alt="Edit"
                      className="w-full h-full object-contain"
                    />
                  </button>
                  <button
                    onClick={() => confirmDelete(address.id)}
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

              {editingAddress === address.id && (
                <div className="mt-4 bg-gray-50 p-3 rounded-md space-y-2">
                  {[
                    { name: "givenName", label: "الاسم الأول" },
                    { name: "surName", label: "اسم العائلة" },
                    { name: "street", label: "الشارع" },
                    { name: "city", label: "المدينة" },
                    { name: "state", label: "المنطقة" },
                    { name: "country", label: "الدولة" },
                    { name: "postalCode", label: "الرمز البريدي" },
                  ].map((field) => (
                    <input
                      key={field.name}
                      type="text"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [field.name]: e.target.value,
                        }))
                      }
                      className="w-full border p-2 rounded text-sm"
                      placeholder={field.label}
                    />
                  ))}
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600 transition"
                  >
                    تحديث
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ReactModal
        isOpen={deleteModal.isOpen}
        onRequestClose={() =>
          setDeleteModal({ isOpen: false, addressId: null })
        }
        className="bg-white p-6 max-w-md mx-auto rounded-xl shadow-xl border outline-none text-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
      >
        <div
          className="flex flex-col items-center space-y-4 text-center"
          dir="rtl"
        >
          <div className="text-red-500 text-5xl">⚠️</div>
          <h2 className="text-lg font-bold text-[#1C1C1C]">تأكيد الحذف</h2>
          <p className="text-sm text-gray-600">
            هل أنت متأكد من حذف هذا العنوان؟ لا يمكن التراجع عن هذا الإجراء.
          </p>
          <div className="flex gap-4 justify-center mt-4 w-full">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-6 py-2 rounded-md text-sm hover:bg-red-600 w-full"
            >
              حذف
            </button>
            <button
              onClick={() => setDeleteModal({ isOpen: false, addressId: null })}
              className="bg-gray-200 text-[#1C1C1C] px-6 py-2 rounded-md text-sm hover:bg-gray-300 w-full"
            >
              رجوع
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default SavedAddresses;
