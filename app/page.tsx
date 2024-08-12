"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import LoginButton from "../components/LoginButton";

interface DecodedToken {
  user_id: number;
  eth_address: string;
  edu_username: string;
  iss: string;
  iat: number;
  exp: number;
  aud: string;
  [key: string]: any;
}

const ELI5FORWEB3 = () => {
  const { authState } = useOCAuth();
  const [userInfo, setUserInfo] = useState<DecodedToken | null>(null);

  useEffect(() => {
    if (authState.idToken) {
      const decoded = jwtDecode<DecodedToken>(authState.idToken);
      setUserInfo(decoded);
    }
  }, [authState.idToken]);

  return (
    <div className="min-h-screen flex flex-col items-center pt-8">
      <Card className="w-full max-w-lg mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            ELI5 for Web3
          </CardTitle>
          <CardDescription className="text-center">
            {userInfo
              ? "You're connected with OCID! Ask anything about Blockchain."
              : "Connect with OCID to access the ELI5 for Web3 on EduChain."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {userInfo ? (
            <div className="text-center">
              <p className="font-semibold">Hello, {userInfo.edu_username}!</p>
              <p className="text-sm text-gray-600">
                Wallet: {userInfo.eth_address}
              </p>
            </div>
          ) : (
            <LoginButton />
          )}
        </CardContent>
      </Card>

      {userInfo && (
        <div className="w-full">
          <flowise-fullchatbot></flowise-fullchatbot>
          <Script
            src="https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
            type="module"
            strategy="lazyOnload"
            onLoad={() => {
              if (window.Chatbot) {
                window.Chatbot.initFull({
                  chatflowid: process.env.NEXT_PUBLIC_CHATFLOW_ID,
                  apiHost: process.env.NEXT_PUBLIC_FLOWISE_API_HOST,
                  theme: {
                    button: {
                      backgroundColor: "#000000",
                      size: "medium",
                      iconColor: "white",
                      dragAndDrop: true,
                    },
                    autoWindowOpen: {
                      autoOpen: true,
                      openDelay: 2,
                      autoOpenOnMobile: true,
                    },
                    chatWindow: {
                      showTitle: true,
                      title: "🤖 Explain like I'm five (ELI5) for Web3 ✨",
                      welcomeMessage:
                        "Welcome to ELI5 for Web3! I'm here to help you understand complex blockchain projects and Web3 concepts in a simple and fun way. Ask me anything 👈",
                      errorMessage:
                        "Unable to retrieve data from the server. Please try again later.",
                      backgroundColor: "#ffffff",
                      fontSize: 16,
                      botMessage: {
                        backgroundColor: "#f7f8ff",
                        textColor: "#000000",
                        showAvatar: true,
                        avatarSrc:
                          "https://raw.githubusercontent.com/billi-x4/ELI5forWeb3/main/public/eli5-logo.png",
                      },
                      userMessage: {
                        backgroundColor: "#000000",
                        textColor: "#ffffff",
                        showAvatar: true,
                        avatarSrc:
                          "https://raw.githubusercontent.com/billi-x4/ELI5forWeb3/main/public/usericon.png",
                      },
                      textInput: {
                        placeholder: "Type your question here...",
                        backgroundColor: "#ffffff",
                        textColor: "#000000",
                        sendButtonColor: "#000000",
                        maxChars: 500,
                        maxCharsWarningMessage:
                          "You exceeded the characters limit. Please input less than 500 characters.",
                        autoFocus: true,
                        sendMessageSound: true,
                        receiveMessageSound: true,
                      },
                      feedback: {
                        color: "#000000",
                      },
                      footer: {
                        textColor: "#000000",
                        text: "Build with ❤️ by Billi on",
                        company: "EduChain | Open Campus 📚",
                        companyLink: "https://www.opencampus.xyz/",
                      },
                    },
                  },
                });
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ELI5FORWEB3;
