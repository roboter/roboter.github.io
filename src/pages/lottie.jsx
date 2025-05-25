import React from "react";
import Lottie from 'react-lottie';
import animationData from '../assets/instagram.json';

export default function LottiePlayer() {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }}
    />
  );
}