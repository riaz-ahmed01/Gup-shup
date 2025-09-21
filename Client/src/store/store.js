import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './slice/user/user.slice'
import useReducer from './slice/user/user.slice'
import { messageSlice } from './slice/message/message.slice'
import messageReducer from './slice/message/message.slice'
import { socketSlice } from './slice/socket/socket.slice'
import socketReducer from './slice/socket/socket.slice'

export const store = configureStore({
  
  reducer: {
    user: useReducer,
    message: messageReducer,
    socket: socketReducer,
    
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['socket.socket'],
      }
    });
  },

})
