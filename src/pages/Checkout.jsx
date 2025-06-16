import React from "react";
import CheckoutNavbar from "../components/Checkout/CheckoutNavbar";
import CheckoutBreadcrumb from "../components/Checkout/CheckoutBreadcrumb";
import OrderSummary from "../components/Checkout/OrderSummary";
import SavedAddresses from "../components/Checkout/SavedAddresses";
import NewAddressForm from "../components/Checkout/NewAddressForm";
import PaymentMethod from "../components/Checkout/PaymentMethod";
import CheckoutFooter from "../components/Checkout/CheckoutFooter";

const Checkout = () => {
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
        <button className="w-full max-w-[400px] bg-[#0798F1] hover:bg-[#007dd1] text-white py-3 rounded-lg font-semibold text-sm">
          إتمام الدفع
        </button>
      </div>

      <CheckoutFooter />
    </div>
  );
};

export default Checkout;
