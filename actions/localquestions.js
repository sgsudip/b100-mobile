import Images from "../assets/images";

export default localQuestions = [
    { Question: 'Has any first degree relative (mother, father or any siblings) had any history of a: ', 
    Type:"MC", 
    options:[
        {
            image:Images.image1,
            option:"Bypass surgery "
        },
        {
            image:Images.image1,
            option:"Heart Attack "
        },
        {
            image:Images.image1,
            option:"Angioplasty or Stent "
        },
        {
            image:Images.image1,
            option:"Sudden death before the age of 55 for men and 65 for women "
        },
        {
            image:Images.image1,
            option:"Peripheral Arterial disease "
        },
        {
            image:Images.image1,
            option:"Abdominal aortic aneurysm "
        },
      ]
   },
   
  { Question: 'What is your BMI? Use chart below for reference. ', 
  Type:"FILL", 
  
  },
  
  { Question: 'Do you have any history of the following conditions:', 
    Type:"MC", 
    options:[
        {
            image:Images.image1,
            option:"Heart Attack"
        },
        {
            image:Images.image1,
            option:"Heart Failure"
        },
        {
            image:Images.image1,
            option:"Stroke"
        },
        {
            image:Images.image1,
            option:"Transient Ischemic Attack (TIA)"
        },
        {
            image:Images.image1,
            option:"Stent"
        },
        {
            image:Images.image1,
            option:"Peripheral Arterial disease"
        },
        {
          image:Images.image1,
          option:"Angioplasty"
      },
      {
          image:Images.image1,
          option:"Abdominal Aortic Aneurysm"
      },
      {
          image:Images.image1,
          option:"Coronary Artery Bypass Surgery"
      },
      {
          image:Images.image1,
          option:"Gout"
      },
      {
          image:Images.image1,
          option:"Chronic gum and/or tooth disease"
      },
      ]
   },
   { Question: 'Do you have any history of Kidney Disease', 
   Type:"YN", 
   options:{
       option1:
       {
           image:Images.image1,
           option:"Yes"
       },
       option2:
       {
           image:Images.image1,
           option:"No"
       },
   },
   subQuestionbool:true,
   subQuestionNum: 1,
   subQuestions:
       [{Question: 'Are you currently on Dialysis?', 
       Type:"YN", 
       options:{
           option1:
           {
               image:Images.image1,
               option:"Yes"
           },
           option2:
           {
               image:Images.image1,
               option:"No"
           }}
       }   
      ]
  },
  { Question: 'Do you have any history of Diabetes', 
   Type:"YN", 
   options:{
       option1:
       {
           image:Images.image1,
           option:"Yes"
       },
       option2:
       {
           image:Images.image1,
           option:"No"
       },
   },
   subQuestionbool:true,
   subQuestionNum: 1,
   subQuestions:
   [{Question: ' Do you use insulin for your Diabetes?', 
   Type:"YN", 
   options:{
       option1:
       {
           image:Images.image1,
           option:"Yes"
       },
       option2:
       {
           image:Images.image1,
           option:"No"
       },}
      }
  ]
  },
  { Question: 'Do you have any history of High Blood Pressure', 
   Type:"YN", 
   options:{
       option1:
       {
           image:Images.image1,
           option:"Yes"
       },
       option2:
       {
           image:Images.image1,
           option:"No"
       },
   },
   subQuestionbool:true,
   subQuestionNum: 3,
   subQuestions:
      [ {Question: 'When was the last time you checked your Blood Pressure?', 
      Type:"FILL"},
      {Question: ' How long have you had high blood pressure?', 
      Type:"FILL"},
      { Question: 'Is your blood Pressure controlled?', 
      Type:"YN", 
      options:{
          option1:
          {
              image:Images.image1,
              option:"Yes"
          },
          option2:
          {
              image:Images.image1,
              option:"No"
          },
      }
      }
  ]
  },
  { Question: 'Do you have any history of MODERATE or SEVERE sleep apnea? (diagnosed by a sleep study)', 
   Type:"YN", 
   options:{
       option1:
       {
           image:Images.image1,
           option:"Yes"
       },
       option2:
       {
           image:Images.image1,
           option:"No"
       },
   },
   subQuestionbool:true,
   subQuestionNum: 2,
   subQuestions:
      [ {Question: 'How many hours of sleep do you get per night on average?', 
      Type:"FILL"},
      { Question: 'Do you find yourself to be fatigued throughout the day?', 
      Type:"YN", 
      options:{
          option1:
          {
              image:Images.image1,
              option:"Yes"
          },
          option2:
          {
              image:Images.image1,
              option:"No"
          }
      }
  }
  ] 
  },
  { Question: 'Do you suffer from severe Migraines?', 
   Type:"YN", 
   options:{
       option1:
       {
           image:Images.image1,
           option:"Yes"
       },
       option2:
       {
           image:Images.image1,
           option:"No"
       },
   },
   subQuestionbool:false
  },
  { Question: 'Do you smoke cigarettes?', 
   Type:"YN", 
   options:{
       option1:
       {
           image:Images.image1,
           option:"Yes"
       },
       option2:
       {
           image:Images.image1,
           option:"No"
       },
   },
   subQuestionbool:true,
       subQuestionNum: 1,
       subQuestions:[{
          Question: '   How many cigarettes do you smoke per day?', 
          Type:"FILL" 
       }]
  },
  { Question: 'Are you a former cigarette smoker?', 
   Type:"YN",
   options:{
       option1:
       {
           image:Images.image1,
           option:"Yes"
       },
       option2:
       {
           image:Images.image1,
           option:"No"
       },
       
  },
  subQuestionbool:true,
       subQuestionNum: 1,
       subQuestions:[{
          Question: 'How many years ago did you quit?', 
          Type:"FILL" 
       }]
  },
  { Question: 'Do you use illicit street drugs?  If yes, please select all that apply.', 
    Type:"MC", 
    options:[
        {
            image:Images.image1,
            option:"Opioids: Herion, Opium",
        },
        {
            image:Images.image1,
            option:"Club Drugs: Ecstasy, Molly etc."
        },
        {
            image:Images.image1,
            option:"Cocaine, Meth"
        },
        {
          image:Images.image1,
          option:"Cannabinoids: Marijuana"
      },
      ],
      subQuestionbool:false
   },
   { Question: 'Over the last 10 years, on average: How many times a month did you eat red meat?', 
  Type:"FILL", 
  subQuestionbool:false
  },
  { Question: 'Over the last 10 years, on average: How many servings of fruit do you have per day?', 
  Type:"FILL", 
  subQuestionbool:false
  },
  { Question: 'Over the last 10 years, on average: How many servings of vegetables do you have per day?', 
  Type:"FILL", 
  subQuestionbool:false
  },
  { Question: 'Over the last 10 years, on average: How many servings of simple carbohydrates do you have per day?', 
  Type:"FILL",
  subQuestionbool:false 
  },
  { Question: 'Over the last 10 years, on average: How many servings of complex carbohydrates do you have per day?', 
  Type:"FILL",
  subQuestionbool:false 
  },
  { Question: 'Over the last 10 years, on average: How many alcoholic drinks do you have per day (8oz)?',
  Type:"FILL", 
  subQuestionbool:false
  },
  { Question: 'How many caffeinated products do you drink per day? (8 oz cups)?',
  Type:"FILL", 
  subQuestionbool:false
  },
  {
  Question: 'Are you in Menopause?', 
   Type:"YN", 
   options:{
       option1:
       {
           image:Images.image1,
           option:"Yes"
       },
       option2:
       {
           image:Images.image1,
           option:"No"
       }
   },
   subQuestionbool:true,
       subQuestionNum: 2,
       subQuestions:
          [ {Question: 'At what age at what age did you start menopause?', 
          Type:"FILL"},
          {Question: 'Are you  taking ESTROGEN replacement therapy? (ONLY IF AS A GEL OR CREAM, PATCH OR PELLET- NOT ORAL)', 
          Type:"FILL"}] 
  
   
  },
  { Question: 'How many different prescribed medications do you take on a daily basis?',
  Type:"FILL", 
  subQuestionbool:false
  },
  ];