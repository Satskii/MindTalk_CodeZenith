from app import app, db, Conversation, ChatHistory
import os

def test_all_components():
    with app.app_context():
        try:
            # Test database
            db.create_all()
            print("✅ Database initialized")
            
            # Test conversation creation
            conv = Conversation(id='test-conv')
            db.session.add(conv)
            db.session.commit()
            print("✅ Conversation created")
            
            # Test chat history
            msg = ChatHistory(
                conversation_id=conv.id,
                user_message="Test message",
                assistant_message="Test response",
                confidence=0.8
            )
            db.session.add(msg)
            db.session.commit()
            print("✅ Chat history working")
            
            print("\n🎉 All components ready!")
            
        except Exception as e:
            print(f"❌ Error: {str(e)}")

if __name__ == "__main__":
    test_all_components()