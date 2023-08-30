import ChatForm from 'components/chat/ChatForm';
import ChatMessages from 'components/chat/ChatMessages';
import ChatUser from 'components/chat/ChatUser';
import NoHeaderFooterLayout from 'components/layout/NoHeaderFooterLayout';
import { useGetChatData } from 'hooks/api/useGetChat';
import useHandleChat from 'hooks/useHandleChat';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user/atoms';

const ChatPage = () => {
  const { chatId } = useParams();
  const { userId } = useRecoilValue(userState);
  const { connectHandler } = useHandleChat();
  const { data, isError, isLoading } = useGetChatData(chatId);

  useEffect(() => {
    connectHandler(chatId);
  }, []);

  if (isError || isLoading) {
    return <></>;
  }

  return (
    <NoHeaderFooterLayout>
      <ChatUser user={data?.data.otherUserNickname} />
      <ChatMessages messages={data?.data.chatList} user={userId} />
      <ChatForm />
    </NoHeaderFooterLayout>
  );
};

export default ChatPage;
