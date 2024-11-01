import { useState,useRef, useEffect } from "react";
import {
  useChatInteract,
  useChatMessages,
  IStep
} from "@chainlit/react-client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MessageCard from './MessageCard';

const Playground = () => {
  const scrollContainerRef = useRef(null);
  const [inputValue, setInputValue] = useState<string>("");
  const { sendMessage } = useChatInteract();
  const { messages } = useChatMessages();
  
  const handleSendMessage = () => {
    const content = inputValue.trim();
    if(content){
      const message = {
        name: "user",
        type: "user_message" as const,
        output: content,
      };
      sendMessage(message,[]);
      setInputValue("");
    }
  };

  const renderMessage = (message:IStep) => {
    return (
      <MessageCard
        key={message.id}
        message={message}
      />
    );
  }

  const handleScrollBottom = () => {
    //将滚动条拉到最下
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scrollContainer:any = scrollContainerRef.current;
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  }

  useEffect(()=>{
    /* 当messages变化时,将滚动条拉到最下 */
    handleScrollBottom();
  },[messages]);

  return (
    <div
      className="flex flex-col h-screen bg-gray-200"
    >
      {/* <div
        className="flex-none h-14 border-b-2 bg-slate-200"
      >

      </div> */}
      <div
        ref={scrollContainerRef}
        className="flex-1 p-5 overflow-y-scroll"
      >
        {
          messages.map((message)=>renderMessage(message))
        }
      </div>
      <div
        className="flex-none p-5 shadow-lg"
      >
        <div className="grid w-full gap-2">
          <Textarea
            placeholder="Type your message here."
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            onClick={handleSendMessage}
          >
            Send message
          </Button>
        </div>
      </div>
    </div>
  );
}

export { Playground };