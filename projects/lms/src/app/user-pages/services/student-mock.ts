// import { BFF } from '../models/schema-bff';

// const addDate = (dateToAdd: number) => {
//   const tomorrow = new Date();
//   tomorrow.setDate(new Date().getDate() + dateToAdd);
//   return tomorrow;
// };
// const tomorrowDate = () => addDate(1);
// const yesterdayDate = () => addDate(-1);

// const lessonQuestionsOne: BFF.Question[] = [
//   {
//     title: 'السؤال الاول',
//     questionType: BFF.QuestionType.SingleChoice,
//     answers: [
//       {
//         title: 'answer 1',
//         correct: true,
//       },
//       {
//         title: 'answer 2 23',
//         correct: false,
//       },
//     ],
//   },
//   {
//     title: 'السؤال الثاني sdf',
//     questionType: BFF.QuestionType.MultiChoice,
//     answers: [
//       {
//         title: 'answer 2',
//         correct: true,
//       },
//       {
//         title: 'answer 1 324',
//         correct: true,
//       },
//       {
//         title: 'answer 1 324',
//         correct: false,
//       },
//     ],
//   },
// ];

// const lessonQuestionsTwo: BFF.Question[] = [
//   {
//     title: 'السؤال الثاني',
//     questionType: BFF.QuestionType.SingleChoice,
//     answers: [
//       {
//         title: 'answer 2',
//         correct: true,
//       },
//       {
//         title: 'answer 2',
//         correct: false,
//       },
//     ],
//   },
// ];

// export const student: BFF.myPaths.Student = {
//   title: 'Razan',
//   lastTitle: 'Zabadneh',
//   image: '',
//   paths: [
//     {
//       id: 1,
//       title: 'المستوى الأول',
//       description: 'Learn Quran',
//       progress: 50,
//       courses: [
//         {
//           id: 1,
//           pathId: 1,
//           title: 'عقيدة',
//           description: 'عقيدة description',
//           dateFrom: new Date(),
//           dateTo: new Date(),
//           progress: 70,
//           lessons: [
//             {
//               lessonId: 1,
//               done: true,
//               title: 'lesson one',
//               description: 'lesson one',
//               present: true,
//               mark: 40,
//               date: new Date(),
//               questions: lessonQuestionsOne,
//             },
//             {
//               lessonId: 2,
//               done: false,
//               title: 'lesson 2',
//               description: 'lesson 2',
//               present: false,
//               mark: 40,
//               date: tomorrowDate(),
//               questions: lessonQuestionsTwo,
//             },
//           ],
//           quizzes: [
//             {
//               dateFrom: yesterdayDate(),
//               dateTo: tomorrowDate(),
//               title: 'exam 1',
//               questions: [...lessonQuestionsOne, ...lessonQuestionsTwo],
//             },
//           ],
//         },
//         {
//           id: 3,
//           pathId: 1,

//           title: 'عربي',
//           description: 'عربي description',
//           dateFrom: new Date(),
//           dateTo: new Date(),
//           progress: 70,
//           lessons: [
//             {
//               lessonId: 13,
//               done: true,
//               title: 'lesson 3',
//               description: 'lesson one',
//               present: true,
//               mark: 40,
//               date: new Date(),
//               questions: lessonQuestionsOne,
//             },
//           ],
//           quizzes: [
//             {
//               dateFrom: tomorrowDate(),
//               dateTo: addDate(2),
//               title: 'exam 2',
//               questions: [...lessonQuestionsOne, ...lessonQuestionsTwo],
//             },
//           ],
//         },
//         {
//           id: 2,
//           pathId: 1,

//           title: 'عربي',
//           description: 'عربي description',
//           dateFrom: new Date(),
//           dateTo: new Date(),
//           progress: 70,
//           lessons: [],
//           quizzes: [],
//         },
//       ],
//     },
//   ],
// };

// export const courses: BFF.myPaths.Course[] = [
//   {
//     id: 1,
//     pathId: 1,
//     title: 'عقيدة',
//     description: 'عقيدة description',
//     dateFrom: new Date(),
//     dateTo: new Date(),
//     progress: 70,
//     lessons: [
//       {
//         lessonId: 1,
//         done: true,
//         title: 'lesson one',
//         description: 'lesson one',
//         present: true,
//         mark: 40,
//         date: new Date(),
//         questions: [
//           {
//             title: 'السؤال الاول',
//             questionType: BFF.QuestionType.SingleChoice,
//             answers: [
//               {
//                 title: 'answer 1',
//                 correct: true,
//               },
//               {
//                 title: 'answer 2',
//                 correct: false,
//               },
//             ],
//           },
//           {
//             title: 'السؤال الثاني',
//             questionType: BFF.QuestionType.SingleChoice,

//             answers: [
//               {
//                 title: 'answer 2',
//                 correct: true,
//               },
//               {
//                 title: 'answer 2',
//                 correct: true,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         lessonId: 2,
//         done: false,
//         title: 'lesson 2',
//         description: 'lesson 2',
//         present: false,
//         mark: 40,
//         date: tomorrowDate(),
//         questions: [
//           {
//             title: 'السؤال الثاني',
//             questionType: BFF.QuestionType.SingleChoice,

//             answers: [
//               {
//                 title: 'answer 2',
//                 correct: true,
//               },
//               {
//                 title: 'answer 2',
//                 correct: true,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//     quizzes: [],
//   },
//   {
//     id: 2,
//     pathId: 2,
//     title: 'عربي',
//     description: 'عربي description',
//     dateFrom: new Date(),
//     dateTo: new Date(),
//     progress: 70,
//     lessons: [],
//     quizzes: [],
//   },
// ];
