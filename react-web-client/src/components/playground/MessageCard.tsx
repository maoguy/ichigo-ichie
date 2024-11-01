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

interface TProps {
  message: IStep;
}

const MessageCard = (props:TProps) => {
  const { message } = props;
  return (
    <div className={`flex ${message.type==="user_message"?"flex-row-reverse":"flex-row"} gap-5`}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>
          S
        </AvatarFallback>
      </Avatar>
      <Card className="mb-5">
        <CardHeader>
          <CardTitle>{message.name}</CardTitle>
          <CardDescription>
            {
              message.type
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            {message.output}
          </p>
        </CardContent>
        <CardFooter>
          <small>
            {new Date(message.createdAt).toLocaleString()}
          </small>
        </CardFooter>
      </Card>
    </div>
  );
}

export default MessageCard;