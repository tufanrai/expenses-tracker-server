import React from "react";
import Link from "next/link";
import Home from "./page";
import Image from "next/image";
import background from "@/image/Logo_tufan.png";

export default function HeroPage() {
  return (
    <div className="w-full h-screen bg-slate-600/45 flex justify-center">
      <div className="max-w-[1280px] w-full h-full p-2 flex flex-col items-center justify-between">
        <header className="w-full bg-slate-600/75 rounded-lg">
          <nav>
            <ul className="w-full flex flex-row items-center justify-end p-5">
              <li className="mr-auto h-[50px] flex items-center">
                <h1 className="font-black text-2xl text-slate-300">
                  Expenses tracker.
                </h1>
              </li>
              <li className="mx-2 h-[50px] flex items-center">
                <Link href={"/auth/login"}>Log in</Link>
              </li>
              <li className="h-[50px] flex items-center">
                <Link href={"/auth/signup"}>Sign up</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="h-[50vh] w-full flex items-center">
          <div>
            <h1 className="font-bold text-blue-600 text-4xl ml-[8%]">
              Expenses Tracker,
            </h1>
            <h2 className="font-semibold text-blue-600 text-3xl ml-[8%]">
              improve your finance management
            </h2>
            <p className="font-light text-slate-300 text-md leading-[20px] ml-[8%]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Laboriosam, delectus. Accusamus, eius similique quia cum ipsum
              maiores tenetur vitae. Aliquid nemo veritatis reprehenderit,
              necessitatibus rerum voluptates placeat perspiciatis sint
              possimus?
            </p>
          </div>
          <img
            className="w-full h-full object-right object-contain"
            src={`${background.src}`}
            alt=""
          />
        </main>
        <footer>&#169; expenses-tracker | tufan rai</footer>
      </div>
    </div>
  );
}
