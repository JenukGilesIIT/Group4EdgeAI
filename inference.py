# Import all needed libraries

import torch
import numpy as np
import cv2
import time
import os
import pandas
import smtplib
from email.message import EmailMessage
from datetime import datetime
# !pip install boto3 if boto3 is not present
import boto3

# Connect to Google Drive
from google.colab import drive
drive.mount('/content/gdrive')
!ln -s /content/gdrive/My\ Drive/ /mydrive
!ls /mydrive

# Extract all needed data
if not os.path.exists('train'):
    !unzip /content/gdrive/MyDrive/Coursework-EDGE_AI/human_vehicle_weapon_detection.zip -d /content/
    
    dirs = ['train', 'valid', 'test']

    for i, dir_name in enumerate(dirs):
        all_image_names = sorted(os.listdir(f"{dir_name}/images/"))
        for j, image_name in enumerate(all_image_names):
            if (j % 2) == 0:
                file_name = image_name.split('.png')[0]
                os.remove(f"{dir_name}/images/{image_name}")
                if os.path.exists((f"{dir_name}/labels/{file_name}.txt")):
                  os.remove(f"{dir_name}/labels/{file_name}.txt")

# Detect objects and send alerts
class ObjectDetection:
    """
    Class implements Yolo5 model to make inferences on a youtube video using OpenCV.
    """

    def __init__(self, capture_index, out_file, model_name):
        """
        Initializes the class with youtube url and output file.
        :param url: Has to be as youtube URL,on which prediction is made.
        :param out_file: A valid output file name.
        """
        self.model = self.load_model(model_name)
        self.classes = self.model.names
        self.out_file = out_file
        self.device = 'cuda' if torch.cuda.is_available() else 'cpu'
        print("\n\nDevice Used:",self.device)

    def get_video_capture(self):
      
        return cv2.VideoCapture(self.capture_index)


    def load_model(self, model_name):
        """
        Loads Yolo5 model from pytorch hub.
        :return: Trained Pytorch model.
        """
        if model_name:
            model = torch.hub.load('ultralytics/yolov5', 'custom', path=model_name, force_reload=True)
        else:
            model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
        return model


    def score_frame(self, frame):
        """
        Takes a single frame as input, and scores the frame using yolo5 model.
        :param frame: input frame in numpy/list/tuple format.
        :return: Labels and Coordinates of objects detected by model in the frame.
        """
        self.model.to(self.device)
        frame = [frame]
        results = self.model(frame)

        labels, cord = results.xyxyn[0][:, -1], results.xyxyn[0][:, :-1]
        return labels, cord

    def class_to_label(self, x):
        """
        For a given label value, return corresponding string label.
        :param x: numeric label
        :return: corresponding string label
        """
        return self.classes[int(x)]

    def email_alert(subject, body, to):
        msg = EmailMessage()
        msg.set_content(body)
        msg['subject'] = subject
        msg['to'] = to
        msg['from'] = "projecttest1441@gmail.com"

        user = "projecttest1441@gmail.com"
        password = "yjnuqushjtbmtiii"

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(user, password)
        server.send_message(msg)

        server.quit()

    def get_current_time():
      current_time = datetime.now()
      return(str(current_time.date()) + " at " + str(current_time.hour) + ":" + str(current_time.minute) + ":" + str(current_time.second) + " hrs")

    def plot_boxes(self, results, frame):
        """
        Takes a frame and its results as input, and plots the bounding boxes and label on to the frame.
        :param results: contains labels and coordinates predicted by model on the given frame.
        :param frame: Frame which has been scored.
        :return: Frame with bounding boxes and labels ploted on it.
        """
        labels, cord = results
        n = len(labels)
        if n != 0:
            x_shape, y_shape = frame.shape[1], frame.shape[0]
            for i in range(n):
                if self.class_to_label(labels[i]) == "p_head" or self.class_to_label(labels[i]) == "person":
                    if self.class_to_label(labels[i]) == "p_head":
                        row = cord[i]
                        if row[4] >= 0.8:
                            x1, y1, x2, y2 = int(row[0]*x_shape), int(row[1]*y_shape), int(row[2]*x_shape), int(row[3]*y_shape)
                            bgr = (0, 255, 0)
                            cv2.rectangle(frame, (x1, y1), (x2, y2), bgr, 2)
                            n_labels = (labels == i).sum()
                            if n_labels >= 3:
                                cv2.putText(frame, "CROWD ALERT!!!", (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 0.9, bgr, 2)
                                print("CROWD ALERT!!!")
                            else:
                                cv2.putText(frame, self.class_to_label(labels[i]), (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 0.9, bgr, 2)
                            
                if self.class_to_label(labels[i]) == "weapon":
                    msg_body = "Weapon detected on " + get_current_time()
                    email_alert("POSSIBLE THREAT DETECTED", msg_body, "jenukgiles@gmail.com")
                    row = cord[i]
                    if row[4] >= 0.8:
                        x1, y1, x2, y2 = int(row[0]*x_shape), int(row[1]*y_shape), int(row[2]*x_shape), int(row[3]*y_shape)
                        bgr = (0, 255, 0)
                        cv2.rectangle(frame, (x1, y1), (x2, y2), bgr, 2)
                        cv2.putText(frame, self.class_to_label(labels[i]), (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 0.9, bgr, 2)
        else:
            frame = None

        return frame
    
    def upload_file_to_aws(self):
        client = boto3.client(
            's3',
            aws_access_key_id = "AKIA6CLFRSPWCNQLXCXI",
            aws_secret_access_key = "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"
        )

        for file in os.listdir():
            if file == self.out_file:
                upload_file_bucket = 'possiblethreatbucket'
                upload_file_key = str(datetime.now().date()) + '/' + str(datetime.now().time()) + str(file)
                client.upload_file(file, upload_file_bucket, upload_file_key)

    def __call__(self):
        """
        This function is called when class is executed, it runs the loop to read the video frame by frame,
        and write the output into a new file.
        :return: void
        """
        cap = cv2.VideoCapture('./inference_videos/test_video.mp4')
        assert cap.isOpened()
        x_shape = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        y_shape = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        four_cc = cv2.VideoWriter_fourcc(*"MJPG")
        out = cv2.VideoWriter(self.out_file, four_cc, 20, (x_shape, y_shape))

        while cap.isOpened():
            
            start_time = time.perf_counter()
            ret, frame = cap.read()
            if not ret:
                break
            results = self.score_frame(frame)
            frame = self.plot_boxes(results, frame)
            if frame is not None:
              out.write(frame)
            
            end_time = time.perf_counter()
            fps = 1 / np.round(end_time - start_time, 3)
                        
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        
        self.upload_file_to_aws() 

# Create a new object and execute.
detection = ObjectDetection(capture_index=0, out_file="test_video.avi", model_name="./gdrive/MyDrive/Coursework-EDGE_AI/runs/runs/train/results_1/weights/best.pt")
detection()
