from app import app, db, init_app

def init_database():
    with app.app_context():
        # Drop all existing tables
        db.drop_all()
        # Create all tables
        db.create_all()
        print("Database initialized successfully!")

if __name__ == "__main__":
    init_app(app)  # Initialize the app first
    init_database()