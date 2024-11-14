import {IStep} from "@chainlit/react-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import ollama from './imgs/ollama.png';
import Markdown from 'react-markdown' ;

interface TProps {
  message: IStep;
}

const MessageCard = (props:TProps) => {
  const { message } = props;
  return (
    <div className={`flex ${message.type==="user_message"?"flex-row-reverse":"flex-row"} gap-5`}>
      <Avatar>
        <AvatarImage
          src={message.type==="user_message"?"https://github.com/shadcn.png":ollama}
          alt="@shadcn"
        />
        <AvatarFallback>
          S
        </AvatarFallback>
      </Avatar>
      <Card className="mb-5 max-w-lg">
        <CardHeader>
          <CardTitle>{message.name}</CardTitle>
          <CardDescription>
            {
              message.type
            }
          </CardDescription>
        </CardHeader>
        <CardContent
          style={{overflow:"auto"}}
        >
          <Markdown>
            {message.output}
          </Markdown>
        </CardContent>
        <CardFooter>
          <small style={{color:"#999999"}}>
            {new Date(message.createdAt).toLocaleString()}
          </small>
        </CardFooter>
      </Card>
    </div>
  );
}

export default MessageCard;