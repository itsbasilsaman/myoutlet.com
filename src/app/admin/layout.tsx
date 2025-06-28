"use client";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { useAppDispatch } from "@/hooks/useDispatch";
import { RootState } from "@/store";
import { clearAuth, setToken } from "@/store/slices/adminSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
   const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useSelector((state: RootState) => state.admin.token);

  useEffect(() => {
    if (token) return;

    const cookieToken = Cookies.get("accessToken");

    if (cookieToken) {
      dispatch(setToken(cookieToken));
    } else {
      dispatch(clearAuth());
      router.replace("/auth/login");
    }
  }, [token, dispatch, router]);
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
};

export default RootLayout;
