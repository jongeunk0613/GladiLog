import os, sys
from application import create_app

app = create_app(os.getenv('FLASK_ENV'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(sys.argv[1]))
