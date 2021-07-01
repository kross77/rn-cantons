import {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";

export type EmptyField = undefined | null;

export type StringField = string;
export type MultilineField = string;
export type PhoneField = string;
export type PhotosField = string[];
export type SelectField<T> = T;
export type NumberField = number;
export type RatingField = number;

export type NumberOptionsField = {
  inputValue: string;
  optionValue: string;
};

export interface AuthorizationForm {
  phone: String;
}

export interface CargoForm {
  name: string;
  description: string;
  images: string[];
  weight: any;
  volume: any;
}

export interface FeedbackForm {
  score: number;
  message: string;
}

export interface ProfileForm {
  id: string
  avatar: string;
  fullName: string;
  unp: string;
  role: "driver" | "client";
}

export interface SearchForm {
  weight: any;
  volume: any;
  price: any;
  route: any;
  currentPosition: any;
  startDate: Date;
  endDate: Date;
}

export interface TenderForm {
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  route: any;
  weight: number;
  volume: number;
  images: string[];
  price: number;
  pickedDriverId?: string
  chats: {[driverId: string]: string}
}

export interface TenderReplyForm {
  message: string;
  price: number;
}

export interface TransportForm {
  type: string;
  number: number;
  carModel: string;
  yearIssue: string;
  spaceCapacity: number;
  capacity: number;
  pallets: number;
  photos: string[];
}

export interface CancelCommentForm {
  message: string
}

export interface Forms {
  profile: Partial<ProfileForm>;
  transport: Partial<TransportForm>;
  tender: Partial<TenderForm>;
  authorization: Partial<AuthorizationForm>;
  feedback: Partial<FeedbackForm>;
  search: Partial<SearchForm>;
  tenderReply: Partial<TenderReplyForm>;
  cancelComment: CancelCommentForm;
}

export default Forms;
