

export const sendResourceRequest = async (formData: any, token: string) => {
  try {

    const userId = formData.userId;

    const dataToSend = {
      ...formData,
      userId, // Include userId in the request
    };
  console.log(userId,"usrid")
    const response = await fetch('/api/resources/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify(dataToSend), // Send the data including userId
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json(); // Return the response data
  } catch (error) {
    console.error('Error sending resource request:', error);
    throw error; // Propagate the error for handling
  }
};