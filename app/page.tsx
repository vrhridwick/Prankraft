"use client";
import { useState } from "react";
import { CraveMate } from "@/components/cravemate/cravemate";
import Captcha from "@/components/Captcha";
import LoadingScreen from "@/components/LoadingScreen";
import GravityCrash from "@/components/GravityCrash";
import TherapyReveal from "@/components/TherapyReveal";

type Stage = "food" | "captcha" | "loading" | "crash" | "therapy";

export default function Home() {
  const [stage, setStage] = useState<Stage>("food");

  return (
    <>
      {stage === "food" && (
        <CraveMate onCheckout={() => setStage("captcha")} />
      )}
      {stage === "captcha" && (
        <Captcha onComplete={() => setStage("loading")} />
      )}
      {stage === "loading" && (
        <LoadingScreen onComplete={() => setStage("crash")} />
      )}
      {stage === "crash" && (
        <GravityCrash onComplete={() => setStage("therapy")} />
      )}
      {stage === "therapy" && <TherapyReveal />}
    </>
  );
}