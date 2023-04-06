import sqlite3
from sqlite3 import Error

db_file = "db/app.db"

def create_connection():
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)
    return conn

def create_table(conn, query):
    try:
        cursor = conn.cursor()
        cursor.execute(query)
        cursor.close()
    except Error as e:
        print(e)

def creat_user(conn, user):
    try:
        query = """INSERT INTO users(id, name, handle, photo_url) VALUES(?, ?, ?, ?)"""
        cursor = conn.cursor()
        cursor.execute(query, user)
        conn.commit()
        cursor.close()
    except Error as e:
        print(e)

def creat_posts(conn, posts):
    try:
        query = """INSERT INTO posts(id, name, rating, comment, created_at, picture_url, user_id) VALUES(?, ?, ?, ?, ?, ?, ?)"""
        cursor = conn.cursor()
        cursor.executemany(query, posts)
        conn.commit()
        cursor.close()
    except Error as e:
        print(e)

def init():
    create_users_table_query = """CREATE TABLE IF NOT EXISTS users(
        id integer PRIMARY KEY,
        name text NOT NULL,
        handle text NOT NULL,
        photo_url text NOT NULL
    );"""
    create_posts_table_query = """CREATE TABLE IF NOT EXISTS posts(
        id integer PRIMARY KEY,
        name text NOT NULL,
        rating real NOT NULL,
        comment text NOT NULL,
        created_at text NOT NULL,
        picture_url text NOT NULL,
        user_id integer NOT NULL
    );"""
    with create_connection() as conn:
        create_table(conn, create_users_table_query)
        create_table(conn, create_posts_table_query)
        creat_user(conn, (1, "John Glenn", "@johnglenn", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/John_Glenn_Low_Res.jpg/1200px-John_Glenn_Low_Res.jpg"))
        creat_posts(conn, [(1, "Nageen Persian Food", 4.2, "Just ate at Nageen Persian Food and as usual it was amazing!!!", "2023-04-05 18:00:00", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnR6On_7yTLKHpD-F1526VWWrEBC6CvPncWA&usqp=CAU",1), 
            (2, "Taba Taba", 4.7, "Just reviewed Taba Taba, place is kinda mid.", "2023-04-01 12:00:00", "https://media.istockphoto.com/id/483120255/photo/asian-oranage-chicken-with-green-onions.jpg?s=612x612&w=0&k=20&c=0T_g_J5OSnmCei1Slgr1128wzAhzceRvLjd94R3gkgs=",1)])
