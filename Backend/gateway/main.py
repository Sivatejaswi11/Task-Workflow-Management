from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests


app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)



TASK_SERVICE = "http://localhost:8002"



@app.get("/")
def home():

    return {
        "message":"Gateway Running"
    }




@app.get("/task")
def get_tasks():

    response = requests.get(
        TASK_SERVICE + "/task"
    )

    return response.json()



@app.post("/task/createtask")
def create_task(data:dict):

    response = requests.post(

        TASK_SERVICE + "/task/createtask",

        json=data

    )


    return response.json()



@app.put("/task/{id}")
def update_task(id:str,data:dict):

    response = requests.put(

        TASK_SERVICE + "/task/" + id,

        json=data

    )


    return response.json()



@app.delete("/task/{id}")
def delete_task(id:str):

    response = requests.delete(

        TASK_SERVICE + "/task/" + id

    )
SPRING_SERVICE="http://localhost:8081"



@app.get("/users/profile/{email}")
def get_profile(email: str):

    response = requests.get(
        SPRING_SERVICE + "/users/profile/" + email
    )
@app.get("/task/user/{email}")
def get_user_tasks(email: str):

    response = requests.get(
        TASK_SERVICE + "/task/user/" + email
    )

    return response.json()