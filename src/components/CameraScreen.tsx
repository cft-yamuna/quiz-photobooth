import { useState, useRef, useEffect } from 'react';
import { Camera, RotateCw, Check } from 'lucide-react';

interface CameraScreenProps {
  userName: string;
  onCapture: (photoDataUrl: string) => void;
}

export default function CameraScreen({ userName, onCapture }: CameraScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 1280, height: 720 },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError(null);
    } catch (err) {
      setError('Unable to access camera. Please grant camera permissions.');
      console.error('Camera error:', err);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedPhoto(dataUrl);
      }
    }
  };

  const retake = () => {
    setCapturedPhoto(null);
  };

  const confirmPhoto = () => {
    if (capturedPhoto) {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      onCapture(capturedPhoto);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-500 to-rose-600 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-rose-600 text-white py-6 px-8">
            <h2 className="text-3xl font-bold text-center">
              Say Cheese, {userName}!
            </h2>
            <p className="text-center text-orange-50 mt-2">
              {capturedPhoto ? 'Looking good! Confirm or retake' : 'Position yourself in the frame'}
            </p>
          </div>

          <div className="p-8">
            {error ? (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={startCamera}
                  className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <div className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-video mb-6">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${capturedPhoto ? 'hidden' : 'block'}`}
                  />
                  {capturedPhoto && (
                    <img
                      src={capturedPhoto}
                      alt="Captured"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <canvas ref={canvasRef} className="hidden" />

                <div className="flex gap-4">
                  {!capturedPhoto ? (
                    <button
                      onClick={capturePhoto}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-rose-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-orange-600 hover:to-rose-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
                    >
                      <Camera className="w-6 h-6" />
                      Capture Photo
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={retake}
                        className="flex-1 bg-gray-200 text-gray-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <RotateCw className="w-5 h-5" />
                        Retake
                      </button>
                      <button
                        onClick={confirmPhoto}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-rose-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-orange-600 hover:to-rose-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
                      >
                        <Check className="w-6 h-6" />
                        Confirm
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
