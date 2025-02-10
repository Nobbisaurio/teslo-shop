'use server';

import { signOut } from '@/authConfig';


export const logout = async () => {

  await signOut()

}