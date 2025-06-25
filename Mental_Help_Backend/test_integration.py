from app import app, db, Conversation, ChatHistory
from datetime import datetime

def test_database_integration():
    with app.app_context():
        try:
            # Clear existing data
            ChatHistory.query.delete()
            Conversation.query.delete()
            db.session.commit()
            
            # Create test conversation
            conv = Conversation(id='test-conv')
            db.session.add(conv)
            db.session.commit()
            
            # Add test message
            msg = ChatHistory(
                conversation_id=conv.id,
                user_message="Test message",
                assistant_message="Test response",
                confidence=0.8,
                language="en"
            )
            db.session.add(msg)
            db.session.commit()
            
            print("✅ Database integration test passed")
            return True
        except Exception as e:
            print(f"❌ Database test failed: {str(e)}")
            return False

if __name__ == "__main__":
    test_database_integration()