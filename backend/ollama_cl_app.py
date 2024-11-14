from langchain_ollama import OllamaLLM
from langchain.prompts import ChatPromptTemplate
from langchain.schema import StrOutputParser
from langchain.schema.runnable import Runnable
from langchain.schema.runnable.config import RunnableConfig

import chainlit as cl

model = OllamaLLM(
    model="qwen2.5:7b",
)


@cl.on_chat_start
async def on_chat_start():
    runnable = model
    cl.user_session.set("runnable", runnable)
    await cl.Message(content="Connected to Chainlit!").send()


@cl.on_message
async def on_message(message: cl.Message):
    runnable = cl.user_session.get("runnable")  # type: Runnable

    msg = cl.Message(content="")

    await msg.send()

    async for chunk in runnable.astream(
      message.content
    ):
        await msg.stream_token(chunk)

    # await msg.send()
    message_history.append({"role": "assistant", "content": msg.content})
    await msg.update()