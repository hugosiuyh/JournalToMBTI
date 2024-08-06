from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
import openai
import os
from django.conf import settings
from dotenv import load_dotenv
import logging
import json
from rest_framework import status

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

logger = logging.getLogger(__name__)

class AnalyzeJournal(APIView):
    parser_classes = [JSONParser]

    def post(self, request, *args, **kwargs):
        try:
            blocks = request.data.get('blocks', [])
            logger.info(f"Received blocks: {blocks}")

            text_content_list = []
            for block in blocks:
                content = block.get('content', '')
                if isinstance(content, str):
                    text_content_list.append(content)
                elif isinstance(content, list):
                    for item in content:
                        if isinstance(item, str):
                            text_content_list.append(item)
                        elif isinstance(item, dict) and 'text' in item:
                            text_content_list.append(item['text'])
            text_content = ' '.join(text_content_list)
            context_summary = {
                        "role": "system",
                        "content": f"Analyze the following journal entries and determine the MBTI personality type: {text_content}, the structured response should start with 'Personality Type: MBTI type'(e.g. INTJ) for data processing, and then give a very detailed response analysing thie person's entries. IF and ONLY IF there is not enough to analyse, e.g. very short, or it is not a diary enrty, dont assume.Write 'Personality Type: None', and then write there's not enough to analyse",
                    }
            full_conversation = ([context_summary] + [{"role": "user", "content": text_content}])

            personality_type = self.analyze(full_conversation)
            print(personality_type)
            return Response({"personality_type": personality_type})
        
        except Exception as e:
            logger.error(f"Error analyzing journal: {str(e)}")
            return Response({"error": str(e)}, status=400)

    def analyze(self, text_content):
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=text_content
        )
        return response.choices[0].message.content
    
class FindFriends(APIView):
    file_path = os.path.join(settings.BASE_DIR, 'match_friends.json')

    @classmethod
    def get_compatibility_data(cls):
        with open(cls.file_path, 'r') as file:
            return json.load(file)["compatibility"]

    def post(self, request, *args, **kwargs):
        mbti_type = request.data.get('mbti_type')
        if not mbti_type:
            return Response({"error": "MBTI type is required"}, status=status.HTTP_400_BAD_REQUEST)

        compatibility_data = self.get_compatibility_data()

        if mbti_type not in compatibility_data:
            return Response({
                "Ideal": [],
                "Good": [],
                "Alright": [],
                "Not Ideal": [],
                "Uh-Oh, Think This One Through": []
            })

        compatibility = compatibility_data[mbti_type]
        return Response({
            "Ideal": compatibility.get("Ideal", []),
            "Good": compatibility.get("Good", []),
            "Alright": compatibility.get("Alright", []),
            "Not Ideal": compatibility.get("Not Ideal", []),
            "Uh-Oh, Think This One Through": compatibility.get("Uh-Oh, Think This One Through", [])
        })