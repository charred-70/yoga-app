from math import acos, sqrt
from urllib import response
from fastapi import FastAPI
from fastapi.concurrency import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import cv2
import mediapipe as mp
import time
from fastapi.responses import StreamingResponse
import threading
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cap = None
streaming = False
cap_lock = threading.Lock()
curr_pose = None
targetAngles = [[165, 20, 20, 175, 175, 175, 175, 175],[160, 85, 85, 160, 150, 150, 175, 175],[165, 165, 165, 165, 70, 70, 175, 175],[130, 40, 30, 130, 70, 70, 110, 110], [35, 40, 30, 35, 170, 110, 180, 35]]
poseTolerance = [10, 20, 20, 20, 15]
poseList = ['mountain', 'seal', 'downwardDog','frog','tree']
acc = 0

class PoseRequest(BaseModel):
    pose: str


class PoseDetector():
    def __init__(self, staticImageMode=False, modelComplexity=1, smoothLandmarks=True, enableSegmentation=False, smoothSegmentation=True, minDetectionConfidence=0.5, minTrackingConfidence=0.5):
        self.staticImageMode = staticImageMode
        self.modelComplexity = modelComplexity
        self.smoothLandmarks = smoothLandmarks
        self.enableSegmentation = enableSegmentation
        self.smoothSegmentation = smoothSegmentation
        self.minDetectionConfidence = minDetectionConfidence
        self.minTrackingConfidence = minTrackingConfidence

        self.mpDraw = mp.solutions.drawing_utils
        self.mpPose = mp.solutions.pose
        self.pose = self.mpPose.Pose(self.staticImageMode, self.modelComplexity, self.smoothLandmarks, self.enableSegmentation, self.smoothSegmentation, self.minDetectionConfidence, self.minTrackingConfidence)

    # dis method draws on video
    def findPose(self, img, draw=True):

        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        self.results = self.pose.process(imgRGB)

        if self.results.pose_landmarks:
            if draw:
                self.mpDraw.draw_landmarks(img, self.results.pose_landmarks, self.mpPose.POSE_CONNECTIONS)

        return img

    def findPosition(self, img, draw=False):
        lmList = []
        if not self.results.pose_landmarks:
            return lmList

        for id, lm in enumerate(self.results.pose_landmarks.landmark):
            h, w, c = img.shape
            cx, cy = int(lm.x * w), int(lm.y * h)

            lmList.append([id, cx, cy])

            if draw:
                cv2.circle(img, (cx, cy), 7, (255, 0, 0), cv2.FILLED)

        return lmList

def calculate_angle(x1, y1, x2, y2, x3, y3):
    v1 = (x1 - x2, y1 - y2)
    v2 = (x3 - x2, y3 - y2)
    dot = v1[0] * v2[0] + v1[1] * v2[1]
    v1_len = sqrt(v1[0]**2 + v1[1]**2)
    v2_len = sqrt(v2[0]**2 + v2[1]**2)
    angle = acos(dot / (v1_len * v2_len)) * (180.0 / 3.14159265)
    return angle

def angle_list(lmlist):
     angleList = []
    #user's right elbow (node 16, 14, 12)
     right_elbow = calculate_angle(lmlist[16][1], lmlist[16][2], lmlist[14][1], lmlist[14][2], lmlist[12][1], lmlist[12][2])
     angleList.append(int(right_elbow))
     #user's right armpit (node 14, 12, 24)
     right_armpit = calculate_angle(lmlist[14][1], lmlist[14][2], lmlist[12][1], lmlist[12][2], lmlist[24][1], lmlist[24][2])
     angleList.append(int(right_armpit))
    #user's left armpit (node 13, 11, 23)
     left_armpit = calculate_angle(lmlist[13][1], lmlist[13][2], lmlist[11][1], lmlist[11][2], lmlist[23][1], lmlist[23][2])
     angleList.append(int(left_armpit))
    #user's left elbow (node 15, 13, 11)
     left_elbow = calculate_angle(lmlist[15][1], lmlist[15][2], lmlist[13][1], lmlist[13][2], lmlist[11][1], lmlist[11][2])
     angleList.append(int(left_elbow))
    #user's right hip (node 24, 12, 26)
     right_hip = calculate_angle(lmlist[12][1], lmlist[12][2], lmlist[24][1], lmlist[24][2], lmlist[26][1], lmlist[26][2])
     angleList.append(int(right_hip))
    #user's left hip (node 23, 11, 25)
     left_hip = calculate_angle(lmlist[11][1], lmlist[11][2], lmlist[23][1], lmlist[23][2], lmlist[25][1], lmlist[25][2])
     angleList.append(int(left_hip))
    #user's right knee (node 26, 24, 28)
     right_knee = calculate_angle(lmlist[24][1], lmlist[24][2], lmlist[26][1], lmlist[26][2], lmlist[28][1], lmlist[28][2])
     angleList.append(int(right_knee))
    #user's left knee (node 25, 23, 27)
     left_knee = calculate_angle(lmlist[23][1], lmlist[23][2], lmlist[25][1], lmlist[25][2], lmlist[27][1], lmlist[27][2])
     angleList.append(int(left_knee))
     return angleList

# returns the accuracy of the user's pose to the chosen pose
def check_angles(angleList):
    global curr_pose, targetAngles, poseList, poseTolerance
    ind = poseList.index(curr_pose)
    target = targetAngles[ind]
    tolerance = poseTolerance[ind]
    total_error = 0
    for i in range(len(angleList)):
        total_error += abs(angleList[i] - target[i])
    average_error = total_error / len(angleList)
    if average_error > tolerance:
        return 0
    elif average_error > tolerance / 2:
        return 1
    return 2

def gen_frames():
    global cap, streaming, acc
    # cap = cv2.VideoCapture(0, cv2.CAP_AVFOUNDATION)

    pTime = 0
    detector = PoseDetector()
    try:
        while True:
            if not streaming:
                continue
            if cap is None:
                time.sleep(1)
                print("Camera not initialized")
                continue
            success, frame = cap.read()
            if not success:
                print("Failed to grab frame")
                break
            else:
                try:
                    frame = detector.findPose(frame)
                    lmList = detector.findPosition(frame, draw=False)
                    if len(lmList) != 0:
                        angleList = angle_list(lmList)

                    acc = check_angles(angleList)
                    # if acc != 0:
                        # print(acc)
                    #     print(angleList)
                    #     print('-------------------')
                except Exception as e:
                    print("mediapipe err")
                    continue

                cTime = time.time()
                fps = 1 / (cTime - pTime)
                pTime = cTime

                ret, buffer = cv2.imencode('.jpg', frame)
                if not ret:
                    print("jpeg err")
                    continue

                frame = buffer.tobytes()

                # if len(lmList) != 0:
                #     print(lmList)
                yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    except GeneratorExit:
        cap.release()
        print("Client disconnected, stopping stream")
        return

@app.get("/")
def index():
    return "index.html"

@app.get("/api/advice")
def get_advice():
    global curr_pose
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents="how do I improve my " + curr_pose + " yoga pose? Keep the response to 20 words. " \
        "Make the response formatting accessibility friendly for text to speech"
    )   
    return {"advice": response.text}

@app.put("/api/pose-checker")
def poseRenderer(req: PoseRequest):
    global poseList, curr_pose
    curr_pose = req.pose
    # user_message = req.message
    # print(user_message)
    # history.append({"role":"user", "content": user_message})

    return {"pose": req.pose}

@app.get("/api/video-feed")
def videoFeed():
    return StreamingResponse(
        gen_frames(),
        media_type="multipart/x-mixed-replace; boundary=frame",
    )

@app.get("/api/accuracy-score")
def accuracy_score():
    global acc
    return {"value": acc}

@app.post("/api/start-stream")
def api_start_stream():
    global cap, streaming
    with cap_lock:
        if cap is None or not cap.isOpened():
            cap = cv2.VideoCapture(0, cv2.CAP_AVFOUNDATION)  # macOS
        streaming = True
    return {"streaming": True}

@app.post("/api/stop-stream")
def api_stop_stream():
    global cap, streaming
    with cap_lock:
        streaming = False
        if cap is not None:
            cap.release()
            cap = None
    return {"streaming": False}
