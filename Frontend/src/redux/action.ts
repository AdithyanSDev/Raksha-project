export const updateUserProfile = (updatedUser: any) => {
    return {
        type: 'UPDATE_USER_PROFILE',
        payload: updatedUser,
    };
};
