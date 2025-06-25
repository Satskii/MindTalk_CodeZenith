from app import app, db
from sqlalchemy import inspect

def test_database():
    try:
        with app.app_context():
            # Test database connection
            db.create_all()
            print("✅ Database connection successful")
            
            # List all tables using inspector
            inspector = inspect(db.engine)
            tables = inspector.get_table_names()
            print(f"📋 Created tables: {tables}")
            
    except Exception as e:
        print(f"❌ Database error: {str(e)}")

if __name__ == "__main__":
    test_database()