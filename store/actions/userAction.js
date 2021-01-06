export const set_Profile_Data = 'set_Profile_Data';
export const set_Profile_Img = 'set_Profile_Img';
export const set_User_Score = 'set_User_Score';

export const setUserScoreData = data =>({
  type: set_User_Score,
  payload: data
})
export const setProfileData = data => ({
  type: set_Profile_Data,
  payload: data
});

export const setProfileImg = data => ({
  type: set_Profile_Img,
  payload: data
});


