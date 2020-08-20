/**
 * Created by chalosalvador on 8/20/20
 */

import React from 'react';
import Spinner from './Spinner';

const UserInfo = ( { userInfo } ) => (
  <>
    <h1>Información del usuario</h1>
    {
      userInfo
        ?
        <ul>
          <li>{ userInfo.name }</li>
          <li>{ userInfo.email }</li>
          <li>{ userInfo.website }</li>
          <li>{ userInfo.phone }</li>
        </ul>
        : <Spinner />
    }
  </>
);

export default UserInfo;
