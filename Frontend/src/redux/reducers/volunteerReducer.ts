import { 
    VOLUNTEER_REGISTER_REQUEST, 
    VOLUNTEER_REGISTER_SUCCESS, 
    VOLUNTEER_REGISTER_FAIL 
} from '../constants/volunteerConstants';

interface VolunteerState {
    loading: boolean;
    volunteerInfo?: any;  // volunteerInfo can be optional
    error?: string;
}

const initialState: VolunteerState = {
    loading: false,
    volunteerInfo: null,  // Explicitly set volunteerInfo to null initially
};

export const volunteerRegisterReducer = (state = initialState, action: any): VolunteerState => {
    switch (action.type) {
        case VOLUNTEER_REGISTER_REQUEST:
            return { ...state, loading: true };
        case VOLUNTEER_REGISTER_SUCCESS:
            return { loading: false, volunteerInfo: action.payload, error: undefined };
        case VOLUNTEER_REGISTER_FAIL:
            return { loading: false, error: action.payload, volunteerInfo: null };
        default:
            return state;
    }
};
