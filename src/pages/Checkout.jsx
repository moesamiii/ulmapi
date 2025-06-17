import React, { useState } from "react";
import CheckoutNavbar from "../components/Checkout/CheckoutNavbar";
import CheckoutBreadcrumb from "../components/Checkout/CheckoutBreadcrumb";
import OrderSummary from "../components/Checkout/OrderSummary";
import SavedAddresses from "../components/Checkout/SavedAddresses";
import NewAddressForm from "../components/Checkout/NewAddressForm";
import PaymentMethod from "../components/Checkout/PaymentMethod";
import CheckoutFooter from "../components/Checkout/CheckoutFooter";

// ✅ Modal UI inside same file or can be moved to a separate component file
const PaymentConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md text-center shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png"
              alt="Lock Icon"
              className="w-8 h-8"
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-2">تأكيد الدفع</h2>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          سيتم خصم المبلغ من بطاقتك بعد تأكيد العملية. هل ترغب في المتابعة؟
        </p>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={onCancel}
            className="w-full border border-[#0798F1] text-[#0798F1] py-2 rounded-lg font-semibold text-sm"
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            className="w-full bg-[#0798F1] hover:bg-[#007dd1] text-white py-2 rounded-lg font-semibold text-sm"
          >
            تأكيد الدفع
          </button>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  const [showModal, setShowModal] = useState(false);

  const handlePaymentClick = () => {
    setShowModal(true);
  };

  const confirmPayment = () => {
    setShowModal(false);
    // ✅ Replace this with real payment logic
    alert("✅ تم تأكيد الدفع بنجاح");
  };

  const cancelPayment = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen text-right" dir="rtl">
      <CheckoutNavbar />
      <CheckoutBreadcrumb />

      <main className="max-w-[1280px] mx-auto mt-6 p-4 md:p-8 flex flex-col lg:flex-row-reverse gap-[20px] bg-white rounded-xl shadow-sm">
        <OrderSummary />

        <section className="w-full lg:w-1/2 flex flex-col gap-6">
          <SavedAddresses />
          <NewAddressForm />
          <PaymentMethod />
        </section>
      </main>

      <div className="w-full flex justify-center px-4 md:px-[80px] mt-8">
        <button
          onClick={handlePaymentClick}
          className="w-full max-w-[400px] bg-[#0798F1] hover:bg-[#007dd1] text-white py-3 rounded-lg font-semibold text-sm"
        >
          إتمام الدفع
        </button>
      </div>

      {/* Modal Component */}
      <PaymentConfirmationModal
        isOpen={showModal}
        onConfirm={confirmPayment}
        onCancel={cancelPayment}
      />

      <CheckoutFooter />
    </div>
  );
};

export default Checkout;
