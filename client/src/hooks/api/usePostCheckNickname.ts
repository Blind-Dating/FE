import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import axiosClient from 'apis/axiosClient';

type ApiResponse = {
  status: string;
  message: string;
  data: boolean;
};

const postNicknameCheckFetcher = async (nickname: string): Promise<ApiResponse> => {
  const { data } = await axiosClient.post('api/check-nickname', { nickname: nickname });
  return data;
};

export const usePostCheckNickname = (
  setIsDuplicatedNickname: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { mutate: postCheckNicknameFn, isLoading } = useMutation<ApiResponse, AxiosError, string>(
    postNicknameCheckFetcher,
    {
      onSuccess: (res) => {
        if (res.data) {
          setIsDuplicatedNickname(true);
          alert('사용 가능한 닉네임입니다.');
        }
        if (!res.data) {
          setIsDuplicatedNickname(false);
          alert(res.message);
        }
      },
      onError: (error) => {
        alert(error.message);
      },
    }
  );

  return { postCheckNicknameFn, isLoading };
};
