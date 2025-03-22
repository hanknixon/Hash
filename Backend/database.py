import os
import psycopg2
from psycopg2.extras import RealDictCursor
from configparser import ConfigParser

config_path = os.path.join(os.path.dirname(__file__), "config.ini")

config = ConfigParser()
config.read(config_path)

if not config.sections():
    raise FileNotFoundError("Error: config.ini file not found or is empty!")

db_config = {
    "host": config.get("database", "HOST"),
    "port": config.getint("database", "PORT"),
    "user": config.get("database", "USER"),
    "password": config.get("database", "PASSWORD"),
    "dbname": config.get("database", "DATABASE"),
    "sslmode": config.get("database", "SSL_MODE")
}


def get_db_connection():
    try:
        conn = psycopg2.connect(**db_config)
        print("✅ Connected to PostgreSQL database!")
        return conn
    except psycopg2.Error as err:
        print(f"❌ Error: {err}")
        return None

def get_db_cursor():
    """Returns a database connection with RealDictCursor."""
    conn = get_db_connection()
    if conn:
        return conn.cursor(cursor_factory=RealDictCursor), conn
    return None, None

get_db_connection()
