from app import app, db
from sqlalchemy import inspect
import os

# Change the working directory
os.chdir(r"c:\Users\cbec\Desktop\New folder (2)\Mental_Help\Mental_Help_Backend")

with app.app_context():
    # Get the inspector
    inspector = inspect(db.engine)
    
    # Get all table names
    tables = inspector.get_table_names()
    print("Created tables:", tables)
    
    # Print table details
    for table_name in tables:
        print(f"\nTable: {table_name}")
        print("Columns:")
        for column in inspector.get_columns(table_name):
            print(f"  - {column['name']}: {column['type']}")