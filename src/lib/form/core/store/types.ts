import type { BlockAttributes, FormBlocks } from "../../types";

import type {
  SET_SUBMISSION_ERR,
  SET_SWIPER_STATE,
  COMPLETE_FORM,
  GO_NEXT,
  GO_PREV,
  GO_TO_BLOCK,
  INSERT_EMPTY_FIELD_ANSWER,
  SET_FIELD_ANSWER,
  SET_IS_FIELD_VALID,
  SET_FIELD_VALIDATION_ERR,
  SET_IS_FIELD_ANSWERED,
  SET_IS_FIELD_PENDING,
  SET_FIELD_PENDING_MSG,
  RESET_ANSWERS,
  SET_IS_REVIEWING,
  SET_IS_SUBMITTING,
} from "./constants";

export type Screen = {
  id: string;
  attributes?: BlockAttributes;
};

export type SwiperState = {
  walkPath: FormBlocks;
  welcomeScreens: Screen[];
  thankyouScreens: Screen[];
  currentBlockId: undefined | string;
  nextBlockId: undefined | string;
  lastActiveBlockId: undefined | string;
  prevBlockId: undefined | string;
  canSwipeNext: boolean;
  canSwipePrev: boolean;
  isAnimating: boolean;
  isThankyouScreenActive: boolean;
  isWelcomeScreenActive: boolean;
};

export type SubmissionState = {
  isReviewing: boolean;
  isSubmitting: boolean;
  submissionErr: string;
};

/**
 * Actions
 */
type SetSwiperAction = {
  type: typeof SET_SWIPER_STATE;
  swiperState: Partial<SwiperState>;
};

type GoNextAction = {
  type: typeof GO_NEXT;
  isSwiping?: boolean;
};

type GoPrevAction = {
  type: typeof GO_PREV;
};

type GoTonextBtn = {
  type: typeof GO_TO_BLOCK;
  id: string;
};

type CompleteFormAction = {
  type: typeof COMPLETE_FORM;
};

export type Answer = {
  isValid: boolean;
  isAnswered: boolean;
  isPending: boolean;
  pendingMsg: string | undefined;
  blockName: string;
  value: unknown;
  validationErr: string | undefined;
};

export type RendererAnswersState = Record<string, Answer>;

/**
 * Actions
 */
type InsertEmptyFieldAnswerAction = {
  type: typeof INSERT_EMPTY_FIELD_ANSWER;
  id: string;
  blockName: string;
};

type SetFieldAnswerAction = {
  type: typeof SET_FIELD_ANSWER;
  id: string;
  val: unknown;
};

type SetIsFieldValidAction = {
  type: typeof SET_IS_FIELD_VALID;
  id: string;
  val: boolean;
};

type SetIsFieldAnsweredAction = {
  type: typeof SET_IS_FIELD_ANSWERED;
  id: string;
  val: boolean;
};

type SetIsFieldPendingAction = {
  type: typeof SET_IS_FIELD_PENDING;
  id: string;
  val: boolean;
};

type SetFieldPendingMsg = {
  type: typeof SET_FIELD_PENDING_MSG;
  id: string;
  val: string;
};

type SetFieldValidationErr = {
  type: typeof SET_FIELD_VALIDATION_ERR;
  id: string;
  val: string;
};

type ResetAnswers = {
  type: typeof RESET_ANSWERS;
};

type SetIsReviewing = {
  type: typeof SET_IS_REVIEWING;
  val: boolean;
};

type SetIsSubmitting = {
  type: typeof SET_IS_SUBMITTING;
  val: boolean;
};

type SetSumbissionErr = {
  type: typeof SET_SUBMISSION_ERR;
  val: string;
};
export type RendererAnswersActionTypes =
  | InsertEmptyFieldAnswerAction
  | SetFieldAnswerAction
  | SetIsFieldValidAction
  | SetFieldValidationErr
  | SetIsFieldAnsweredAction
  | SetIsFieldPendingAction
  | SetFieldPendingMsg
  | ResetAnswers
  | ReturnType<() => { type: "NOOP" }>;

export type SwiperActionTypes =
  | SetSwiperAction
  | GoNextAction
  | GoPrevAction
  | GoTonextBtn
  | CompleteFormAction
  | ReturnType<() => { type: "NOOP" }>;

export type SubmitActionTypes =
  | SetIsReviewing
  | SetIsSubmitting
  | SetSumbissionErr
  | CompleteFormAction
  | ReturnType<() => { type: "NOOP" }>;
