import { useContext, createContext, useState } from "react"
import { Layout } from "antd";
import { Menu } from "antd";
import sidbarLogo from "../../Assets/images/SidbarLogo.svg"
import unitSvg from "../../Assets/images/unit.svg"
import pinSvg from "../../Assets/images/pin-02.svg"
import unpinSvg from "../../Assets/images/pin-01.svg"
import "./Sidebar.css"
import aboutSvg from "../../Assets/images/17020 1.svg"
import caretSvg from "../../Assets/images/Caret.svg"
import profileSvg from "../../Assets/images/Avatar.svg"
import React from "react";
import react from "react";
import { hover } from "@testing-library/user-event/dist/hover";
import { Link } from "react-router-dom";
const SidebarContext = createContext()

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);
  const [pin, setPin] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <aside className="h-screen w-20">
      <nav className={`h-full flex flex-col absolute z-10  bg-white border-r  ${expanded ? "w-[272px]" : "w-20 "} px-4   font-iransans rounded-r-2xl  transition-all duration-300 overflow-hidden`}
        style={{ boxShadow: "0 16px 44px rgba(0, 0, 0, 0.07)" }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => pin ? null : setExpanded(false)}
      >
        <div className={`py-6 flex justify-between  items-center relative`}>
          <div className={`flex`}>
            <img
              src={sidbarLogo}
              className="w-8 mr-2"
              alt=""
            />
            <h1 className={`text-xl font-semibold transition-all duration-500 mr-2.5  ${expanded ? "" : "translate-x-40 absolute"
              }`}>یونیکـــــــو </h1>
          </div>
          <button
            onClick={() => setPin((curr) => !curr)}
            className={`p-1 rounded-full bg-white hover:bg-gray-100 border border-solid transition-all duration-30000 
  border-[#E2E8F0] transform ${expanded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"} absolute left-0`}
          >
            {!pin ? <img src={pinSvg} alt="" /> : <img src={unpinSvg} />}
          </button>

        </div>

        <SidebarContext.Provider value={{ expanded, activeIndex, setActiveIndex }}>
          <ul className="flex flex-col flex-1 gap-1 ">
            <SidebarItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9.99984 17.5L9.91646 17.3749C9.33759 16.5066 9.04816 16.0725 8.66576 15.7582C8.32722 15.4799 7.93714 15.2712 7.51784 15.1438C7.04421 15 6.52243 15 5.47886 15H4.33317C3.39975 15 2.93304 15 2.57652 14.8183C2.26292 14.6586 2.00795 14.4036 1.84816 14.09C1.6665 13.7335 1.6665 13.2668 1.6665 12.3333V5.16667C1.6665 4.23325 1.6665 3.76654 1.84816 3.41002C2.00795 3.09641 2.26292 2.84144 2.57652 2.68166C2.93304 2.5 3.39975 2.5 4.33317 2.5H4.6665C6.53335 2.5 7.46677 2.5 8.17981 2.86331C8.80701 3.18289 9.31695 3.69282 9.63653 4.32003C9.99984 5.03307 9.99984 5.96649 9.99984 7.83333M9.99984 17.5V7.83333M9.99984 17.5L10.0832 17.3749C10.6621 16.5066 10.9515 16.0725 11.3339 15.7582C11.6725 15.4799 12.0625 15.2712 12.4818 15.1438C12.9555 15 13.4772 15 14.5208 15H15.6665C16.5999 15 17.0666 15 17.4232 14.8183C17.7368 14.6586 17.9917 14.4036 18.1515 14.09C18.3332 13.7335 18.3332 13.2668 18.3332 12.3333V5.16667C18.3332 4.23325 18.3332 3.76654 18.1515 3.41002C17.9917 3.09641 17.7368 2.84144 17.4232 2.68166C17.0666 2.5 16.5999 2.5 15.6665 2.5H15.3332C13.4663 2.5 12.5329 2.5 11.8199 2.86331C11.1927 3.18289 10.6827 3.69282 10.3631 4.32003C9.99984 5.03307 9.99984 5.96649 9.99984 7.83333" stroke="#7A7E83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>} text={"انتخاب واحد"} link={"/unit"} index={0} />
            <SidebarItem icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#clip0_14579_208)">
                  <path d="M5.07847 9.35729C5.02668 9.02348 4.99981 8.68151 4.99981 8.33329C4.99981 4.65139 8.00421 1.66663 11.7103 1.66663C15.4165 1.66663 18.4209 4.65139 18.4209 8.33329C18.4209 9.16502 18.2675 9.96117 17.9875 10.6954C17.9293 10.8479 17.9002 10.9241 17.887 10.9836C17.8739 11.0426 17.8689 11.0841 17.8674 11.1445C17.866 11.2055 17.8743 11.2726 17.8908 11.4069L18.2263 14.1321C18.2626 14.4271 18.2808 14.5746 18.2317 14.6818C18.1887 14.7758 18.1123 14.8504 18.0174 14.8912C17.9091 14.9378 17.762 14.9162 17.4679 14.8731L14.8135 14.4841C14.675 14.4637 14.6056 14.4536 14.5425 14.4539C14.4801 14.4543 14.4369 14.4589 14.3758 14.4717C14.314 14.4847 14.2351 14.5143 14.0773 14.5734C13.3412 14.8491 12.5435 15 11.7103 15C11.3618 15 11.0196 14.9736 10.6854 14.9227M6.35949 18.3333C8.83023 18.3333 10.8332 16.2813 10.8332 13.75C10.8332 11.2187 8.83023 9.16663 6.35949 9.16663C3.88874 9.16663 1.8858 11.2187 1.8858 13.75C1.8858 14.2588 1.96673 14.7482 2.11613 15.2056C2.17928 15.3989 2.21085 15.4955 2.22122 15.5616C2.23204 15.6305 2.23393 15.6692 2.2299 15.7389C2.22604 15.8056 2.20935 15.881 2.17596 16.0319L1.6665 18.3333L4.16217 17.9925C4.29839 17.9739 4.3665 17.9646 4.42598 17.965C4.4886 17.9654 4.52184 17.9688 4.58326 17.981C4.64159 17.9926 4.7283 18.0233 4.90173 18.0845C5.35866 18.2457 5.84909 18.3333 6.35949 18.3333Z" stroke="#7A7E83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_14579_208">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            } text={"نظر سنجی اساتید"} link={"/poll"} index={1} />
            <SidebarItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M18.3332 6.66672V10.0001M8.5415 4.58338H5.6665C4.26637 4.58338 3.56631 4.58338 3.03153 4.85587C2.56112 5.09555 2.17867 5.478 1.93899 5.94841C1.6665 6.48319 1.6665 7.18325 1.6665 8.58338L1.6665 9.58338C1.66651 10.36 1.66651 10.7482 1.79337 11.0545C1.96253 11.4629 2.28699 11.7874 2.69536 11.9565C3.00165 12.0834 3.38994 12.0834 4.16651 12.0834V15.625C4.16651 15.8185 4.16651 15.9153 4.17453 15.9967C4.25247 16.788 4.87852 17.4141 5.66981 17.492C5.75129 17.5 5.84803 17.5 6.04151 17.5C6.23498 17.5 6.33172 17.5 6.4132 17.492C7.2045 17.4141 7.83054 16.788 7.90848 15.9967C7.91651 15.9153 7.91651 15.8185 7.91651 15.625V12.0834H8.54151C10.0135 12.0834 11.8142 12.8725 13.2034 13.6298C14.0139 14.0715 14.4191 14.2924 14.6845 14.2599C14.9306 14.2298 15.1167 14.1193 15.2609 13.9176C15.4165 13.7002 15.4165 13.2651 15.4165 12.3948V4.27195C15.4165 3.40171 15.4165 2.96659 15.2609 2.74912C15.1167 2.54747 14.9306 2.43697 14.6845 2.40682C14.4191 2.37432 14.0139 2.59521 13.2034 3.03701C11.8142 3.79431 10.0135 4.58338 8.5415 4.58338Z" stroke="#7A7E83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>} text={"سیستم اطلاع رسانی"} link={""} index={2} />
            <SidebarItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M17.0833 6.06478L9.99997 9.99996M9.99997 9.99996L2.91664 6.06478M9.99997 9.99996L10 17.9167M17.5 9.99999V6.61786C17.5 6.33232 17.5 6.18956 17.4579 6.06222C17.4207 5.94958 17.3599 5.84618 17.2795 5.75893C17.1886 5.66032 17.0638 5.59099 16.8142 5.45232L10.6475 2.02639C10.4112 1.89509 10.293 1.82944 10.1679 1.80371C10.0571 1.78093 9.94288 1.78093 9.83213 1.80371C9.70698 1.82944 9.58881 1.8951 9.35248 2.02639L3.18581 5.45232C2.93621 5.59099 2.8114 5.66032 2.72053 5.75894C2.64013 5.84618 2.57929 5.94958 2.54207 6.06223C2.5 6.18956 2.5 6.33233 2.5 6.61786V13.3821C2.5 13.6677 2.5 13.8104 2.54207 13.9378C2.57929 14.0504 2.64013 14.1538 2.72053 14.241C2.8114 14.3397 2.93621 14.409 3.18581 14.5477L9.35248 17.9736C9.58881 18.1049 9.70698 18.1705 9.83213 18.1963C9.94288 18.2191 10.0571 18.2191 10.1679 18.1963C10.293 18.1705 10.4112 18.1049 10.6475 17.9736L10.8333 17.8704M6.25 3.74999L13.75 7.91665M18.3333 17.9167L17.5 17.0833M18.3333 15C18.3333 16.3807 17.214 17.5 15.8333 17.5C14.4526 17.5 13.3333 16.3807 13.3333 15C13.3333 13.6193 14.4526 12.5 15.8333 12.5C17.214 12.5 18.3333 13.6193 18.3333 15Z" stroke="#7A7E83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>} text={"اشیاء گم شده"} link={""} index={3} />
            <hr className="my-3 bg-[#E2E8F0]" />
            <SidebarItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.4998 15.8333C12.4998 17.214 11.3805 18.3333 9.99977 18.3333C8.61906 18.3333 7.49977 17.214 7.49977 15.8333M11.4969 5.19876C11.8598 4.82383 12.0831 4.31297 12.0831 3.74996C12.0831 2.59937 11.1504 1.66663 9.99977 1.66663C8.84917 1.66663 7.91643 2.59937 7.91643 3.74996C7.91643 4.31297 8.13977 4.82383 8.50268 5.19876M14.9998 9.33329C14.9998 8.18402 14.473 7.08182 13.5353 6.26916C12.5976 5.45651 11.3258 4.99996 9.99977 4.99996C8.67368 4.99996 7.40192 5.45651 6.46423 6.26916C5.52655 7.08182 4.99977 8.18402 4.99977 9.33329C4.99977 11.2348 4.52821 12.6254 3.93982 13.6205C3.26922 14.7546 2.93391 15.3217 2.94715 15.4572C2.9623 15.6121 2.9902 15.661 3.11588 15.753C3.22574 15.8333 3.77769 15.8333 4.88159 15.8333H15.1179C16.2218 15.8333 16.7738 15.8333 16.8837 15.753C17.0093 15.661 17.0372 15.6121 17.0524 15.4572C17.0656 15.3217 16.7303 14.7546 16.0597 13.6205C15.4713 12.6254 14.9998 11.2348 14.9998 9.33329Z" stroke="#7A7E83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>} text={"اعلان ها"} link={""} index={4} />
            <SidebarItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.82936 16.1426L8.3164 17.2379C8.46118 17.564 8.69747 17.841 8.99659 18.0355C9.29571 18.2299 9.64483 18.3334 10.0016 18.3333C10.3583 18.3334 10.7075 18.2299 11.0066 18.0355C11.3057 17.841 11.542 17.564 11.6868 17.2379L12.1738 16.1426C12.3472 15.7539 12.6388 15.4298 13.0071 15.2166C13.3778 15.0028 13.8066 14.9118 14.2321 14.9564L15.4238 15.0833C15.7785 15.1208 16.1365 15.0546 16.4544 14.8927C16.7722 14.7309 17.0363 14.4802 17.2145 14.1713C17.393 13.8625 17.4781 13.5085 17.4593 13.1524C17.4406 12.7962 17.3189 12.4531 17.109 12.1648L16.4034 11.1953C16.1522 10.8476 16.018 10.429 16.0201 9.99996C16.02 9.57212 16.1555 9.15525 16.4071 8.80922L17.1127 7.83977C17.3226 7.55142 17.4443 7.20835 17.463 6.85219C17.4818 6.49602 17.3967 6.14208 17.2183 5.83329C17.04 5.52432 16.7759 5.2737 16.4581 5.11182C16.1402 4.94993 15.7822 4.88373 15.4275 4.92126L14.2358 5.04811C13.8103 5.0928 13.3815 5.00173 13.0108 4.78792C12.6418 4.5735 12.3501 4.24776 12.1775 3.85737L11.6868 2.762C11.542 2.43594 11.3057 2.15889 11.0066 1.96446C10.7075 1.77003 10.3583 1.66657 10.0016 1.66663C9.64483 1.66657 9.29571 1.77003 8.99659 1.96446C8.69747 2.15889 8.46118 2.43594 8.3164 2.762L7.82936 3.85737C7.6568 4.24776 7.36509 4.5735 6.99603 4.78792C6.62538 5.00173 6.19659 5.0928 5.77103 5.04811L4.57566 4.92126C4.22094 4.88373 3.86294 4.94993 3.54509 5.11182C3.22724 5.2737 2.96317 5.52432 2.78492 5.83329C2.60644 6.14208 2.52141 6.49602 2.54014 6.85219C2.55888 7.20835 2.68058 7.55142 2.89048 7.83977L3.59603 8.80922C3.84765 9.15525 3.98315 9.57212 3.98307 9.99996C3.98315 10.4278 3.84765 10.8447 3.59603 11.1907L2.89048 12.1601C2.68058 12.4485 2.55888 12.7916 2.54014 13.1477C2.52141 13.5039 2.60644 13.8578 2.78492 14.1666C2.96335 14.4754 3.22744 14.7259 3.54525 14.8878C3.86306 15.0496 4.22096 15.1159 4.57566 15.0787L5.76733 14.9518C6.19288 14.9071 6.62167 14.9982 6.99233 15.212C7.36277 15.4258 7.65583 15.7516 7.82936 16.1426Z" stroke="#7A7E83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.0001 12.5C11.3808 12.5 12.5001 11.3807 12.5001 9.99996C12.5001 8.61925 11.3808 7.49996 10.0001 7.49996C8.61939 7.49996 7.5001 8.61925 7.5001 9.99996C7.5001 11.3807 8.61939 12.5 10.0001 12.5Z" stroke="#7A7E83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>} text={"تنظیمات"} link={""} index={5} />
            <SidebarItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g clipPath="url(#clip0_14579_245)">
                <path d="M9.99984 13.3333V9.99996M9.99984 6.66663H10.0082M18.3332 9.99996C18.3332 14.6023 14.6022 18.3333 9.99984 18.3333C5.39746 18.3333 1.6665 14.6023 1.6665 9.99996C1.6665 5.39759 5.39746 1.66663 9.99984 1.66663C14.6022 1.66663 18.3332 5.39759 18.3332 9.99996Z" stroke="#7A7E83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_14579_245">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>} text={"پشتیبانی"} link={""} index={6} />

          </ul>
        </SidebarContext.Provider>
        {/* <div>
          <img src={aboutSvg} alt="" />
        </div> */}
        {/* <div className={`overflow-hidden transition-all duration-300 ${expanded ? "" : "hidden"}`}>
          <button type="button" className="text-base font-medium py-3 px-4 bg-[#EFB036] w-[224px] rounded-lg text-white">درباره ما</button>
        </div>
        
        <div className={`border-t flex items-center   py-6 h-[93px] ${expanded ? "gap-3" : ""}`}>
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-11 h-11 rounded-full"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all duration-300 ${
              expanded ? "ml-3" : ""
            }`}
          >
            <div className="leading-4">
              <h4 className="font-medium text-xs text-[#7A7E83]">خوش آمدید 👋</h4>
              <span className="text-sm text-[#383E46] font-medium ">علیرضا غفاری</span>
            </div>
            <img src={caretSvg} alt="" />

          </div>
        </div> */}
        <div className={`overflow-hidden about-us  transition-all duration-500   text-center ${expanded ? "opacity-100" : "opacity-0 translate-x-80"}`}>
          <button type="button" className="text-base font-medium py-3 px-4 flex m-auto justify-center items-center carretSvg   bg-[#EFB036] hover:bg-[#E09122] transition-all duration-300 w-[224px] rounded-lg text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={`opacity-0`  }>
              <path fillRule="evenodd" clipRule="evenodd" d="M7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L10.5858 10L7.29289 6.70711C6.90237 6.31658 6.90237 5.68342 7.29289 5.29289C7.68342 4.90237 8.31658 4.90237 8.70711 5.29289L12.7071 9.29289C13.0976 9.68342 13.0976 10.3166 12.7071 10.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071Z" fill="white" />
            </svg>
            <p className="transition-all duration-300 ml-4">درباره ما
            </p>
          </button>

        </div>
        <hr className="my-4 bg-[#E2E8F0]" />

        <div className={`pt-6 pb-4 flex justify-between   items-center relative`}>
          <div className={`flex flex-shrink-0`}>
            <img
              src={profileSvg}
              className="mr-1"
              alt=""
            />
            <div className={`leading-4 transition-all duration-500 mr-4 ${expanded ? "" : "translate-x-40 absolute"}`}>
              <h4 className="font-medium text-xs text-[#7A7E83]">خوش آمدید 👋</h4>
              <span className="text-sm text-[#383E46] font-medium ">علیرضا غفاری</span>
            </div>
            <button
              className={`p-1 rounded-full bg-white  transition-all duration-300 transform ${expanded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"} absolute left-0`}

            >
              <img src={caretSvg} alt="" />

            </button>

          </div>

        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, index , link }) {
  const { expanded, activeIndex, setActiveIndex } = useContext(SidebarContext);

  return (
    <li
      className={`h-[39px] flex items-center font-medium cursor-pointer transition-colors group text-sm font-iransans rounded-lg gap-2
        ${activeIndex === index ? "bg-[#E5F7F8] text-[#00ADB5] active" : "hover:bg-[#E5F7F8] text-[#7A7E83] hover:text-black"}
        ${expanded ? "" : ""}
      `}
      onClick={() => setActiveIndex(index)}
    >
      {/* Fixed-size icon wrapper */}
      <Link to={link}  className={`h-[39px] flex items-center font-medium cursor-pointer transition-colors group text-sm font-iransans rounded-lg gap-2
        ${activeIndex === index ? "bg-[#E5F7F8] text-[#00ADB5] active" : "hover:bg-[#E5F7F8] text-[#7A7E83] hover:text-black"}
        ${expanded ? "" : ""}
      `}>
      <div className={`flex items-center justify-center flex-shrink-0 transition-all duration-500 ${expanded ? "mr-5" : "mr-3.5"} `}>
        {icon}
      </div>
      {/* Text transition but icon remains fixed */}
      <span
        className={`overflow-hidden transition-all duration-500 ${expanded ? "ml-3" : "translate-x-40 absolute "
          }`}
      >
        {text}
      </span>
      </Link>
     
    </li>
  );
}

