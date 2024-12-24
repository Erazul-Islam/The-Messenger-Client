/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */

"use client"

import { logout } from "../utils/logout";
import { useUserInfo } from "../utils/userinfo";


export default function Home() {

  
  const {userInfo} = useUserInfo()


  return (
    <section style={{ marginLeft: 50, textAlign: 'center' }}>
          <button onClick={logout}>Logout</button>
    </section>
  );
}
