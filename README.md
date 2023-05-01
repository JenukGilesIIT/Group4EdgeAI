# Group4EdgeAI

The main objective of this project is to detect a threat and send alerts to the respective people.
All inputs have been taken from video files, but a live camera feed can be taken as input.

Custom_Object_Detection_using_YOLOv5.ipynb contains the training script for the model. Used yolov5
inference.ipynb contains the script used for inferencing.
model_data is for tracking and it is NOT the weights for the custom Yolov5 model

The models can not be uploaded due to the upload size limit constraints

Motion_detect.ipynb contains the motion detection script for the model.  

Web app is built using React JS and it connects to the python script running the model.
When an accident is detected, it will send the data to the web app.
Web app is refreshing itself constantly(every 10 seconds) and will update the ui
