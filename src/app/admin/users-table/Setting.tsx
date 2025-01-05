"use client";

import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import AdminEdit from "./AdminEdit";
interface Props {
  user: {
    id: number;
    isAdmin: boolean;
  };
}

const Setting = ({ user }: Props) => {
  const [settingOpen, setSettingOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setSettingOpen(true);
        }}
      >
        <CiSettings className="text-2xl text-main" />
      </button>
      {settingOpen && (
        <div className=" fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-40 flex-c">
          <div className="p-8 rounded-xl bg-white w-full md:w-2/5">
            <button
              onClick={() => {
                setSettingOpen(false);
              }}
            >
              <CgClose className="text-2xl text-red-800" />
            </button>
            <h3 className="text-2xl text-center mb-6">{"تعديل النشاط"}</h3>
            <AdminEdit user={user} />
          </div>
        </div>
      )}
    </>
  );
};

export default Setting;
