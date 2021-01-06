export const set_Upload_Data = 'set_Upload_Data';
export const set_Download_Speed = 'set_Download_Speed';
export const set_Download_Max = 'set_Download_Max';
export const set_Upload_Speed = 'set_Upload_Speed';
export const set_Country_Code = 'set_Country_Code';


export const setDataPath = data => ({
  type: set_Upload_Data,
  payload: data
});

export const setDownloadSpeed = data => ({
  type: set_Download_Speed,
  payload: data
});

export const setDownloadMaxSpeed = data => ({
  type: set_Download_Max,
  payload: data
});

export const setUploadSpeed = data => ({
  type: set_Upload_Speed,
  payload: data
});
export const setCountryCode = data => ({
  type: set_Country_Code,
  payload: data
});
