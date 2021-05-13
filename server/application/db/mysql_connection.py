import os
from dotenv import load_dotenv
import MySQLdb
from flask import jsonify

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
        try:
            self.conn = MySQLdb.connect(
                host=self.host, user=self.user, passwd=self.passwd,
                db=self.db, charset=self.charset
            )
            self.cursor = self.conn.cursor()
        except Exception as e:
            raise e

    def close(self):
        try:
            if self.cursor:
                self.cursor.close()
                if self.conn:
                    self.conn.close()
        except BaseException as e:
            raise e

    def call_procedure(self, procedure_name, params, with_commit=False):
        try:
            self.open()

            if params is None:
                self.cursor.callproc(procedure_name)
            else:
                self.cursor.callproc(procedure_name, params)

            row_headers = [rowh[0].lower() for rowh in self.cursor.description]
            rows = [row for row in self.cursor]
            result = []
            for row in rows:
                result.append(dict(zip(row_headers, row)))

            if with_commit:
                self.conn.commit()

            self.close()

            return result
        except Exception as e:
            self.close()
            raise e
