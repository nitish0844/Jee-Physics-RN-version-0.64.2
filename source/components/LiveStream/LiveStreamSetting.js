import {View, Text} from 'react-native';
import React from 'react';

const LiveStreamSetting = async ({token}) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: 'POST',
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  const {roomId} = await res.json();
  return roomId;
};

export const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJiNWYwY2ExZi1kYWEzLTQ4YjYtYWQxMC0zMGY4N2M0NWE0NmYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5MTY1NzEzMywiZXhwIjoxNjkxNzQzNTMzfQ.PFCG2RjtNGjSD8FofL4rkCrdkk9eEPqHSjKar22HEC8';

export default LiveStreamSetting;
