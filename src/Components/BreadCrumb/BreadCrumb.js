import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function BreadCrumb({ links }) {
  const nav = useNavigate();

  return (
    <div className="breadcrumb__list flex justify-between py-4 px-[14px] font-iransansfa">
      <div className="flex">
        {links.map((link, index) => (
          <p key={index} className="font-normal text-sm">
            <span
              onClick={() => nav(`${link.to}`)}
              className={`cursor-pointer ${
                index === links.length - 1 ? "text-black" : "text-[#7A7E83]"
              }`}
            >
              {link.title}
              {index !== links.length - 1 && (
                <span className="mx-2 text-[#7A7E83]">/</span>
              )}
            </span>
          </p>
        ))}
      </div>

      <div className=" md:flex hidden  gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M7.99962 9.5H11.9996M7.99962 13H14.9996M12.4996 20C17.194 20 20.9996 16.1944 20.9996 11.5C20.9996 6.80558 17.194 3 12.4996 3C7.8052 3 3.99962 6.80558 3.99962 11.5C3.99962 12.45 4.15547 13.3636 4.443 14.2166C4.55119 14.5376 4.60529 14.6981 4.61505 14.8214C4.62469 14.9432 4.6174 15.0286 4.58728 15.1469C4.55677 15.2668 4.48942 15.3915 4.35472 15.6408L2.71906 18.6684C2.48575 19.1002 2.36909 19.3161 2.3952 19.4828C2.41794 19.6279 2.50337 19.7557 2.6288 19.8322C2.7728 19.9201 3.01692 19.8948 3.50517 19.8444L8.62619 19.315C8.78127 19.299 8.85881 19.291 8.92949 19.2937C8.999 19.2963 9.04807 19.3029 9.11586 19.3185C9.18478 19.3344 9.27145 19.3678 9.44478 19.4345C10.3928 19.7998 11.4228 20 12.4996 20Z" stroke="#919498" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
        <span className="text-sm font-normal text-[#919498]">
          میدونستی میتونی رو فاصله های خالی برنامت کلیک کنی و لیست دروس مطابق
          اون تایمو ببینی؟
        </span>
      </div>
    </div>
  );
}
