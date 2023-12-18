import { useSelector } from 'react-redux'
import { useEffect, useTransition, } from 'react';
import { isLoaded } from 'react-redux-firebase'
import Loader from './Loader'

export default ({ children }: any) => {
  const auth = useSelector((state: any) => state.firebase.auth);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isLoaded(auth)) {
      startTransition(() => {
      });
    }
  }, [auth, startTransition]);


  return isPending ? (
    <Loader />
  ) : (
    <>
      {children}
    </>
  );
}