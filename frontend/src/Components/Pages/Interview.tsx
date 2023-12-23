
import React, { useState } from "react";
// import axios from "axios";
import { Logic } from "./Logic";
import { useNavigate } from "react-router-dom";

const Interview: React.FC = () => {
  const [isMicrophoneAllowed, setIsMicrophoneAllowed] = useState(false);
  const [isCameraAllowed, setIsCameraAllowed] = useState(false);
  const [isScreenShared, setIsScreenShared] = useState(false);
  const [candidateStream, setCandidateStream] = useState<MediaStream | null>(null);
  const [isMicrophoneMuted, setIsMicrophoneMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const navigate = useNavigate();

  const handleAllowMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsMicrophoneAllowed(true);
      setCandidateStream(stream);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleAllowCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setIsCameraAllowed(true);
      setCandidateStream(stream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleShareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      setIsScreenShared(true);
      setCandidateStream(screenStream);
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };

  const handleStopShare = () => {
    if (candidateStream && isScreenShared) {
      const tracks = candidateStream.getTracks();
      tracks.forEach((track) => track.stop());
      setCandidateStream(null);
      setIsScreenShared(false);

      handleAllowCamera();
    }
  };

  const handleToggleMicrophone = () => {
    if (candidateStream) {
      const audioTracks = candidateStream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !isMicrophoneMuted;
      });
      setIsMicrophoneMuted(!isMicrophoneMuted);
    }
  };

  const handleToggleCamera = () => {
    if (candidateStream) {
      const videoTracks = candidateStream.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !isCameraOff;
      });
      setIsCameraOff(!isCameraOff);
    }
  };

  const handleEndInterview = () => {
    if (candidateStream) {
      candidateStream.getTracks().forEach((track) => track.stop());
      setCandidateStream(null);
      setIsMicrophoneAllowed(false);
      setIsCameraAllowed(false);
      setIsScreenShared(false);
    }
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Interviewer */}
      <div className="flex-1 p-4 bg-gray-100 border-r border-gray-200 flex flex-col items-center justify-center">
  <h2 className="text-2xl font-bold mb-4">Interviewer</h2>
  <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
    {/* Display local image for the interviewer */}
    <img src="https://img.freepik.com/premium-vector/cute-robot-waving-hand-cartoon-illustration_138676-2744.jpg" alt="" />
  </div>
</div>

      <div className="flex-1 p-4 bg-gray-200 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Candidate</h2>
        {!isMicrophoneAllowed && (
          <button
            className="btn-allow-microphone bg-blue-500 text-white hover:bg-blue-700 mb-2 px-4 py-2 rounded-md"
            onClick={handleAllowMicrophone}
          >
            Allow Microphone
          </button>
        )}
        {!isCameraAllowed && (
          <button
            className="btn-allow-camera bg-blue-500 text-white hover:bg-blue-700 mb-4 px-4 py-2 rounded-md"
            onClick={handleAllowCamera}
          >
            Allow Camera
          </button>
        )}

        {/* Display Candidate's Local Camera Video or Screen Share */}
        {isMicrophoneAllowed && (isCameraAllowed || isScreenShared) && (
          <div className="w-full mb-4">
            <video
              className="w-full h-auto rounded-md shadow-md"
              autoPlay
              playsInline
              ref={(videoRef) => {
                if (videoRef) videoRef.srcObject = candidateStream;
              }}
            />
          </div>
        )}

        {/* Display start interview message */}
        {isMicrophoneAllowed &&
          (isCameraAllowed || isScreenShared) &&
          !candidateStream && (
            <p className="text-gray-600 mb-4">
              Microphone and Camera are allowed. You can start the interview.
            </p>
          )}

        {/* Buttons for full functionality */}
        {isMicrophoneAllowed &&
          (isCameraAllowed || isScreenShared) &&
          candidateStream && (
            <div className="space-x-2">
              <button
                className={`btn-toggle-microphone bg-${isMicrophoneMuted ? "red" : "green"}-500 text-white hover:bg-gray-700 px-4 py-2 rounded-md`}
                onClick={handleToggleMicrophone}
              >
                {isMicrophoneMuted ? "Unmute Microphone" : "Mute Microphone"}
              </button>
              <button
                className={`btn-toggle-camera bg-${isCameraOff ? "red" : "green"}-500 text-white hover:bg-gray-700 px-4 py-2 rounded-md`}
                onClick={handleToggleCamera}
              >
                {isCameraOff ? "Turn On Camera" : "Turn Off Camera"}
              </button>
              {isScreenShared ? (
                <button
                  className="btn-stop-share bg-gray-800 text-white hover:bg-gray-700 px-4 py-2 rounded-md"
                  onClick={handleStopShare}
                >
                  Stop Share
                </button>
              ) : (
                <button
                  className="btn-share-screen bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
                  onClick={handleShareScreen}
                >
                  Share Screen
                </button>
              )}
              <button
                className="btn-end-interview bg-red-700 text-white hover:bg-red-900 px-4 py-2 rounded-md"
                onClick={handleEndInterview}
              >
                End Interview
              </button>
            </div>
          )}
      </div>
      <div className="flex-1 bg-gray-300 p-4">
        <Logic />
      </div>
    </div>
  );
};

export default Interview;
