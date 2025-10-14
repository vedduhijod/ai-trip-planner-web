import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { HiMenu, HiX } from "react-icons/hi";
import axios from "axios";
import { toast } from "sonner";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => {
      console.error("Google login error:", error);
      toast("Google login failed");
    },
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    } catch (err) {
      console.error("Failed to fetch Google profile:", err);
      toast("Google auth failed");
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header className="p-4 shadow-sm flex justify-between items-center relative">
      {/* Logo */}
      <img
        src="logo.svg"
        className="w-28 sm:w-36 cursor-pointer"
        onClick={() => (window.location.href = "/")}
      />

      {/* Desktop Nav */}
      <div className="hidden sm:flex items-center gap-5">
        {user ? (
          <>
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full px-4 py-2">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full px-4 py-2">
                My trip
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-10 w-10 rounded-full cursor-pointer"
                />
              </PopoverTrigger>
              <PopoverContent className="w-44 p-2 rounded-lg shadow-md">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 hover:text-red-700 transition-all duration-200"
                >
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="sm:hidden relative z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="focus:outline-none"
        >
          {mobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>

        {/* Dropdown Menu */}
        <div
          className={`origin-top-right absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform ${
            mobileMenuOpen
              ? "opacity-100 scale-y-100"
              : "opacity-0 scale-y-0 pointer-events-none"
          }`}
          style={{ transformOrigin: "top" }}
        >
          {user ? (
            <>
              <a
                href="/create-trip"
                className="block px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                + Create Trip
              </a>
              <a
                href="/my-trips"
                className="block px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                My trip
              </a>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setOpenDialog(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Google Sign-In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-sm w-full">
          <DialogHeader>
            <DialogDescription className="flex flex-col items-center gap-4">
              <img
                src="logo.svg"
                alt="logo"
                className="w-24 sm:w-28"
              />
              <h2 className="font-bold text-lg">Sign in with Google</h2>
              <p className="text-center text-gray-600">
                Sign in to the App with Google authentication securely
              </p>
              <Button
                onClick={() => login()}
                className="mt-3 w-full flex gap-3 items-center justify-center px-4 py-2"
              >
                <FcGoogle className="h-6 w-6" /> Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default Header;
