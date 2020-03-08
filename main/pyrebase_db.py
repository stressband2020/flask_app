import pyrebase

config = {
  "apiKey": "AIzaSyAqjVdnRqPEihWoA80Pa3cQDCALf-gVi_0",
  "authDomain": "stressband-bed7e.firebaseapp.com",
  "databaseURL": "https://stressband-bed7e.firebaseio.com",
  "storageBucket": "stressband-bed7e.appspot.com",
  "serviceAccount": "service_accout.json"
}

firebase = pyrebase.initialize_app(config)

fdb = firebase.database()


