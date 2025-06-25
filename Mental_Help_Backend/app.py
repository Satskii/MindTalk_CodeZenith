from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import ollama
import json
import traceback
import sys
import time
from prompts.prompt_manager import prompt_manager

app = Flask(__name__)
CORS(app)

def check_ollama_service():
    """Check if Ollama service is running and accessible"""
    max_retries = 3
    retry_delay = 2

    for attempt in range(max_retries):
        try:
            client = ollama.Client(host='http://localhost:11434')
            # Test connection with a simple ping
            client.embeddings(model='llama3.2:1b', prompt='test')  # Changed model
            return True
        except Exception as e:
            print(f"Attempt {attempt + 1}/{max_retries}: Unable to connect to Ollama service")
            print(f"Error: {str(e)}")
            if attempt < max_retries - 1:
                print(f"Retrying in {retry_delay} seconds...")
                time.sleep(retry_delay)
    return False

def initialize_model():
    """Initialize and verify the LLama2 model"""
    try:
        client = ollama.Client(host='http://localhost:11434')
        print("Checking for llama3.2:1b model...")  # Updated model name
        
        # List available models
        models = client.list()
        if not any(model['name'] == 'llama3.2:1b' for model in models['models']):  # Changed model
            print("llama3.2:1b model not found. Starting download...")  # Updated message
            # Pull with progress tracking
            for progress in client.pull('llama3.2:1b', stream=True):  # Changed model
                status = progress.get('status', '')
                completed = progress.get('completed', 0)
                total = progress.get('total', 0)
                if total > 0:
                    percentage = (completed / total) * 100
                    print(f"Download progress: {percentage:.2f}% - {status}")
        
        print("Model verification complete ✓")
        return True
    except Exception as e:
        print(f"Error initializing model: {str(e)}")
        return False

@app.route("/chat", methods=["GET", "POST"])
def chat():
    if request.method == "GET":
        return jsonify({
            "status": "online",
            "message": "Chat service is running"
        })

    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        user_input = data.get("message")
        selected_language = data.get("language", "en")
        
        if not user_input:
            return jsonify({"error": "No message provided"}), 400

        def generate():
            try:
                client = ollama.Client(host='http://localhost:11434')
                messages = prompt_manager.build_chat_prompt(
                    [],
                    user_input,
                    selected_language
                )
                
                # Send initial SSE message
                yield f"data: {json.dumps({'chunk': ''})}\n\n"
                
                response = client.chat(
                    model="llama3.2:1b",
                    messages=messages,
                    stream=True,
                    options={
                        "temperature": 0.7,
                        "top_p": 0.9,
                    }
                )

                for chunk in response:
                    if 'message' in chunk and 'content' in chunk['message']:
                        content = chunk['message']['content']
                        # Ensure proper SSE formatting
                        yield f"data: {json.dumps({'chunk': content})}\n\n"
                
                # Send final SSE message
                yield f"data: {json.dumps({'done': True})}\n\n"
                        
            except Exception as e:
                print(f"Stream error: {str(e)}")
                yield f"data: {json.dumps({'error': str(e)})}\n\n"

        return Response(
            generate(),
            mimetype='text/event-stream',
            headers={
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'X-Accel-Buffering': 'no',
                'Content-Type': 'text/event-stream'
            }
        )

    except Exception as e:
        print(f"Error in chat route: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "Mental Help Chat Backend",
        "version": "1.0.0"
    })

if __name__ == "__main__":
    print("Starting Mental Health Chat Backend...")
    
    if not check_ollama_service():
        print("ERROR: Ollama service is not running!")
        print("Please ensure Ollama is installed and running:")
        print("1. Install Ollama from: https://ollama.ai/download")
        print("2. Run 'ollama serve' in a separate terminal")
        sys.exit(1)
    
    if not initialize_model():
        print("ERROR: Failed to initialize the language model!")
        sys.exit(1)
    
    print("Starting Flask server...")
    app.run(debug=True, port=5000)
