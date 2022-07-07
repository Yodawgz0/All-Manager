import imp
from optparse import Option
from fastapi import FastAPI
from typing import Optional
import json
from pydantic import BaseModel

app = FastAPI()

class Person(BaseModel):
    id: Optional[int] = None
    name: str
    age: str
    gender: str
    
with open('people.json', 'r') as f:
    people = json.load(f)['people']


@app.get('/person/{p_id}', status_code=200)
def get_person(p_id: int):
    person = [p for p in people if p_id == p["id"]]
    return person[0] if len(person) > 0 else {}