const initState = {
  list: [
    {
      id: 1,
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      hasRead: false,
      title: "Ant Design Title 1",
      content:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to helpate their product prototypes beautifully and efficiently.",
      isLoading: false
    },
    {
      id: 2,
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      hasRead: true,
      title: "Ant Design Title 2",
      content:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their producty and efficiently.",
      isLoading: false
    },
    {
      id: 3,
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      hasRead: false,
      title: "Ant Design Title 3",
      content:
        "We supply a sernciples, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      isLoading: false
    },
    {
      id: 4,
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      hasRead: false,
      title: "Ant Design Title 4",
      content:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to helpate their product prototypes beautifully and efficiently.",
      isLoading: false
    },
    {
      id: 5,
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      hasRead: true,
      title: "Ant Design Title 5",
      content:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their producty and efficiently.",
      isLoading: false
    },
    {
      id: 6,
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      hasRead: false,
      title: "Ant Design Title 6",
      content:
        "We supply a sernciples, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      isLoading: false
    }
  ]
};

export default (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case "MARK_ALLNOTIFICATION_TO_READ":
      return {
        ...state,
        list: state.list.map(item => {
          item.hasRead = true;
          return item;
        })
      };
    case "MARK_ALLNOTIFICATION_TO_UNREAD":
      return {
        ...state,
        list: state.list.map(item => {
          item.hasRead = false;
          return item;
        })
      };
    case "START_MARK_TO_READ":
      if (action.payload && action.payload.id !== undefined) {
        const newList = state.list.map(item => {
          if (item.id === action.payload.id) {
            item.isLoading = true;
          }
          return item;
        });
        return {
          ...state,
          list: newList
        };
      } else {
        return {
          ...state,
          list: state.list.map(item => {
            item.isLoading = true;
            return item;
          })
        };
      }
    case "MARK_NOTIFICATION_TO_READ":
      const newList = state.list.map(item => {
        if (item.id === action.payload.id) {
          item.hasRead = true;
        }
        return item;
      });
      return {
        ...state,
        list: newList
      };
    case "FINISH_MARK_TO_READ":
      return {
        ...state,
        list: state.list.map(item => {
          item.isLoading = false;
          return item;
        })
      };
    default:
      return state;
  }
};
