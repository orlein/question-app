import {
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import React from "react";

type Answer = {
  id: number;
  text: string;
  min?: number;
  max?: number;
  score?: number;
  isChecked: boolean;
};

type QueryItem = {
  id: number;
  question: string;
  answers: Answer[];
  isAnswered: boolean;
  pickedAnswers: Answer[];
} & ({
  isPickOne: true;
  checkedAnswerId: QueryItem["pickedAnswers"][number]["id"];
} | {
  isPickOne: false;
});

type QuerySubject = {
  title: string;
  currentItem: number;
  queryItems: QueryItem[];
};

const initialQuerySubject: QuerySubject = {
  title: "샘플 질문임",
  currentItem: 0,
  queryItems: [
    {
      id: 1,
      question: "1. 당신 누구?",
      answers: [
        { id: 1, text: "학생", isChecked: false },
        { id: 2, text: "개발자", isChecked: false },
        { id: 3, text: "기획자", isChecked: false },
        { id: 4, text: "디자이너", isChecked: false },
        { id: 5, text: "고양이", isChecked: false },
        { id: 6, text: "기타", isChecked: false },
      ],
      isAnswered: false,
      isPickOne: false,
      pickedAnswers: [],
    },
    {
      id: 2,
      question: "2. 나이는 얼마? (만 나이로)",
      answers: [
        { id: 1, text: "00~19", isChecked: false },
        { id: 2, text: "20~29", isChecked: false },
        { id: 3, text: "30~39", isChecked: false },
        { id: 4, text: "40~49", isChecked: false },
        { id: 5, text: "그보다 더늙음", isChecked: false },
      ],
      isAnswered: false,
      isPickOne: true,
      checkedAnswerId: 1,
      pickedAnswers: [],
    },
    {
      id: 3,
      question: "3. 성별은?",
      answers: [
        { id: 1, text: "남", isChecked: false },
        { id: 2, text: "여", isChecked: false },
        { id: 3, text: "공격헬리콥터", isChecked: false },
        { id: 4, text: "나도모름", isChecked: false },
        { id: 5, text: "기타(ㅋㅋ)", isChecked: false },
      ],
      isAnswered: false,
      isPickOne: true,
      checkedAnswerId: 1,
      pickedAnswers: [],
    },
    {
      id: 4,
      question: "4. 어디사세여?",
      answers: [
        { id: 1, text: "한국", isChecked: false },
        { id: 2, text: "일본/중국", isChecked: false },
        { id: 3, text: "미국/캐나다", isChecked: false },
        { id: 4, text: "독일/영국/프랑스", isChecked: false },
        { id: 5, text: "영프독 이외의 유럽", isChecked: false },
        { id: 6, text: "동남아 + 싱가폴", isChecked: false },
      ],
      isAnswered: false,
      isPickOne: true,
      checkedAnswerId: 1,
      pickedAnswers: [],
    },
  ],
};

const slice = createSlice({
  name: "querySubject",
  reducers: {
    nextItem: (state) => {
      if (state.currentItem < state.queryItems.length) {
        state.currentItem = state.currentItem + 1;
      }
    },
    prevItem: (state) => {
      if (state.currentItem > 0) {
        state.currentItem = state.currentItem - 1;
      }
    },
    checkItemAnswer: (
      state,
      action: PayloadAction<{ queryItemId: number; answerId: number }>
    ) => {
      const queryItemIndex = state.queryItems.findIndex(
        (v) => v.id === action.payload.queryItemId
      );
      if (queryItemIndex < 0) {
        return;
      }


      const queryItem = state.queryItems[queryItemIndex]

      const answerIndex = queryItem.answers.findIndex(
        (v) => v.id === action.payload.answerId
      );
      if (answerIndex < 0) {
        return;
      }

      const answer = queryItem.answers[answerIndex];

      if (queryItem.isPickOne) {
        queryItem.checkedAnswerId = answer.id;
        queryItem.pickedAnswers = [answer];
      } else {
        answer.isChecked =
          !answer.isChecked;
  
        const pickedAnswerIndex = state.queryItems[
          queryItemIndex
        ].pickedAnswers.findIndex((v) => v.id === action.payload.answerId);
        if (pickedAnswerIndex > -1) {
          queryItem.pickedAnswers.splice(
            pickedAnswerIndex,
            1
          );
        } else {
          queryItem.pickedAnswers.push(
            answer
          );
        }
      }


      state.queryItems[queryItemIndex].isAnswered = true;
    },
  },
  initialState: initialQuerySubject,
});

const useQuerySubject = () => {
  const [state, dispatch] = React.useReducer(
    slice.reducer,
    initialQuerySubject
  );

  const handleNext = () => {
    dispatch(slice.actions.nextItem());
  };

  const handlePrev = () => {
    dispatch(slice.actions.prevItem());
  };

  const handleCheckItem = (
    payload: PayloadAction<{ queryItemId: number; answerId: number }>["payload"]
  ) => {
    dispatch(slice.actions.checkItemAnswer(payload));
  };

  const calc = {
    maxStep: state.queryItems.length,
    isBeginning: state.currentItem === 0,
    isEnding: state.currentItem === state.queryItems.length - 1,
  };

  return {
    handleNext,
    handlePrev,
    handleCheckItem,
    state,
    ...calc,
  };
};

export default useQuerySubject;
