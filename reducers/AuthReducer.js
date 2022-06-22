import {
  EMAIL,
  FIRST_NAME,
  LAST_NAME,
  PHONE_NUMBER,
  ZIP_CODE,
  JOB_TITLE,
  INTRO_PROGRESS,
  VAL_CODE,
  UID,
  SEX,
  DATEOFBIRTH,
  FAIL,
  IMAGE,
  PROFILE,
  ERROR,
  SCORE,
  CLEAN,
  CLEAR_PHASE1,
  EDUCATION_LEVEL,
  WORK_STATUS,
  FEET,
  INCHES,
  WEIGHT,
  IS_LOADING,
  IS_PHASE1_DELETED,
  NOTIFICATIONS,
  CATEGORIES,
  PRODUCTS,
} from "../actions/types";

const INITIAL_STATE = {
  feet: "",
  inches: "",
  weight: "",
  educationLevel: "",
  phoneNumber: "",
  work_status: "",
  email: "",
  firstName: "",
  lastName: "",
  zipCode: "",
  jobTitle: "",
  valCode: "",
  uid: "",
  error: "",
  progress: 0,
  sex: "male",
  dob: "",
  image_url: "www.google.com",
  errorMessage: "",
  success: false,
  loading: false,
  is_phase1_deleted: false,
  testReultsReady: false,
  score: { numericScore: -1 },
  error: {
    message: "",
    status: "",
    success: false,
  },
  Notifications: [],
  categories: [],
  products: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WORK_STATUS:
      return { ...state, work_status: action.payload };
    case EDUCATION_LEVEL:
      return { ...state, educationLevel: action.payload };
    case EMAIL:
      return { ...state, email: action.payload };
    case SCORE:
      return { ...state, score: action.payload };
    case UID:
      return { ...state, uid: action.payload, success: true };
    case FIRST_NAME:
      return { ...state, firstName: action.payload };
    case LAST_NAME:
      return { ...state, lastName: action.payload };
    case PHONE_NUMBER:
      return { ...state, phoneNumber: action.payload };
    case ZIP_CODE:
      return { ...state, zipCode: action.payload };
    case JOB_TITLE:
      return { ...state, jobTitle: action.payload };
    case INTRO_PROGRESS:
      return { ...state, progress: action.payload };
    case SEX:
      return { ...state, sex: action.payload };
    case DATEOFBIRTH:
      return { ...state, dob: action.payload };
    case VAL_CODE:
      return { ...state, valCode: action.payload };
    case FAIL:
      return { ...state, errorMessage: action.payload, success: false };
    case IMAGE:
      return { ...state, image_url: action.payload };
    case PROFILE:
      // console.log("PROFILE", action.payload);
      const {
        sex,
        dob,
        lastName,
        firstName,
        email,
        image_url,
        testReultsReady,
        education_level,
        job_title,
        zip,
        work_status,
      } = action.payload;
      // console.log("ZIP2", zip);
      return {
        ...state,
        sex,
        dob,
        lastName,
        firstName,
        email,
        image_url: image_url,
        educationLevel: education_level,
        testReultsReady,
        jobTitle: job_title,
        zipCode: zip,
        work_status,
      };
    case FEET:
      return { ...state, feet: action.payload };
    case INCHES:
      return { ...state, inches: action.payload };
    case WEIGHT:
      return { ...state, weight: action.payload };
    case ERROR:
      return { ...state, error: action.payload };
    case CLEAN:
      return INITIAL_STATE;
    case CLEAR_PHASE1:
      return { ...state, testReultsReady: false };
    case IS_LOADING:
      return { ...state, loading: action.payload };
    case IS_PHASE1_DELETED:
      return { ...state, is_phase1_deleted: true };
    case NOTIFICATIONS:
      return { ...state, Notifications: action.payload };
    case CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};
