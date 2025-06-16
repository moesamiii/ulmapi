import React from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiShoppingCart, FiBell } from "react-icons/fi";
import avatar from "../../assets/avatar-man.png";
import logo from "../../assets/ulm-care-logo.png";

const CheckoutNavbar = () => {
  const navigate = useNavigate();
  return (
    <header className="pt-[64px] bg-[#F9FAFB]">
      <nav className="w-full max-w-[1440px] mx-auto bg-white border-b border-[#FFFFFF]">
        <div className="h-[42px] px-[80px] flex items-center justify-between">
          <div className="flex items-center gap-[42px]">
            <div className="w-[131.54px]">
              <img src={logo} alt="Ulm Care Logo" className="h-[36px]" />
            </div>
            <div className="flex gap-4 text-[#6F6F6F] text-base">
              <span
                onClick={() => navigate(-1)}
                className="text-[#0798F1] font-semibold cursor-pointer hover:underline"
              >
                الرئيسية
              </span>
              <div className="flex items-center gap-1 cursor-pointer">
                <span>خدماتنا</span>
                <FiChevronDown className="w-4 h-4 mt-1" />
              </div>
              <span>كونكت للأطباء</span>
              <span>الدعم</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-[#6F6F6F]">
              <FiBell className="w-6 h-6" />
              <FiShoppingCart className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1">
              <span>ENG</span>
              <FiChevronDown className="w-5 h-5" />
            </div>
            <img
              src={avatar}
              alt="Avatar"
              className="w-[42px] h-[42px] rounded-full object-cover"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default CheckoutNavbar;
