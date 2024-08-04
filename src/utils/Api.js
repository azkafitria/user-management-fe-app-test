import { userUrl } from './Url';

const getAllUsersApi = async () => {
  try {
    const response = await fetch(userUrl);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(`failed to fetch, ${responseData.message}`);
    }

    return responseData;
  } catch (error) {
    return 'error';
  }
};

const postUserApi = async (user) => {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(user)
    };

    const response = await fetch(userUrl, options);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(`failed to fetch, ${responseData.message}`);
    }
  } catch (error) {
    return 'error';
  }
};

const putUserApi = async (user) => {
  try {
    const options = {
      method: 'PUT',
      body: JSON.stringify(user)
    };

    const response = await fetch(`${userUrl}/${user.id}`, options);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(`failed to fetch, ${responseData.message}`);
    }
  } catch (error) {
    return 'error';
  }
};

const getUserApi = async (userId) => {
  try {
    const response = await fetch(`${userUrl}/${userId}`);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(`failed to fetch, ${responseData.message}`);
    }

    return responseData;
  } catch (error) {
    return 'error';
  }
};

const deleteUserApi = async (userId) => {
  try {
    const options = {
      method: 'DELETE'
    };

    const response = await fetch(`${userUrl}/${userId}`, options);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(`failed to fetch, ${responseData.message}`);
    }
  } catch (error) {
    return 'error';
  }
};

export { getAllUsersApi, postUserApi, getUserApi, putUserApi, deleteUserApi };
