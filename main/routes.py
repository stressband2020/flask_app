from main import app
from flask import render_template, redirect, request
from flask_restplus import Resource, fields
from main import api
from main.pyrebase_db import *
from datetime import datetime, timedelta
from pytz import timezone
import sqlite3
import json
import plotly
import plotly.graph_objects as go


import pandas as pd

ASIA = timezone("Asia/Singapore")

def get_time():
    return datetime.now(ASIA)
    
def db_connect():
    global db
    global cursor
    db = sqlite3.connect("test.db")
    cursor = db.cursor()

def db_dc():
    db.commit()
    db.close()


db_connect()
cursor.execute("""CREATE TABLE IF NOT EXISTS data (
    id integer PRIMARY KEY,
    date text NOT NULL,
    bpm integer NOT NULL,
    temp integer NOT NULL,
    gsr integer NOT NULL,
    overall integer NOT NULL
)""")
db_dc()


@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('home.html', stress_val=90)

@app.route('/detailed_<mode>', methods=['GET', 'POST'])
def detailed(mode):

    tnow = get_time()
    tafter = tnow + timedelta(days=1)

    if mode == "graphs":
        return render_template('graph.html', mode=mode , tnow = str(tnow.strftime("%Y-%m-%d")), tafter=str(tafter.strftime("%Y-%m-%d")))
    elif mode == "tables": 
        return render_template('tables.html', mode=mode, tnow = str(tnow.strftime("%Y-%m-%d")), tafter=str(tafter.strftime("%Y-%m-%d")))

test_model = api.model("Test", {"bpm":fields.Integer("Bpm"), "gsr":fields.Integer("GSR"), "temp": fields.Integer("temperature")})


@api.route("/test")
class test(Resource):
    # @api.expect(test_model)   
    def post(self):

        db_connect()    

        # time = str(datetime.datetime.utcnow())
        # bpm = api.payload["bpm"]
        # temp = api.payload["temp"]
        # gsr = api.payload["gsr"]
        # overall = 5
        

        data = request.get_data().decode()
        # print(data)

        if data.count("{") >=2:
            print("error",data)
        elif data.count("{") == 1:
            try:
                data  = data.replace("'",'"')

                data = json.loads(data)
                
                print(type(data),data)

                tnow = get_time()
                tnow = tnow.strftime("%Y-%m-%d %H:%M:%S")
                overall = data["bpm"] + data["gsr"] + data["temperature"]
                # print(type(data["bpm"]),data["bpm"])    
                # bpm,temp,gsr,overall
                insert = f"""INSERT INTO data(date,bpm,temp,gsr,overall)
                VALUES('{tnow}',{data["bpm"]},{data["temperature"]},{data["gsr"]},{overall})"""
                cursor.execute(insert)
                db_dc()

                fdb.child("BPM").set(data["bpm"])
                fdb.child("Temperature").set(data["temperature"])
                fdb.child("GSR").set(data["gsr"])
                fdb.child("overall").set(overall)
            except:
                pass
        return "SUCCESS"
    
    def get(self):
        query = "SELECT * FROM data ORDER BY id DESC LIMIT 1"
        db_connect()
        cursor.execute(query)
        data = cursor.fetchall()
        print(data)
        db_dc()
        idd, time, bpm, temp, gsr, overall = data[0]
        return {"bpm":bpm, "temp":temp, "gsr":gsr, "overall":overall}
        # SELECT * FROM test WHERE date BETWEEN '2011-01-11' AND '2011-08-11'


@api.route("/graph")
class graph_route(Resource):
    def post(self):
        db_connect()
        print(api.payload)
        tnow = api.payload["tnow"]
        tafter = api.payload["tafter"]
        select = f"""SELECT * FROM data WHERE date BETWEEN '{tnow}' AND '{tafter}'"""
        cursor.execute(select)
        # for i in cursor.fetchall():
        #     print(i)

        df = pd.DataFrame(cursor.fetchall(),columns = ["id","date","bpm","temperature","gsr","overall"])
        df = df.set_index("id")
        print(df)

        if api.payload["mode"] == "graphs":
            return {
                "date":df["date"].to_list(),
                "bpm":df["bpm"].to_list(),
                "temperature": df["temperature"].to_list(),
                "gsr":df["gsr"].to_list(),
                "overall":df["overall"].to_list()
                }
        else:
            # df.reset_index(drop=True)
            # df = df.set_index("date")
            return df.to_html(classes="tables display")
