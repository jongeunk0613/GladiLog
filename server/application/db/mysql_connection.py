import os
from dotenv import load_dotenv
import MySQLdb

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))


class DatabaseConnection():
    def __init__(self):
        self.host = os.environ.get('DB_HOST')
        self.user = os.environ.get('DB_USERNAME')
        self.passwd = os.environ.get('DB_PASSWORD')
        self.db = os.environ.get('DB_NAME')
        self.charset = 'utf8'
        self.conn = None
        self.cursor = None

    def open(self):
        self.conn = MySQLdb.connect(
            host=self.host, user=self.user, passwd=self.passwd,
            db=self.db, charset=self.charset
        )
        self.cursor = self.conn.cursor()

    def close(self):
        try: 
            if self.cursor:
                self.cursor.close()
                if self.conn:
                    self.conn.close()
        except BaseException as e:
            raise e
