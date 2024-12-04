from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv, find_dotenv
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver
from langchain_core.messages import HumanMessage
import os
from typing import Dict, Any

load_dotenv(find_dotenv())

if not os.getenv("GOOGLE_API_KEY"):
    raise EnvironmentError("GOOGLE_API_KEY environment variable is not set")

memory = MemorySaver()
model = ChatGoogleGenerativeAI(model="gemini-pro")

def create_agent():
    tools = []
    return create_react_agent(model, tools, checkpointer=memory)

agent = create_agent()

def process_agent_query(query: str) -> Dict[str, Any]:
    """Process a query through the agent and return a formatted response"""
    try:
        config = {"configurable": {"thread_id": "abc123"}}
        response = agent.invoke(
            {"messages": [HumanMessage(content=query)]},
            config
        )
        
        # Extract the relevant information from response
        return {
            "status": "success",
            "response": response.content if hasattr(response, 'content') else str(response),
            "metadata": {
                "thread_id": config["configurable"]["thread_id"]
            }
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
            "metadata": {
                "error_type": type(e).__name__
            }
        }