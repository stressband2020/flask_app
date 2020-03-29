from main import app
import platform

SYSTEM = platform.system()

if SYSTEM == "Windows" or SYSTEM=="Linux":
    host = "localhost"
else:
    host = "0.0.0.0"

    
if __name__ == "__main__":
    app.run(debug=True, host=host, port=5000)
