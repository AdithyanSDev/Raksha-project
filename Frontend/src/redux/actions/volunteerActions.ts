// import { Dispatch } from 'redux';
// import { 
//     VOLUNTEER_REGISTER_REQUEST, 
//     VOLUNTEER_REGISTER_SUCCESS, 
//     VOLUNTEER_REGISTER_FAIL 
// } from '../constants/volunteerConstants';
// import { registerVolunteerService } from '../../services/volunteerService';
// import { RootState } from '../store';  // Assuming RootState is imported from your store
// import { ThunkAction } from 'redux-thunk';

// // Define the shape of your volunteerData object
// interface VolunteerData {
//     role: string;
//     skills: string[];
//     experience: number;
//     location: {
//         latitude: number;
//         longitude: number;
//     };
// }

// // Type your ThunkAction
// export const registerVolunteer = (
   
// ): ThunkAction<void, RootState, unknown, any> => async (dispatch: Dispatch) => {
//     try {
//         dispatch({ type: VOLUNTEER_REGISTER_REQUEST });

//         const data = await registerVolunteerService();

//         dispatch({
//             type: VOLUNTEER_REGISTER_SUCCESS,
//             payload: data,
//         });
//     } catch (error: any) {
//         dispatch({
//             type: VOLUNTEER_REGISTER_FAIL,
//             payload: error.response?.data.message || error.message,
//         });
//     }
// };
