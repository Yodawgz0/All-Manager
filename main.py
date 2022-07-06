import imp
from fastapi import FastAPI

app = FastAPI()


@app.get('/')
def hello():
    return {"Hello": "World"}

@app.post('/')
def hello_post():
    return {'you': 'posted'}

@app.get('/ash')
def ashley():
    return {"ash": "ley"}