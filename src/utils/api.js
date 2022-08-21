export const getComments = async () => {
  return [
    {
      text: "it is one of the greatest library in js ecosystem",
      username: "Arun",
      userId: "arun10",
      commentId: "101",
      replyComments: [
        {
          username: "Kari",
          userId: "kari37",
          commentId: "1011",
          parentId: "101",
          text: "Yes, It is a great library but Angular is best for enterprise level application",
          replyCommentsThread: [
            {
              username: "Arun",
              userId: "Arunak",
              commentId: "10111",
              parentId: "1011",
              text: "Though Learning curve of angular is steeper than react",
            },
            {
              username: "Koti",
              userId: "Kotis",
              commentId: "10112",
              parentId: "1011",
              text: "I think both of them have their own trade off's",
            },
          ],
        },
        {
          username: "Robert De Niro",
          userId: "koti20",
          commentId: "1012",
          parentId: "101",
          text: "I agree 👍",
        },
      ],
      upVoteCount: 0,
    },
    {
      text: "It is easiest one compared to angular",
      username: "Sandra",
      userId: "Sandra11",
      commentId: "102",
      upVoteCount: 0,
    },
    {
      text: "Hooks are one of the best feature of react library",
      username: "Will Smith",
      userId: "willsmith12",
      commentId: "103",
      upVoteCount: 0,
    },
    {
      text: "React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies. React can be used as a base in the development of single-page, mobile, or server - rendered applications with frameworks like Next.js. However, React is only concerned with state management and rendering that state to the DOM, so creating React applications usually requires the use of additional libraries for routing, as well as certain client - side functionality.",
      username: "Denzal Washington",
      userId: "denzalwashington13",
      commentId: "104",
      upVoteCount: 0,
    },
  ];
};
