"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("ba37c0a2-d460-4c5c-a311-fbb31dadbe3e");
  });

  return null;
};

export default CrispChat;
