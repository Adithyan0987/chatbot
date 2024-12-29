from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class ActionFeeStructure(Action):
    def name(self) -> Text:
        return "action_fee_structure"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        course = tracker.get_slot("course")
        fees = {
            "Engineering": "$15,000 per semester",
            "Science": "$10,000 per semester",
            "Arts": "$8,000 per semester"
        }
        
        fee = fees.get(course, "Course not found. Please provide a valid course.")
        dispatcher.utter_message(text=f"The fee for {course} is {fee}.")
        return []
