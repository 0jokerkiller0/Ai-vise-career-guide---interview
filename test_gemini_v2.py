import os
from google import genai
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("Error: GEMINI_API_KEY not found in .env file.")
else:
    try:
        # Use the provided model or fallback to gemini-1.5-flash if preview isn't available
        client = genai.Client(api_key=api_key)
        
        print("Testing with gemini-1.5-flash...")
        response = client.models.generate_content(
            model="gemini-1.5-flash", 
            contents="Explain how AI works in a few words"
        )
        print("\nSuccess! Response:")
        print("-" * 20)
        print(response.text)
        print("-" * 20)
    except Exception as e:
        print(f"\n❌ Error: {e}")
        if "404" in str(e):
            print("Tip: The model name might be incorrect or not available yet.")
