import React, { useRef, useEffect, useState, useContext } from 'react';
import * as tf from '@tensorflow/tfjs';
import { UserContext } from '../context/usercontext';
import { useNavigate } from 'react-router-dom';

function LiveVideo() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const { userImageUrl } = useContext(UserContext);
  const navigate = useNavigate();

  const loadModel = async () => {
    try {
      tf.disposeVariables();
      const loadedModel = await tf.loadLayersModel('/tfjs_model/model.json');
      setModel(loadedModel);
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Error loading model:', error);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  const detectLiveliness = async (inputTensor) => {
    if (!model) {
      console.error('Model not loaded');
      return false;
    }

    try {
      // Use the model to predict liveliness
      const prediction = await model.predict(inputTensor).data();
      const isLively = prediction[0] < 0.5; // Adjust threshold as needed
        console.log(prediction[0])
        console.log(prediction)

      console.log('Liveliness result:', isLively);
      return isLively;
    } catch (error) {
      console.error('Error detecting liveliness:', error);
      return false;
    }
  };

  const compareFaces = async (liveFrameBlob, userImageBlob) => {
    try {
      const formData = new FormData();
      formData.append('image1', liveFrameBlob, 'live_frame.jpg');
      formData.append('image2', userImageBlob, 'user_image.jpg');

      const response = await fetch('http://localhost:5000/compare_faces', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Face comparison failed :'
          );
      }

      const { are_faces_same } = await response.json();
      console.log('Are faces the same?', are_faces_same);
      return are_faces_same;
    } catch (error) {
      console.error('Error comparing faces:', error);
      return false;
    }
  };

  const captureAndProcessFrame = async () => {
    if (videoRef.current && canvasRef.current && userImageUrl) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = 160;
      canvas.height = 160;
  
      const context = canvas.getContext('2d', { willReadFrequently: true });
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  
      // Convert imageData to a tensor and normalize it
      let inputTensor = tf.browser.fromPixels(imageData)
        .toFloat()
        .div(255.0); // Normalize pixel values to [0, 1] range
  
      // Resize to 160x160
      inputTensor = tf.image.resizeBilinear(inputTensor, [160, 160]);
      inputTensor = inputTensor.expandDims(0); // Add batch dimension
  
      console.log('Tensor shape:', inputTensor.shape);
      console.log('Tensor data:', await inputTensor.array()); // Log the tensor data
  
      // Detect liveliness
      const isLively = await detectLiveliness(inputTensor);
      console.log('Is the user lively?', isLively);
  
      if (!isLively) {
        console.log('User is not lively');
        navigate('/verification-failure');
        return;
      }
  
      try {
        // Convert the tensor back to a data URL for sending it to the face comparison API
        const liveFrameBlob = await new Promise((resolve) => {
          tf.browser.toPixels(inputTensor.squeeze()).then((data) => {
            const newCanvas = document.createElement('canvas');
            newCanvas.width = canvas.width;
            newCanvas.height = canvas.height;
            const newContext = newCanvas.getContext('2d');
            const imgData = newContext.createImageData(canvas.width, canvas.height);
            imgData.data.set(data);
            newContext.putImageData(imgData, 0, 0);
            newCanvas.toBlob(resolve, 'image/jpeg');
          });
        });
  
        // Fetch the user image for comparison
        const userImageResponse = await fetch(userImageUrl);
        if (!userImageResponse.ok) {
          throw new Error('Failed to fetch the user image');
        }
        const userImageBlob = await userImageResponse.blob();
  
        // Compare the captured frame with the user's image
        const areFacesSame = await compareFaces(liveFrameBlob, userImageBlob);
  
        if (areFacesSame) {
          navigate('/verification-success');
        } else {
          navigate('/verification-failure');
        }
      } catch (error) {
        console.error('Error in face verification process:', error);
        navigate('/verification-failure');
      }
    }
  };
  

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setTimeout(captureAndProcessFrame, 2000); // Capture frame after 2 seconds
        };
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const stopStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Face Authentication</h1>
        <div className="relative aspect-video mb-6">
          <video
            ref={videoRef}
            autoPlay
            className="w-full h-full object-cover rounded-lg"
            style={{ transform: 'scaleX(-1)' }}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
        <button onClick={startStream} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Start Stream</button>
        <button onClick={stopStream} className="bg-red-500 text-white px-4 py-2 rounded-lg ml-4">Stop Stream</button>
      </div>
    </div>
  );
}

export default LiveVideo;
// import React, { useRef, useEffect, useState } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import Loader from './Loader'; // Import your Loader component
// import './liveVideo.css'; // Import custom CSS for styling

// const LiveVideo = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [model, setModel] = useState(null);
//   const [prediction, setPrediction] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);

//   // Load the TensorFlow.js model
//   useEffect(() => {
//     async function loadModel() {
//       try {
//         const model = await tf.loadLayersModel('/tfjs_model/model.json');
//         console.log('Model loaded:', model);
//         setModel(model);
//       } catch (error) {
//         console.error("Error loading model:", error);
//       }
//     }
    
//     loadModel();
//   }, []);

//   // Start the video stream
//   useEffect(() => {
//     const startVideo = () => {
//       navigator.mediaDevices
//         .getUserMedia({ video: true })
//         .then((stream) => {
//           videoRef.current.srcObject = stream;
//         })
//         .catch((err) => console.error("Error accessing webcam: ", err));
//     };

//     startVideo();
//   }, []);

//   // Capture frame and predict
//   const captureFrame = async () => {
//     setIsProcessing(true);

//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     // Draw the current video frame to the canvas
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);

//     // Convert the canvas image to a tensor
//     const imageData = tf.browser.fromPixels(canvas);
//     const resized = tf.image.resizeBilinear(imageData, [160, 160]);
//     const normalized = resized.div(255.0);
//     const batched = normalized.expandDims(0);

//     console.log("Preprocessed Tensor Shape:", batched.shape);
//     console.log("Tensor Data:", await batched.array());

//     if (model) {
//       try {
//         // Run the model on the captured frame
//         const preds = await model.predict(batched).data();
//         console.log("Model Predictions:", preds);

//         const predictionValue = preds[0];
//         setPrediction(predictionValue > 0.5 ? "Spoof" : "Real");
//       } catch (error) {
//         console.error("Error during prediction:", error);
//       }
//     }

//     imageData.dispose();
//     resized.dispose();
//     normalized.dispose();
//     batched.dispose();

//     setIsProcessing(false);
//   };

//   return (
//     <div className="live-video-container">
//       <h1>Face Spoof Detection</h1>
//       <video ref={videoRef} autoPlay className="video-feed" />
//       <canvas ref={canvasRef} width="160" height="160" style={{ display: 'none' }}></canvas>
//       <div className="button-container">
//         <button onClick={captureFrame} className="capture-button" disabled={isProcessing}>
//           {isProcessing ? "Processing..." : "Capture Frame"}
//         </button>
//       </div>
//       {isProcessing && <Loader />} {/* Show loader during processing */}
//       {prediction && <h2 className="prediction-result">{`Prediction: ${prediction}`}</h2>}
//     </div>
//   );
// };

// export default LiveVideo;
